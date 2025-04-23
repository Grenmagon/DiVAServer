package org.example.User;

import org.example.Main;
import org.example.Tools.TodoList;

import java.util.HashMap;
import java.util.Map;

public class User
{

    private static Map<String, User> users = new HashMap<>(); // Login-User

    public enum Language
    {
        en,
        de,
        fr
    }

    private String nameFamily = "";
    private String nameGiven = "";
    private String login = "";
    private Passwd passwd;

    private String CalendarKey = "";
    private String CalendarId = "";

    private String homeCity = "";
    private String mainNews = "";
    private Language language = null;

    private TodoList todoList = new TodoList();

    public User(String nameFamily, String nameGiven, String login, String password)
    {
        setNameFamily(nameFamily);
        setNameGiven(nameGiven);
        setLogin(login);
        setPasswd(password);
    }

    public User(String nameFamily, String nameGiven, String login, String passwd, String calendarKey, String calendarId, String homeCity, String mainNews, Language language)
    {
        this(nameFamily,nameGiven,login,passwd);

        setCalendarKey(calendarKey);
        setCalendarId(calendarId);

        setHomeCity(homeCity);
        setMainNews(mainNews);
        setLanguage(language);
        //(System.out.println(getNameFamily());
    }

    public String getNameFamily()
    {
        return nameFamily;
    }

    public void setNameFamily(String nameFamily)
    {
        this.nameFamily = nameFamily;
    }

    public String getNameGiven()
    {
        return nameGiven;
    }

    public void setNameGiven(String nameGiven)
    {
        this.nameGiven = nameGiven;
    }

    public String getLogin()
    {
        return login;
    }

    public void setLogin(String login)
    {
        this.login = login;
    }

    public Passwd getPasswd()
    {
        return passwd;
    }

    public void setPasswd(String password)
    {
        passwd = new Passwd(password);
    }

    public String getCalendarKey()
    {
        return CalendarKey;
    }

    public void setCalendarKey(String calendarKey)
    {
        CalendarKey = calendarKey;
    }

    public String getCalendarId()
    {
        return CalendarId;
    }

    public void setCalendarId(String calendarId)
    {
        CalendarId = calendarId;
    }

    public String getHomeCity()
    {
        return homeCity;
    }

    public void setHomeCity(String homeCity)
    {
        this.homeCity = homeCity;
    }

    public String getMainNews()
    {
        return mainNews;
    }

    public void setMainNews(String mainNews)
    {
        this.mainNews = mainNews;
    }

    public Language getLanguage()
    {
        return language;
    }

    public void setLanguage(Language language)
    {
        this.language = language;
    }

    public TodoList getTodoList()
    {
        return todoList;
    }

    public void setTodoList(TodoList todoList)
    {
        this.todoList = todoList;
    }

    public static void addUser(User user)
    {
        users.put(user.getLogin(), user);
    }

    public static boolean hasUser(String username)
    {
        return users.containsKey(username);
    }
    public static User getUser(String username)
    {
        return users.get(username);
    }
}
