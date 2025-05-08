package org.example;


import java.io.IOException;
import java.net.InetSocketAddress;
import java.time.LocalDate;
import java.util.List;

import com.sun.net.httpserver.HttpServer;
import org.example.APICalls.GoogleCalendar;
import org.example.APICalls.News;
import org.example.APICalls.Weather;
import org.example.HttpServer.MyHttpServer;
import org.example.User.User;


public class Main
{
    private final static String WOLFI_API_Key = "AIzaSyBEdGCc-UP5jdtw9-SujFqhD8iFcZdQ10Q";
    private final static String WOLFI_CALENDAR_ID = "239d3e3ec95d6897301f78ee5bec04cc94e41c13742f878cc376a2359a81b31d@group.calendar.google.com";



    public static GoogleCalendar gc;

    public static void main(String[] args) throws IOException
    {
        int port = 8080; // Portnummer
        HttpServer server = HttpServer.create(new InetSocketAddress(port), 0);

        server.createContext("/", new MyHttpServer());
        server.setExecutor(null); // Standard-Executor verwenden
        server.start();

        System.out.println("Server gestartet auf http://localhost:" + port);

        testUsers();

        //testStuff();
    }

    private static void testStuff()
    {
        System.out.println("CalendarTest");
        gc = new GoogleCalendar(WOLFI_CALENDAR_ID, WOLFI_API_Key);
        LocalDate today = LocalDate.now();
        gc.loadCalendarAPI(today, today);
        System.out.println("JSON CAL");
        System.out.println(gc.writeJson());

        System.out.println("WeatherTest");
        System.out.println(Weather.getCurrentWeather("Vienna"));

        System.out.println("NewsTest");
        System.out.println(News.getWeekNews("Warhammer", User.Language.en));

        System.out.println("TODO");
        User.getUser("wp").getTodoList().addEntry("TEST", false);
        User.getUser("wp").getTodoList().addEntry("TEST2", true);
        System.out.println(User.getUser("wp").getTodoList().toJSON());
    }


    public static void testUsers()
    {

        User w = new User("Prossinagg", "Wolfgang", "wp", "123", WOLFI_API_Key, WOLFI_CALENDAR_ID, "Vienna", "Warhammer", List.of("tech", "finance", "politics", "sport", "warhammer", "MTG", "Marvel"), User.Language.en);

        User.addUser(w);

        if (User.getUser("wp").getPasswd().checkPassword("123"))
            System.out.println("LOGIN OK");
        else
            System.out.println("LOGIN FAILED");
        if (User.getUser("wp").getPasswd().checkPassword("124"))
            System.out.println("LOGIN OK");
        else
            System.out.println("LOGIN FAILED");
    }
}