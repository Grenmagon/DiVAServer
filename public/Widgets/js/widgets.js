import * as Helper from "../../js/helper.js";
import { WeatherController } from "../../Weather/js/weatherController.js";
import { NewsController } from "../../News/js/newsController.js";
import { TodoController } from "../../Todo/js/todoController.js";
import { CalendarController } from "../../Calendar/js/calendarController.js";

// Funktion zum Laden von Kalenderdaten
export async function loadCalendarWidget() {
	const calendar = new CalendarController();
	const from = Helper.getCurrentDate();
	const to = Helper.getCurrentDate();

	try {
		const output = await calendar.loadAppointments(from, to);
		const calendarDiv = document.getElementById("CalendarWidget");
		if (calendarDiv) {
			calendarDiv.innerHTML = output;
		} else {
			console.error("Element #CalendarWidget wurde nicht gefunden.");
		}
	} catch (error) {
		console.error("Error loading calendar data", error);
	}
}


// Funktion zum Laden von Wetterdaten
export async function loadWeatherWidget() {
	const weatherController = new WeatherController();
	try {
		const response = await fetch(Helper.getApiPath("/weather.json"), {
			method: 'POST'
		});
		const data = await response.json();
		console.log("fülle Weather Widget", data);
		weatherController.displayWeather(data);
	} catch (error) {
		console.error("Error loading weather data", error);
	}
}

// Funktion zum Laden von News-Daten
export async function loadNewsWidget() {
	const newsController = new NewsController();
	try {
		const response = await fetch(Helper.getApiPath("/newsCurrent.json"), {
			method: 'POST'
		});
		const data = await response.json();
		console.log("fülle News Widget", data);
		newsController.bindData(data);
	} catch (error) {
		console.error("Error loading news data", error);
	}
}

// Funktion zum Laden von ToDos-Daten
export async function loadTodoWidget() {
	const todo = new TodoController();
	todo.fetchTodos();
}
