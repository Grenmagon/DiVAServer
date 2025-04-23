import * as Helper from "../../js/helper.js";
import * as Weather from "../../Weather/js/weatherController.js";
import * as News from "../../News/js/newsController.js";

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
	let xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			console.log("fülle Weather Widget");
			let data = JSON.parse(this.responseText);
			Weather.displayWeather(data);
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
	let xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			console.log("fülle News Widget");
			let data = JSON.parse(this.responseText);
			//displayWeather(data);
			console.log(data);
			News.bindData(data);
		}
		else
		    console.log(this);
	};

	// URL mit von und bis als Parameter
	let url = `/JSON/newsCurrent.json`;

	xhttp.open("POST", url, true);
	xhttp.send();
}

