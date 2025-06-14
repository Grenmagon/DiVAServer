package org.example.HttpServer;

import com.sun.net.httpserver.HttpExchange;
import org.example.Main;
import org.example.User.User;

import java.net.InetSocketAddress;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

public class Session
{
    public static Map<String, Session> sessions = new HashMap<>(); //SessionId-Session
    public static final String SESSION_COOKIE_NAME = "SessionID";
    private String ipAddress = "";
    private String sessionId = "";
    private final User user;

    public Session(InetSocketAddress ipAddress, String sessionId, User user)
    {
        this.ipAddress = ipAddress.getAddress().toString();
        this.sessionId = sessionId;
        this.user = user;
    }

    public static boolean hasSession(String sessionId)
    {
        return sessions.containsKey(sessionId);
    }
    public static Session getSession(String sessionId)
    {
        return sessions.get(sessionId);
    }

    public static void createSessionId(HttpExchange exchange, String login) throws SQLException
    {
        String sessionId = UUID.randomUUID().toString();
        sessions.put(sessionId, new Session(exchange.getRemoteAddress(),sessionId, User.getUser(login)));
        exchange.getResponseHeaders().set("Set-Cookie", SESSION_COOKIE_NAME+"=" + sessionId + "; Path=/; HttpOnly");
    }

    public static void removeSession(HttpExchange exchange) {
        // Cookie auslesen
        String cookieHeader = exchange.getRequestHeaders().getFirst("Cookie");
        if (cookieHeader != null) {
            for (String cookie : cookieHeader.split(";")) {
                if (cookie.trim().startsWith(SESSION_COOKIE_NAME + "=")) {
                    String sessionId = cookie.split("=")[1].trim();
                    System.out.println("sessionId: " + sessionId);
                    System.out.println("befor del: "+sessions.keySet().toString());
                    // Session entfernen
                    sessions.remove(sessionId);
                    break;
                }
            }
        }
        System.out.println("after: " + sessions.keySet().toString());

        // Setze einen Cookie mit Max-Age=0, um den alten Cookie zu löschen
        exchange.getResponseHeaders().add("Set-Cookie",
                SESSION_COOKIE_NAME + "=; Path=/; Max-Age=0; HttpOnly");

    }


    public boolean check(HttpExchange exchange)
    {
        System.out.println("Session.check: "+sessionId + ":" + ipAddress);
        return ipAddress.equals(exchange.getRemoteAddress().getAddress().toString());
    }

    public String getIpAddress()
    {
        return ipAddress;
    }

    public void setIpAddress(String ipAddress)
    {
        this.ipAddress = ipAddress;
    }

    public String getSessionId()
    {
        return sessionId;
    }

    public void setSessionId(String sessionId)
    {
        this.sessionId = sessionId;
    }

    public User getUser()
    {
        return user;
    }


}
