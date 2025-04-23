package org.example.APICalls;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

public class RESTCall
{
    static String getContent(String urlString)
    {
        String ret = "";
        try
        {
            // URL für den Google Calendar API-Request
            // URL-Objekt erstellen
            URL url = new URL(urlString);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");
            conn.setRequestProperty("Accept", "application/json");

            // Response-Code prüfen
            if (conn.getResponseCode() != 200)
            {
                throw new RuntimeException("HTTP Error: " + conn.getResponseCode() + " - "+ conn.getContent().toString());
            }

            // Antwort lesen
            BufferedReader br = new BufferedReader(new InputStreamReader((conn.getInputStream())));
            StringBuilder response = new StringBuilder();
            String line;
            while ((line = br.readLine()) != null)
            {
                response.append(line);
            }
            conn.disconnect();
            ret = response.toString();
        }
        catch (Exception e)
        {
            ret = e.toString();
        }
        return ret;
    }
}


