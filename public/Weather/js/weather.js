//import * as Weather from "./weatherController.js";
import { WeatherController } from './weatherController.js';


document.addEventListener("DOMContentLoaded", () => {
	console.log("load Weather");
	const weather = new WeatherController();
	document.getElementById("city").addEventListener("keypress", (e) => {
		if (e.key === "Enter") weather.getWeather(); // optional
	});

	const button = document.getElementById("getWeather");
	button.addEventListener("click", weather.getWeather);
});

