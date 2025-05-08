/*
import * as Helper from "../../js/helper.js";
import { WeatherController } from "../../Weather/js/weatherController.js";
import { NewsController } from "../../News/js/newsController.js";

export function loadCalendarJSON() {
    let from = Helper.getCurrentDate();
    let to = Helper.getCurrentDate();
	let xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			console.log("fülle Calendar Widget");
			console.log(this.responseText);
			let data = JSON.parse(this.responseText);
			console.log(data);
			let output = "";

			data.appointments.forEach(function(event) {
            	output += `<div><strong>${event.name}</strong><br>${event.from}</div>`;
            });

			document.getElementById("CalendarWidget").innerHTML = output;
		}
	};

	// URL mit von und bis als Parameter
	let url = `/JSON/calendar.json?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`;

	xhttp.open("POST", url, true);
	xhttp.send();
}

export function loadWeatherJSON() {
let weather = new WeatherController();
	let xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			console.log("fülle Weather Widget");
			let data = JSON.parse(this.responseText);
			weather.displayWeather(data);
		}
		else
		console.log(this);
	};

	// URL mit von und bis als Parameter
	let url = `/JSON/weather.json`;

	xhttp.open("POST", url, true);
	xhttp.send();
}

export function loadNewsJSON() {
    const news = new NewsController();
	let xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			console.log("fülle News Widget");
			let data = JSON.parse(this.responseText);
			news.bindData(data);
		}
		else
		    console.log(this);
	};

	// URL mit von und bis als Parameter
	let url = `/JSON/newsCurrent.json`;

	xhttp.open("POST", url, true);
	xhttp.send();
}
*/
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
		const response = await fetch("/JSON/weather.json", {
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
		const response = await fetch("/JSON/newsCurrent.json", {
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
