package org.example.Database;

import com.j256.ormlite.field.DatabaseField;
import com.j256.ormlite.table.DatabaseTable;
import org.example.User.Passwd;
import org.example.User.User;

import java.util.ArrayList;
import java.util.List;

@DatabaseTable(tableName = "User")
public class UserEntity
{
    @DatabaseField(generatedId = true)
    private long id;
    @DatabaseField
    private String nameFamily;
    @DatabaseField
    private String nameGiven;
    @DatabaseField(canBeNull = false, unique = true)
    private String login;
    @DatabaseField
    private String passwd;
    @DatabaseField
    private String passwdSalt;
    @DatabaseField
    private String calendarKey;
    @DatabaseField
    private String calendarId;
    @DatabaseField
    private String homeCity;
    @DatabaseField
    private String mainNews;
    @DatabaseField
    private String newsTopics;
    @DatabaseField
    private User.Language language;

    public UserEntity(){}

    public UserEntity(String nameFamily, String nameGiven, String login, String passwd, String passwdSalt, String calendarKey, String calendarId, String homeCity, String mainNews, String newsTopics, User.Language language)
    {
        this.nameFamily = nameFamily;
        this.nameGiven = nameGiven;
        this.login = login;
        this.passwd = passwd;
        this.passwdSalt = passwdSalt;
        this.calendarKey = calendarKey;
        this.calendarId = calendarId;
        this.homeCity = homeCity;
        this.mainNews = mainNews;
        this.newsTopics = newsTopics;
        this.language = language;
    }

    public static UserEntity fromUser(User user)
    {
        return new UserEntity(user.getNameFamily(), user.getNameGiven(), user.getLogin(), user.getPasswd().getPasswd(),
                user.getPasswd().getSalt(), user.getCalendarKey(), user.getCalendarId(), user.getHomeCity(),
                user.getMainNews(), user.getNewsTopicsString(), user.getLanguage());
    }

    public static User toUser (UserEntity userEntity)
    {
        User user =  new User(userEntity.login, userEntity.passwd, userEntity.passwdSalt);
        user.setNameFamily(userEntity.nameFamily);
        user.setNameGiven(userEntity.nameGiven);
        user.setCalendarKey(userEntity.calendarKey);
        user.setCalendarId(userEntity.calendarId);
        user.setHomeCity(userEntity.homeCity);
        user.setMainNews(userEntity.mainNews);
        user.setNewsTopicString(userEntity.newsTopics);
        user.setLanguage(userEntity.language);

        return user;
    }

    public long getId()
    {
        return id;
    }

    public void setId(long id)
    {
        this.id = id;
    }
}
