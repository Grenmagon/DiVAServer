package org.example.APICalls;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import java.sql.Time;
import java.util.ArrayList;
import java.util.List;

public class Weather
{
    static class WeatherHourly
    {
        Time time;
        int temperature;
        String iconUrl;

    }
    static class WeatherInfo
    {
        String city;
        float temperature;
        String description;
        String iconUrl;
        List<WeatherHourly> hourly = new ArrayList<>();;

    }

    private final static String API_KEY = "f2e46a1bf68be08fb3f42511cdcf809f";
    private final static String WEATHER_URL = "https://api.openweathermap.org/data/2.5/";
    private final static String CURRENT_URL = WEATHER_URL + "weather";
    private final static String FORCAST_URL = WEATHER_URL + "forecast";
    private final static int MAX_FORCAST = 9;

    public static String getCurrentWeather(String city)
    {
        StringBuilder url = new StringBuilder(CURRENT_URL  + "/?appid=" + API_KEY);
        url.append("&").append("q=").append(city);
        String json = RESTCall.getContent(url.toString());
        System.out.println(json);

        JsonObject root = JsonParser.parseString(json).getAsJsonObject();

        WeatherInfo weatherInfo = new WeatherInfo();

        weatherInfo.city = root.get("name").getAsString();
        float tempK = root.getAsJsonObject("main").get("temp").getAsFloat();
        weatherInfo.temperature = kelvinToCelsius(tempK);

        JsonArray weatherArray = root.getAsJsonArray("weather");
        JsonObject weather = weatherArray.get(0).getAsJsonObject();

        weatherInfo.description = weather.get("description").getAsString();
        weatherInfo.iconUrl = getIconUrl(weather.get("icon").getAsString());

        StringBuilder urforCast = new StringBuilder(FORCAST_URL  + "/?appid=" + API_KEY);
        urforCast.append("&").append("q=").append(city);

        json = RESTCall.getContent(urforCast.toString());
        System.out.println(json);

        JsonObject forecastRoot = JsonParser.parseString(json).getAsJsonObject();
        JsonArray forecastList = forecastRoot.getAsJsonArray("list");

        for (int i = 0; i < Math.min(MAX_FORCAST, forecastList.size()); i++)
        { // just a few entries
            JsonObject entry = forecastList.get(i).getAsJsonObject();
            WeatherHourly hourly = new WeatherHourly();

            String timeStr = entry.get("dt_txt").getAsString().split(" ")[1];
            hourly.time = Time.valueOf(timeStr);

            float hourlyTempK = entry.getAsJsonObject("main").get("temp").getAsFloat();
            hourly.temperature = (int) kelvinToCelsius(hourlyTempK);

            String iconCode = entry.getAsJsonArray("weather").get(0).getAsJsonObject().get("icon").getAsString();
            hourly.iconUrl = getIconUrl(iconCode);

            weatherInfo.hourly.add(hourly);
        }

        Gson gson = new Gson();
        return gson.toJson(weatherInfo);
    }

    private static float kelvinToCelsius(float kelvin) {
        return kelvin - 273.15f;
    }

    private static String getIconUrl(String iconCode)
    {
        return "https://openweathermap.org/img/wn/" + iconCode + "@2x.png";
    }

}
