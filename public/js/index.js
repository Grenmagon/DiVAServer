import * as Widgets from "../Widgets/js/widgets.js";
import * as Helper from "../../js/helper.js";

// ---- LOAD ----
document.addEventListener("DOMContentLoaded", () => {
    loadWidgetsStyle();
    loadWidgets();
});

function loadWidgets() {
    loadWeather();
    loadTODO(); 
    loadCalendar();
    loadNews();
}

function loadWidgetsStyle() {
    Helper.loadCSS("/Widgets/css/widgets.css");
    Helper.loadCSS("/Todo/css/todo.css");
}

async function loadWeather() {
    try {
        console.log("Lade Wetter Widget...");
        const response = await fetch("/WIDGETS/weatherWidget.html");
        if (!response.ok) {
            throw new Error("Fehler beim Laden des Wetter-Widgets: " + response.status);
        }
        const htmlContent = await response.text();
        const weatherDiv = document.getElementById("WEATHER");
        if (weatherDiv) {
            weatherDiv.innerHTML = htmlContent;
            Widgets.loadWeatherWidget();
        } else {
            console.error("Das WEATHER-Div wurde nicht gefunden!");
        }
    } catch (error) {
        console.error("Fehler beim Laden des Wetter-Widgets:", error);
    }
}

async function loadTODO() {
    try {
        console.log("Lade TODO Widget...");
        const response = await fetch("/WIDGETS/todoWidget.html");
        if (!response.ok) {
            throw new Error("Fehler beim Laden des TODO-Widgets: " + response.status);
        }
        const htmlContent = await response.text();
        const todoDiv = document.getElementById("TODO");
        if (todoDiv) {
            todoDiv.innerHTML = htmlContent;
            Widgets.loadTodoWidget();
        } else {
            console.error("Das TODO-Div wurde nicht gefunden!");
        }
    } catch (error) {
        console.error("Fehler beim Laden des TODO-Widgets:", error);
    }
}

async function loadNews() {
    try {
        console.log("Lade News Widget...");
        const response = await fetch("/WIDGETS/newsWidget.html");
        if (!response.ok) {
            throw new Error("Fehler beim Laden des News-Widgets: " + response.status);
        }
        const htmlContent = await response.text();
        const newsDiv = document.getElementById("NEWS");
        if (newsDiv) {
            newsDiv.innerHTML = htmlContent;
            Widgets.loadNewsWidget();
        } else {
            console.error("Das NEWS-Div wurde nicht gefunden!");
        }
    } catch (error) {
        console.error("Fehler beim Laden des News-Widgets:", error);
    }
}

async function loadCalendar() {
    try {
        console.log("Lade Calendar Widget...");
        const response = await fetch("/WIDGETS/calendarWidget.html");
        if (!response.ok) {
            throw new Error("Fehler beim Laden des Calendar-Widgets: " + response.status);
        }
        const htmlContent = await response.text();
        const calendarDiv = document.getElementById("CALENDAR");
        if (calendarDiv) {
            calendarDiv.innerHTML = htmlContent;
            Widgets.loadCalendarWidget();
        } else {
            console.error("Das CALENDAR-Div wurde nicht gefunden!");
        }
    } catch (error) {
        console.error("Fehler beim Laden des Calendar-Widgets:", error);
    }
}


