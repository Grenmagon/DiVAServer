import * as Helper from "../../js/helper.js";

export class WeatherController {
	constructor() {
		this.tempDivInfo = document.getElementById("temp-div");
		this.weatherInfoDiv = document.getElementById("weather-info");
		this.weatherIcon = document.getElementById("weather-icon");
		this.hourlyForecastDiv = document.getElementById("hourly-forecast");
		this.cityInput = document.getElementById("city");

		// Methodenbindung
		this.getWeather = this.getWeather.bind(this);
	}

	async getWeather() {
		const city = this.cityInput.value;

		if (!city) {
			alert("Please enter a city");
			return;
		}

		const url = `/weather.json?city=${encodeURIComponent(city)}`;

		try {
			const response = await fetch(Helper.getApiPath(url), {
				method: "POST"
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();
			console.log("fülle Weather Widget");
			this.displayWeather(data);

		} catch (error) {
			console.error("Fehler beim Abrufen der Wetterdaten:", error);
		}
	}

	displayWeather(data) {
		console.log("displayWeather");

		this.tempDivInfo.innerHTML = '';
		this.weatherInfoDiv.innerHTML = '';
		this.hourlyForecastDiv.innerHTML = '';

		if (data.cod === '404') {
			this.weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
			return;
		}

		const { city: cityName, temperature, description, iconUrl } = data;

		this.tempDivInfo.innerHTML = `<p>${Math.round(temperature)}°C</p>`;
		this.weatherInfoDiv.innerHTML = `
	  <p>${cityName}</p>
	  <p>${description}</p>
	`;

		this.weatherIcon.src = iconUrl;
		this.weatherIcon.alt = description;
		this.weatherIcon.style.display = "block";

		this.displayHourlyForecast(data.hourly);
	}

	displayHourlyForecast(hourlyData) {
		this.hourlyForecastDiv.innerHTML = '';
		const next24Hours = hourlyData.slice(0, 8);

		next24Hours.forEach(item => {
			const { time: dateTime, temperature, iconUrl } = item;
			const date = Helper.parseTimeToDate(dateTime); 
			const time = Helper.formatTimeToHHMM(date);

			const hourlyItemHtml = `
		<div class="hourly-item">
		  <span>${time}</span>
		  <img src="${iconUrl}" alt="Hourly Weather Icon">
		  <span>${Math.round(temperature)}°C</span>
		</div>
	  `;

			this.hourlyForecastDiv.innerHTML += hourlyItemHtml;
		});
	}
}

