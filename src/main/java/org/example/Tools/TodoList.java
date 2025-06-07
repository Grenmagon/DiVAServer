package org.example.Tools;

import com.google.gson.Gson;
import org.example.APICalls.News;
import org.example.Database.TodoRepository;
import org.example.User.User;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class TodoList
{
    public static class Entry
    {
        String id;
        String value;
        boolean done;

        public Entry(String id, String value, boolean done)
        {
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

        public String getValue()
        {
            return value;
        }

        public void setValue(String value)
        {
            this.value = value;
        }

        public boolean isDone()
        {
            return done;
        }

        public void setDone(boolean done)
        {
            this.done = done;
        }
    }

    public static class EntryList
    {
        List<Entry> entries = new ArrayList<>();

        public void addEntry(Entry entry)
        {
            entries.add(entry);
        }
    }

    private User owner;

    public TodoList(User owner)
    {
        this.owner = owner;
    }

    public String addEntry(String value, boolean done) throws SQLException
    {
        UUID uuid = UUID.randomUUID();
        //entries.add(new Entry(uuid.toString(), value, done));
        TodoRepository.getInstance().addTodo(new Entry(uuid.toString(), value, done), owner);
        return uuid.toString();
    }

    public void deleteAll() throws SQLException
    {
        //entries.clear();
        TodoRepository.getInstance().deleteAllTodo(owner);
    }


    public void deleteEntry(String id) throws SQLException
    {
        //entries.remove(findIndex(id));
        TodoRepository.getInstance().deleteTodo(id, owner);
    }

    public boolean changeValue(String id, String value) throws SQLException
    {
        /*
        int index = findIndex(id);
        if (index == -1)
            return false;
        entries.get(index).value = value;
         */
        Entry entry = TodoRepository.getInstance().findTodo(id);
        if (entry == null)
            return false;
        entry.value = value;
        TodoRepository.getInstance().addTodo(entry, owner);
        return true;
    }
    public boolean changeDone(String id, boolean value) throws SQLException
    {
        /*
        int index = findIndex(id);
        if (index == -1)
            return false;
        entries.get(index).done = value;
        return true;
         */
        Entry entry = TodoRepository.getInstance().findTodo(id);
        if (entry == null)
            return false;
        entry.done = value;
        TodoRepository.getInstance().addTodo(entry, owner);
        return true;
    }
/*
    private int findIndex(String id)
    {
        for (int i = 0; i < entries.size(); i++)
        {
            if (entries.get(i).id.equals(id))
                return i;
        }
        return -1;
    }
*/
    private TodoList.EntryList loadTodoList() throws SQLException
    {
        return TodoRepository.getInstance().findAllUserTodos(owner);
    }

    public String toJSON() throws SQLException
    {
        Gson gson = new Gson();
        return gson.toJson(loadTodoList());
    }
}
