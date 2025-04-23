package org.example.APICalls;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import org.example.User.User;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class News
{
    static class Article
    {
        String imgSrc;
        String title;
        String description;
        String source;
        String url;
        Date date;
    }

    static class NewsItem
    {
        List<Article> articles = new ArrayList<>();
    }

    private final static String API_KEY = "9f44bc63353848fba051d7a6e69da7ed";
    private final static String NEWS_URL = "https://newsapi.org/v2/everything";
    private final static String LOCATION = "Austria";
    private final static int STD_PAGE_SIZE = 10;


    public static String getWeekNews(String filter, User.Language language)
    {
        Date today = new Date();
        Date weekAgo = Date.from(LocalDate.now().minusWeeks(1).atStartOfDay(ZoneId.systemDefault()).toInstant());

        return getNews(filter, today, weekAgo, language, 5);
        //return getNews(filter, null, null, null, 100);
    }

    public static String getNews(String filter, Date from, Date to, User.Language language, Integer pageSize)
    {
        System.out.println("getNews!");
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");

        StringBuilder url = new StringBuilder(NEWS_URL + "?apiKey=" + API_KEY);

        if (filter != null && !filter.isEmpty())
        {
            url.append("&q=").append(filter);
        }
        if (from != null)
        {
            url.append("&from=").append(dateFormat.format(from));
        }
        if (to != null)
        {
            url.append("&to=").append(dateFormat.format(to));
        }
        if (language != null)
        {
            url.append("&language=").append(language.name());
        }
        if (pageSize != null && pageSize > 0)
        {
            url.append("&pageSize=").append(pageSize);
        }
        else
            url.append("&pageSize=").append(STD_PAGE_SIZE);

        url.append("&sortBy=publishedAt");

        System.out.println("Calling: " + url);

        String json = RESTCall.getContent(url.toString());
        System.out.println("Response: " + json);

        JsonObject root = JsonParser.parseString(json).getAsJsonObject();
        JsonArray articlesArray = root.getAsJsonArray("articles");

        NewsItem newsItem = new NewsItem();

        for (int i = 0; i < articlesArray.size(); i++)
        {
            JsonObject obj = articlesArray.get(i).getAsJsonObject();
            Article article = new Article();

            article.title = obj.get("title").getAsString();
            article.description = obj.get("description").isJsonNull() ? "" : obj.get("description").getAsString();
            article.imgSrc = obj.get("urlToImage").isJsonNull() ? "" : obj.get("urlToImage").getAsString();
            article.source = obj.getAsJsonObject("source").get("name").getAsString();
            article.url = obj.get("url").isJsonNull() ? "" : obj.get("url").getAsString();

            String publishedAt = obj.get("publishedAt").getAsString();
            article.date = parseDate(publishedAt);

            newsItem.articles.add(article);
        }

        return new Gson().toJson(newsItem);
    }


    public static Date parseDate(String dateString)
    {
        if (dateString == null || dateString.isEmpty())
            return null;

        try
        {
            return new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'").parse(dateString);
        }
        catch (ParseException e)
        {
            System.out.println("Fehler beim Parsen des Datums: " + dateString);
            System.out.println(e);
            return null;
        }
    }

}
