package org.example.Database;

import com.j256.ormlite.dao.Dao;
import com.j256.ormlite.dao.DaoManager;
import com.j256.ormlite.jdbc.JdbcConnectionSource;
import com.j256.ormlite.table.TableUtils;

import java.sql.SQLException;

public class Database
{
    public static final String DB_URL = "jdbc:h2:file: ./db/diva";
    public static final String USER = "user";
    public static final String PASSWD = "pass";

    private static JdbcConnectionSource connectionSource;
    private static Dao<UserEntity, Long> userEntitiesDao;
    private static Dao<TodoEntity, Long> todoEntitiesDao;


    private static Database instance;

    private Database() throws SQLException
    {
        System.out.println("NEUES DB OBJECT!!!!!");
        createConnectionSource();
        userEntitiesDao = DaoManager.createDao(connectionSource, UserEntity.class);
        todoEntitiesDao = DaoManager.createDao(connectionSource, TodoEntity.class);
        createTables();
    }

    private static Database getDB() throws SQLException
    {
        if (instance == null)
            instance = new Database();
        return instance;
    }

    private static void createConnectionSource() throws SQLException
    {
        connectionSource = new JdbcConnectionSource(DB_URL, USER, PASSWD);
    }

    public static JdbcConnectionSource getConnectionSource() throws SQLException
    {
        getDB();
        return connectionSource;
    }

    public static Dao<UserEntity,Long> getUserEntitiesDao() throws SQLException
    {
        getDB();
        return userEntitiesDao;
    }
    public static Dao<TodoEntity,Long> getTodoEntitiesDao() throws SQLException
    {
        getDB();
        return todoEntitiesDao;
    }

    // Hier werden die neuen Tabellen hinzugefügt
    private static void createTables() throws SQLException
    {
        TableUtils.createTableIfNotExists(connectionSource, UserEntity.class);
        TableUtils.createTableIfNotExists(connectionSource, TodoEntity.class);
    }
}
