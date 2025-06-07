package org.example.Database;

import com.j256.ormlite.dao.Dao;
import org.example.Tools.TodoList;
import org.example.User.User;

import javax.swing.plaf.InsetsUIResource;
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

    public TodoList.Entry findTodo(String id) throws SQLException
    {
        List<TodoEntity> exisiting = dao.queryForEq("id", id);
        if (!exisiting.isEmpty())
            return TodoEntity.toTodoEntry(exisiting.getFirst());
        else
            return null;
    }

    public void deleteTodo(String id, User user) throws SQLException
    {
        List<TodoEntity> exisiting = dao.queryForEq("id", id);
        if (!exisiting.isEmpty())
            dao.delete(exisiting.getFirst());
    }

    public void deleteAllTodo(User user) throws SQLException
    {
        UserEntity userEntity = UserRepository.getInstance().findOrNewInDB(user);
        List<TodoEntity> exisiting = dao.queryForEq("userId", userEntity.getId());
        for(TodoEntity entity: exisiting)
            dao.delete(entity);
    }

    public TodoList.EntryList findAllUserTodos(User user) throws SQLException
    {
        TodoList.EntryList todo = new TodoList.EntryList();

        UserEntity userEntity = UserRepository.getInstance().findOrNewInDB(user);
        List<TodoEntity> exisiting = dao.queryForEq("userId", userEntity.getId());

        for(TodoEntity entity: exisiting)
            todo.addEntry(TodoEntity.toTodoEntry(entity));

        return todo;
    }
}
