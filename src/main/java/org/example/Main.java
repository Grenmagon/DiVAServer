package org.example;


import java.io.IOException;
import java.net.InetSocketAddress;
import com.sun.net.httpserver.HttpServer;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpExchange;

import javax.imageio.IIOException;

public class Main
{
    private final static String WOLFI_API_Key = "AIzaSyBEdGCc-UP5jdtw9-SujFqhD8iFcZdQ10Q";
    private final static String WOLFI_CALENDAR_ID = "239d3e3ec95d6897301f78ee5bec04cc94e41c13742f878cc376a2359a81b31d@group.calendar.google.com";

    public static void main(String[] args) throws IOException
    {
        System.out.println("Hello world!");

        /*
        GoogleCalendar gc = new GoogleCalendar(WOLFI_CALENDAR_ID, WOLFI_API_Key);
        gc.loadCalendarAPI();
        System.out.println("JSON CAL");
        gc.writeJson();
*/
        int port = 8080; // Portnummer
        HttpServer server = HttpServer.create(new InetSocketAddress(port), 0);

        server.createContext("/", new MyHttpServer());
        server.setExecutor(null); // Standard-Executor verwenden
        server.start();

        System.out.println("Server gestartet auf Port " + port);

    }
}