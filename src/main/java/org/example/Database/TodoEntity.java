package org.example.Database;

import com.j256.ormlite.field.DatabaseField;
import com.j256.ormlite.table.DatabaseTable;
import org.example.Tools.TodoList;
import org.example.User.User;

import java.sql.SQLException;

@DatabaseTable(tableName = "TodoEntry")
public class TodoEntity
{
    //@DatabaseField(generatedId = true)
    //private long id;
    @DatabaseField
    private long userId;
    @DatabaseField(id = true)
    String id;//todoId;
    @DatabaseField
    String value;
    @DatabaseField
    boolean done;

    public TodoEntity()
    {}

    public TodoEntity(long userId, String id, String value, boolean done)
    {
        this.userId = userId;
        this.id = id;
        this.value = value;
        this.done = done;
    }

    public String getId()
    {
        return id;
    }

    public void setId(String id)
    {
        this.id = id;
    }

    public long getUserId()
    {
        return userId;
    }

    public void setUserId(long userId)
    {
        this.userId = userId;
    }

    public static TodoList.Entry toTodoEntry(TodoEntity entity)
    {
        return new TodoList.Entry(entity.id, entity.value, entity.done );
    }

    public static TodoEntity fromTodoEntry(TodoList.Entry entry, User user) throws SQLException
    {
        return new TodoEntity(UserRepository.getInstance().findOrNewInDB(user).getId(), entry.getId(), entry.getValue(), entry.isDone());
    }

}
