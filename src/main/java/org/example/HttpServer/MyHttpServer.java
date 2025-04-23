package org.example.HttpServer;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import org.example.APICalls.GoogleCalendar;
import org.example.APICalls.News;
import org.example.APICalls.Weather;
import org.example.User.User;

import java.io.*;
import java.net.HttpCookie;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.*;

public class MyHttpServer implements HttpHandler
{
    class ExchangeValues
    {
        public boolean status = true;
        Session session;
        HttpExchange exchange;

        ExchangeValues(HttpExchange exchange)
        {
            this.exchange = exchange;
            session = getSession(exchange);
            if (session == null)
                status = false;
        }

        User getUser()
        {
            return session.getUser();
        }
    }

    private static final Path LOGINPAGE = Paths.get("public" + "/Login/login.html");
    private static final String JSON = "/JSON/";
    private static final String USERNAME_ID = "username";
    private static final String PASSWORD_ID = "password";
    private static final String PATH_PRE = "public";

    @Override
    public void handle(HttpExchange exchange) throws IOException
    {
        String urlPath = getNormalizedPath(exchange);
        System.out.println("handle: " + urlPath);


        if (!checkLogin(exchange))
        {
            sendLoginPage(exchange);
            return;
        }
        System.out.println("UrlPath:" + urlPath);
        ExchangeValues ev = new ExchangeValues(exchange);

        String method = exchange.getRequestMethod();
        System.out.println("Method: " + exchange.getRequestMethod());


        //Auf Http-Request-Typ reagieren
        if (method.equals("GET"))
        {
            if (doGet(ev))
                return;
        }
        else if (method.equals("POST"))
        {
            if (doPost(ev))
                return;
        }
        else if (method.equals("PUT"))
        {
            if (doPut(ev))
                return;
        }
        else if (method.equals("DELETE"))
        {
            if (doDelete(ev))
                return;
        }

        System.out.println("open files");

        //Wenn sonst nichts getroffen hat, versuchen ob die Datei vorhanden ist
        Path path = Paths.get(PATH_PRE + urlPath);
        if (Files.exists(path) && !Files.isDirectory(path))
        {
            byte[] fileBytes = Files.readAllBytes(path);
            sendResponse(exchange, 200, fileBytes);
        }
        else
        {
            String response = "Datei nicht gefunden: " + urlPath;
            sendResponseString(exchange, 404, response);
        }
    }

    private boolean doGet(ExchangeValues ev) throws IOException
    {
        String urlPath = getNormalizedPath(ev.exchange);
         if (urlPath.startsWith("/Todo/Entries/"))
        {
            getTodo(ev);
            return true;
        }
        return false;
    }

    private boolean doPost(ExchangeValues ev) throws IOException
    {
        String urlPath = getNormalizedPath(ev.exchange);
        if (urlPath.startsWith(JSON))
        {
            if (urlPath.contains("calendar.json"))
            {
                loadCalendar(ev);
                return true;
            }
            else if (urlPath.contains("weather.json"))
            {
                loadWeather(ev);
                return true;
            }
            else if (urlPath.contains("newsCurrent.json"))
            {
                loadCurrentNews(ev);
                return true;
            }
            else if (urlPath.contains("news.json"))
            {
                loadNews(ev);
                return true;
            }
        }
        else if (urlPath.startsWith("/Todo/Entries/"))
        {
            postTodo(ev);
            return true;
        }

        return false;
    }

    private boolean doPut(ExchangeValues ev) throws IOException
    {
        String urlPath = getNormalizedPath(ev.exchange);
        if (urlPath.startsWith("/Todo/Entries/"))
        {
            putTodo(ev);
            return true;
        }
        return false;
    }

    private boolean doDelete(ExchangeValues ev) throws IOException
    {
        String urlPath = getNormalizedPath(ev.exchange);
        if (urlPath.startsWith("/Todo/Entries/"))
        {
            deleteTodo(ev);
            return true;
        }
        else if (urlPath.startsWith("/Todo/EntriesAll"))
        {
            deleteAllTodo(ev);
            return true;
        }
        else if (urlPath.startsWith("/Todo/EntriesMultiple/"))
        {
            deleteMultipleTodos(ev);
            return true;
        }
        return false;
    }

