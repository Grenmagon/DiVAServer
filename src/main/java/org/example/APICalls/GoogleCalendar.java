package org.example.APICalls;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class GoogleCalendar
{
    class Appointments
    {
        List<Appointment> appointments = new ArrayList<>();

        void add(Appointment a)
        {appointments.add(a);}
    }
    class Appointment
    {
        String name;
        String from;
        String to;
    }


    //"https://www.googleapis.com/calendar/v3/calendars/" + CALENDAR_ID + "/events?key=" + API_KEY;
    private final static String CALENDAR_URL = "https://www.googleapis.com/calendar/v3/calendars/";
    private final String api_key;
    private final String calendar_Id;

    Appointments appointments;

    public GoogleCalendar(String calendar_Id, String api_key)
    {
        this.calendar_Id = calendar_Id;
        this.api_key = api_key;
        appointments = new Appointments();

    }

    public String getUrlAPI(LocalDate from, LocalDate to)
    {
        StringBuilder url = new StringBuilder(CALENDAR_URL + calendar_Id + "/events?key=" + api_key);
        List<String> param = new ArrayList<>();


        String timeMin = from + "T00:00:00Z";
        String timeMax = to + "T23:59:59Z";
        param.add("timeMin=" + timeMin);
        param.add("timeMax=" + timeMax);
        param.add("singleEvents=true");
        param.add("orderBy=startTime");

        for (String s : param)
            url.append("&").append(s);
        return url.toString();
    }

    public void loadCalendarAPI(LocalDate from, LocalDate to)
    {
        if (api_key.isEmpty() || calendar_Id.isEmpty())
            return;
        String calendarJSon = RESTCall.getContent(getUrlAPI(from, to));
        System.out.println("Appointments load:");
        System.out.println(calendarJSon);
        JsonObject jsonObject = JsonParser.parseString(calendarJSon).getAsJsonObject();
        JsonArray events = jsonObject.getAsJsonArray("items");

        for (int i = 0; i < events.size(); i++)
        {
            JsonObject event = events.get(i).getAsJsonObject();
            Appointment a = new Appointment();

            a.name = event.get("summary").getAsString();
            JsonObject start = event.getAsJsonObject("start");
            a.from = start.has("dateTime") ? start.get("dateTime").getAsString() : start.get("date").getAsString();
            JsonObject end = event.getAsJsonObject("end");
            a.to = end.has("dateTime") ? end.get("dateTime").getAsString() : end.get("date").getAsString();

            appointments.add(a);
        }
    }

    public String writeJson()
    {
        Gson g = new Gson();
        return g.toJson(appointments);
    }
}
