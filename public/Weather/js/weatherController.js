/*

export function displayWeather(data) {
    console.log("displayWeather");
    const tempDivInfo = document.getElementById("temp-div");
    const weatherInfoDiv = document.getElementById("weather-info");
    const weatherIcon = document.getElementById("weather-icon");
    const hourlyForecastDiv = document.getElementById("hourly-forecast");

    // Clear previous content
    weatherInfoDiv.innerHTML = '';
    hourlyForecastDiv.innerHTML = '';
    tempDivInfo.innerHTML = '';

    if (data.cod === '404') {
        weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
    } else {
        const cityName = data.city;
        const temperature = Math.round(data.temperature);
        const description = data.description;
        const iconUrl = data.iconUrl;

        const temperatureHTML = `
            <p>${temperature}°C</p>
        `;

        const weatherHtml = `
            <p>${cityName}</p>
            <p>${description}</p>
        `;

        tempDivInfo.innerHTML = temperatureHTML;
        weatherInfoDiv.innerHTML = weatherHtml;
        weatherIcon.src = iconUrl;
        weatherIcon.alt = description;

        showImage();

        displayHourlyForecast(data.hourly);
    }
}

export function displayHourlyForecast(hourlyData) {
    const hourlyForecastDiv = document.getElementById('hourly-forecast');

    const next24Hours = hourlyData.slice(0, 8); // Display the next 24 hours (3-hour intervals)

    next24Hours.forEach(item => {
        const dateTime = item.time; // Convert timestamp to milliseconds
        //const hour = dateTime.getHours();
        const temperature = Math.round(item.temperature); // Convert to Celsius
        const iconUrl = item.iconUrl;

        const hourlyItemHtml = `
            <div class="hourly-item">
                <span>${dateTime}</span>
                <img src="${iconUrl}" alt="Hourly Weather Icon">
                <span>${temperature}°C</span>
            </div>
        `;

        hourlyForecastDiv.innerHTML += hourlyItemHtml;
    });
}

export function showImage() {
    const weatherIcon = document.getElementById('weather-icon');
    weatherIcon.style.display = 'block'; // Make the image visible once it's loaded
}

export function getWeather() {

const city = document.getElementById("city").value;

    if (!city) {
        alert("Please enter a city");
        return;
    }
	let xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			console.log("fülle Weather Widget");
			let data = JSON.parse(this.responseText);
			displayWeather(data);
		}
		else
		console.log(this);
	};

	// URL mit von und bis als Parameter
	let url = "/JSON/weather.json?city=" + city;

	xhttp.open("POST", url, true);
	xhttp.send();
}
*/

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

		const url = `/JSON/weather.json?city=${encodeURIComponent(city)}`;

		try {
			const response = await fetch(url, {
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
			console.log(dateTime);
			const date = Helper.parseTimeToDate(dateTime); 
			const time = Helper.formatTimeToHHMM(date);

			console.log(date);
			console.log(time);

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