    private void loadCalendar(ExchangeValues ev) throws IOException
    {
        GoogleCalendar gc = new GoogleCalendar(ev.getUser().getCalendarId(), ev.getUser().getCalendarKey());
        Map<String, String> params = parseFormData(ev.exchange);
        LocalDate from = LocalDate.parse(params.get("from"));
        LocalDate to = LocalDate.parse(params.get("to"));
        gc.loadCalendarAPI(from, to);
        sendResponseString(ev.exchange, 200, gc.writeJson());
    }

    private void loadWeather(ExchangeValues ev) throws IOException
    {
        Map<String, String> params = parseFormData(ev.exchange);
        String city = params.get("city");
        if (city == null)
            city = ev.getUser().getHomeCity();

        sendResponseString(ev.exchange, 200, Weather.getCurrentWeather(city));
    }

    private void loadCurrentNews(ExchangeValues ev) throws IOException
    {
        sendResponseString(ev.exchange, 200, News.getWeekNews(ev.getUser().getMainNews(), ev.getUser().getLanguage()));
    }

    private void loadNews(ExchangeValues ev) throws IOException
    {
        Map<String, String> params = parseFormData(ev.exchange);
        String topic = params.get("topic");
        Date from = News.parseDate(params.get("from"));
        Date to = News.parseDate(params.get("to"));
        User.Language language = ev.getUser().getLanguage();
        int size = 0;
        if (params.containsKey("size"))
            size = Integer.parseInt(params.get("size"));
        sendResponseString(ev.exchange, 200, News.getNews(topic, from, to, language, size));
    }

    private void getTodo(ExchangeValues ev) throws IOException
    {
        sendResponseString(ev.exchange, 200, ev.getUser().getTodoList().toJSON());
    }

    private void postTodo(ExchangeValues ev) throws IOException
    {
        Map<String, String> params = parseFormData(ev.exchange);
        String value = params.get("value");
        System.out.println("value:" + value);
        boolean done = Boolean.parseBoolean(params.get("done"));
        ev.getUser().getTodoList().addEntry(value, done);
        sendResponseString(ev.exchange, 200, ev.getUser().getTodoList().toJSON());
    }

    private String getTodoId(ExchangeValues ev) throws IOException
    {
        String path = getNormalizedPath(ev.exchange);
        String[] segments = path.split("/");
        if (segments.length < 4)
        {
            sendResponseString(ev.exchange, 400, "Invalid path");
            return null;
        }
        return segments[3]; // /Todo/Entries/{id}
    }

    private void putTodo(ExchangeValues ev) throws IOException
    {
        Map<String, String> params = parseFormData(ev.exchange);
        String id = getTodoId(ev);
        if (id == null)
            return;
        String value = params.get("value");
        boolean done = Boolean.parseBoolean(params.get("done"));
        ev.getUser().getTodoList().changeValue(id, value);
        ev.getUser().getTodoList().changeDone(id, done);
        sendResponseString(ev.exchange, 200, ev.getUser().getTodoList().toJSON());
    }

    private void deleteTodo(ExchangeValues ev) throws IOException
    {
        Map<String, String> params = parseFormData(ev.exchange);
        String id = getTodoId(ev);
        if (id == null)
            return;
        ev.getUser().getTodoList().deleteEntry(id);
        sendResponseString(ev.exchange, 200, ev.getUser().getTodoList().toJSON());
    }

    private void deleteAllTodo(ExchangeValues ev) throws IOException
    {
        ev.getUser().getTodoList().deleteAll();
        sendResponseString(ev.exchange, 200, ev.getUser().getTodoList().toJSON());
    }

    private void deleteMultipleTodos(ExchangeValues ev) throws IOException {
        Map<String, String> params = parseFormData(ev.exchange);
        String idsStr = params.get("ids"); // Erwartet: "id1,id2,id3"
        if (idsStr == null || idsStr.isEmpty()) {
            sendResponseString(ev.exchange, 400, "Keine IDs angegeben");
            return;
        }

        String[] ids = idsStr.split(",");
        for (String id : ids) {
            ev.getUser().getTodoList().deleteEntry(id.trim());
        }
        sendResponseString(ev.exchange, 200, ev.getUser().getTodoList().toJSON());
    }


    private boolean findSessionId(HttpExchange exchange)
    {
        Session session = getSession(exchange);
        if (session != null)
            return session.check(exchange);
        return false;
    }

