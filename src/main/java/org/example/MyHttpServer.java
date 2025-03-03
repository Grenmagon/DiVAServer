package org.example;

import com.google.gson.internal.bind.util.ISO8601Utils;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class MyHttpServer implements HttpHandler
{
    @Override
    public void handle(HttpExchange exchange) throws IOException
    {
        String urlPath = exchange.getRequestURI().getPath();
        System.out.println(urlPath);

        //String filePath = "public" + exchange.getRequestURI().getPath(); // Dateien aus dem "public"-Verzeichnis
        Path path = Paths.get("public" + urlPath);
        System.out.println();

        if(urlPath.startsWith("/JSON/"))
        {
            if(urlPath.contains("calendar.json"))
            {
                String response = Main.gc.writeJson();
                exchange.sendResponseHeaders(404, response.length());
                OutputStream os = exchange.getResponseBody();
                os.write(response.getBytes());
                os.close();
            }
        }
        else if (Files.exists(path) && !Files.isDirectory(path))
        {
            byte[] fileBytes = Files.readAllBytes(path);
            exchange.sendResponseHeaders(200, fileBytes.length);
            OutputStream os = exchange.getResponseBody();
            os.write(fileBytes);
            os.close();
        }
        else
        {
            String response = "Datei nicht gefunden: " + urlPath;
            exchange.sendResponseHeaders(404, response.length());
            OutputStream os = exchange.getResponseBody();
            os.write(response.getBytes());
            os.close();
        }
    }
}
