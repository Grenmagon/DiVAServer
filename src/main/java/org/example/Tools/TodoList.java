package org.example.Tools;

import com.google.gson.Gson;

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

    private final List<Entry> entries = new ArrayList<>();

    public String addEntry(String value, boolean done)
    {
        UUID uuid = UUID.randomUUID();
        entries.add(new Entry(uuid.toString(), value, done));
        return uuid.toString();
    }

    public void deleteAll() {
        entries.clear();
    }


    public void deleteEntry(String id)
    {
        entries.remove(findIndex(id));
    }

    public boolean changeValue(String id, String value)
    {
        int index = findIndex(id);
        if (index == -1)
            return false;
        entries.get(index).value = value;
        return true;
    }
    public boolean changeDone(String id, boolean value)
    {
        int index = findIndex(id);
        if (index == -1)
            return false;
        entries.get(index).done = value;
        return true;
    }

    private int findIndex(String id)
    {
        for (int i = 0; i < entries.size(); i++)
        {
            if (entries.get(i).id.equals(id))
                return i;
        }
        return -1;
    }

    public String toJSON()
    {
        Gson gson = new Gson();
        return gson.toJson(this);
    }
}