    private Session getSession(HttpExchange exchange)
    {
        List<String> cookies = exchange.getRequestHeaders().get("Cookie");
        if (cookies != null)
        {
            for (String cookieHeader : cookies)
            {
                List<HttpCookie> cookieList = HttpCookie.parse(cookieHeader);
                Optional<HttpCookie> sessionCookie = cookieList.stream()
                        .filter(cookie -> cookie.getName().equals(Session.SESSION_COOKIE_NAME)).findFirst();
                if (sessionCookie.isPresent())
                {
                    String sessionId = sessionCookie.get().getValue();
                    return Session.getSession(sessionId);
                }
            }
        }
        return null;
    }

    private boolean checkLogin(HttpExchange exchange) throws IOException
    {
        String urlPath = getNormalizedPath(exchange);
        if (urlPath.startsWith(JSON) || urlPath.endsWith("html") /*|| urlPath.endsWith("js")*/)
        {
            if (exchange.getRequestMethod().equals("POST"))
            {
                Map<String, String> params = parseFormData(exchange);
                if (params.containsKey(USERNAME_ID) && params.containsKey(PASSWORD_ID))
                {

                    String username = params.get(USERNAME_ID);
                    String passwd = params.get(PASSWORD_ID);
                    if (User.hasUser(username) && User.getUser(username).getPasswd().checkPassword(passwd))
                    {
                        Session.createSessionId(exchange, username);
                        return true;
                    }
                }
            }
            return findSessionId(exchange);
        }
        return true; //No Login Needed!
    }

    private void sendLoginPage(HttpExchange exchange) throws IOException
    {
        byte[] fileBytes = Files.readAllBytes(LOGINPAGE);
        sendResponse(exchange, 200, fileBytes);
    }

    private void sendResponseString(HttpExchange exchange, int statusCode, String response) throws IOException
    {
        sendResponse(exchange, statusCode, response.getBytes());
    }

    private void sendResponse(HttpExchange exchange, int statusCode, byte[] response) throws IOException
    {
        String normalizedPath = getNormalizedPath(exchange);
        String contentType = guessContentType(normalizedPath); // statt exchange.getRequestURI().getPath()

        exchange.getResponseHeaders().set("Content-Type", contentType);
        exchange.sendResponseHeaders(statusCode, response.length);
        OutputStream os = exchange.getResponseBody();
        os.write(response);
        os.close();
    }

    public static Map<String, String> parseFormData(HttpExchange exchange) throws IOException {
        Map<String, String> params = new HashMap<>();

        // 1. GET-Parameter aus URL
        String query = exchange.getRequestURI().getRawQuery();
        if (query != null) {
            parseQuery(query, params);
        }

        // 2. Body-Parameter aus POST, PUT oder DELETE
        String method = exchange.getRequestMethod().toUpperCase();
        if (method.equals("POST") || method.equals("PUT") || method.equals("DELETE")) {
            InputStreamReader isr = new InputStreamReader(exchange.getRequestBody(), StandardCharsets.UTF_8);
            BufferedReader reader = new BufferedReader(isr);
            StringBuilder body = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                body.append(line);
            }
            System.out.println("body: '" + body.toString() + "'");

            String bodyQuery = body.toString(); // z. B. "value=Test&done=true"
            parseQuery(bodyQuery, params);
        }

        System.out.println("Form data:");
        for (Map.Entry<String, String> entry : params.entrySet()) {
            System.out.println(entry.getKey() + " = " + entry.getValue());
        }

        return params;
    }


    public static void parseQuery(String query, Map<String, String> params) throws UnsupportedEncodingException {
        if (query == null || query.isEmpty()) return;

        String[] pairs = query.split("&");
        for (String pair : pairs) {
            String[] parts = pair.split("=", 2);
            String key = URLDecoder.decode(parts[0], StandardCharsets.UTF_8);
            String value = parts.length > 1 ? URLDecoder.decode(parts[1], StandardCharsets.UTF_8) : "";
            params.put(key, value);
        }
    }

    public static String getNormalizedPath(HttpExchange exchange)
    {
        String path = exchange.getRequestURI().getPath();
        if (path.equals("/"))
            path += "index.html";
        return path;
    }

    private String guessContentType(String path)
    {
        if (path.endsWith(".html")) return "text/html";
        if (path.endsWith(".js")) return "application/javascript";
        if (path.endsWith(".css")) return "text/css";
        if (path.endsWith(".json")) return "application/json";
        if (path.endsWith(".png")) return "image/png";
        if (path.endsWith(".jpg") || path.endsWith(".jpeg")) return "image/jpeg";
        if (path.endsWith(".svg")) return "image/svg+xml";
        return "application/octet-stream";
    }


}
