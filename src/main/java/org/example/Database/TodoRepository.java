package org.example.Database;

import com.j256.ormlite.dao.Dao;
import org.example.Tools.TodoList;
import org.example.User.User;

import java.sql.SQLException;
import java.util.List;

public class TodoRepository
{
    Dao<TodoEntity, Long> dao;

    private static  TodoRepository instance;
    private TodoRepository() throws SQLException
    {
        this.dao = Database.getTodoEntitiesDao();
    }

    public static TodoRepository getInstance() throws SQLException
    {
        if (instance == null)
            instance = new TodoRepository();
        return instance;
    }

    public TodoEntity findOrNewInDB(TodoList.Entry entry, User user) throws SQLException
    {
        List<TodoEntity> exisiting = dao.queryForEq("id", entry.getId());

        if (!exisiting.isEmpty())
            return exisiting.getFirst();
        return TodoEntity.fromTodoEntry(entry, user);
    }

    public void addTodo(TodoList.Entry entry, User user) throws SQLException
    {
        TodoEntity entity  = TodoEntity.fromTodoEntry(entry, user);
        entity.setId(findOrNewInDB(entry, user).getId());
        dao.createOrUpdate(entity);
    }

    public void findTodo(String id) throws SQLException
    {
        List<TodoEntity> exisiting = dao.queryForEq("id", id);
    }
}
