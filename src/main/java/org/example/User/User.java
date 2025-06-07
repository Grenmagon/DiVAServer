package org.example.User;

import com.google.gson.Gson;
import org.example.Database.TodoRepository;
import org.example.Database.UserRepository;
import org.example.Main;
import org.example.Tools.TodoList;

import java.sql.SQLException;
import java.util.*;

public class User
{
    public static String LIST_DIVIDER = ";";
    //private static Map<String, User> users = new HashMap<>(); // Login-User

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
    private List<String> newsTopics = new ArrayList<>();
    private Language language = null;

    //private TodoList todoList = new TodoList();

    public User(String login, String password, String salt)
    {
        setLogin(login);
        passwd = new Passwd(password, salt);
    }

    public User(String login, String password)
    {
        //setNameFamily(nameFamily);
        //setNameGiven(nameGiven);
        setLogin(login);
        setPasswd(password);

        //Default Werte
        setLanguage(Language.en);
        setMainNews("Wichtig");
        setNewsTopics(List.of("Politik", "Technik", "Finanzen"));
        setHomeCity("Wien");
    }

    public User(String nameFamily, String nameGiven, String login, String passwd, String calendarKey, String calendarId, String homeCity, String mainNews, List<String> newsTopics, Language language)
    {
        this(login, passwd);

        setNameFamily(nameFamily);
        setNameGiven(nameGiven);

        setCalendarKey(calendarKey);
        setCalendarId(calendarId);

        setHomeCity(homeCity);
        setMainNews(mainNews);
        setNewsTopics(newsTopics);
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

    public List<String> getNewsTopics()
    {
        return newsTopics;
    }

    public void setNewsTopics(List<String> newsTopics)
    {
        this.newsTopics = newsTopics;
    }

    public String getNewsTopicsString()
    {
        return String.join(LIST_DIVIDER, getNewsTopics());
    }

    public void setNewsTopicString(String newsTopicString)
    {
        System.out.println("setNewsTopicString1 " + newsTopicString);
        String[] arr = newsTopicString.split(LIST_DIVIDER);
        System.out.println("setNewsTopicString2");
        List<String> list = Arrays.asList(arr);
        System.out.println("setNewsTopicString3");
        setNewsTopics(list);
        System.out.println("setNewsTopicString4");
    }

    public Language getLanguage()
    {
        return language;
    }

    public void setLanguage(Language language)
    {
        this.language = language;
    }

    public TodoList getTodoList() throws SQLException
    {
        //return todoList;
        //return TodoRepository.getInstance().findAllUserTodos(this);
        return new TodoList(this);
    }

    /*
        public void setTodoList(TodoList todoList)
        {
            this.todoList = todoList;
        }
    */
    public static boolean addUser(User user)
    {
        //users.put(user.getLogin(), user);
        try
        {
            UserRepository.getInstance().addToDb(user);
            return true;
        }
        catch (SQLException e)
        {
            //throw new RuntimeException(e);
            System.out.println(e);
            return false;
        }
    }

    public static boolean hasUser(String username) throws SQLException
    {
        //return users.containsKey(username);
        return null != getUser(username);
    }

    public static User getUser(String username) throws SQLException
    {
        //return users.get(username);
        return UserRepository.getInstance().loadUser(username);
    }

    public String writeJson()
    {
        Gson g = new Gson();
        return g.toJson(this);
    }

    @Override
    public String toString()
    {
        String ret = "User{" +
                "nameFamily='" + nameFamily + '\'' +
                ", nameGiven='" + nameGiven + '\'' +
                ", login='" + login + '\'' +
                ", passwd=" + passwd +
                ", CalendarKey='" + CalendarKey + '\'' +
                ", CalendarId='" + CalendarId + '\'' +
                ", homeCity='" + homeCity + '\'' +
                ", mainNews='" + mainNews + '\'' +
                ", newsTopics=" + getNewsTopicsString() +
                ", language=" + language;
        try
        {
            ret += ", todoList=" + /*todoList*/ getTodoList();
        }
        catch (SQLException e)
        {
            throw new RuntimeException(e);
        }
        ret += '}';
        return ret;
    }
}
