import * as Helper from "../../js/helper.js";

export class CalendarController {
	constructor() {
		this.cardElement = document.querySelector(".card");
		this.dateElement = document.getElementById("date");
		this.dayElement = document.getElementById("day");
		this.monthElement = document.getElementById("month");

		this.weekdays = [
			"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
		];

		this.months = [
			"January", "February", "March", "April", "May", "June",
			"July", "August", "September", "October", "November", "December"
		];
	}

	init() {
		this.startTime();
	}

	async fillBackSide(from, to)
	{
		try {
			const output = await this.loadAppointments(from, to);
			const calendarDiv = document.getElementById("calendarBackside");
			if (calendarDiv) {
				calendarDiv.innerHTML = output;
			} else {
				console.error("Element calendarBackside wurde nicht gefunden.");
			}
		} catch (error) {
			console.error("Error loading calendar data", error);
		}
	}

	async loadAppointments(from, to) {
		const response = await fetch(Helper.getApiPath(`/calendar.json?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`), {
			method: 'POST'
		});
		const data = await response.json();
		console.log("lade appointments", data);


		let output = "";
		output = this.renderAppointments(data.appointments);
		return output;
	}

	renderAppointments(appointments) {
    	const container = document.createElement("div");

    	appointments.forEach(entry => {
    		const div = document.createElement("div");
    		div.className = "appointment-item";

    		// Name
    		const name = document.createElement("strong");
    		name.textContent = entry.name;

    		// Datum & Zeit formatieren
    		const fromDate = new Date(entry.from);
    		const toDate = new Date(entry.to);

    		// Lokales Datum + Zeit (falls Uhrzeit enthalten ist)
    		const optionsDate = { year: 'numeric', month: 'short', day: 'numeric' };
    		const optionsTime = { hour: '2-digit', minute: '2-digit' };

    		const dateStrFrom = fromDate.toLocaleDateString("de-AT", optionsDate);
    		const timeStrFrom = entry.from.includes("T")
    			? `, ${fromDate.toLocaleTimeString("de-AT", optionsTime)}`
    			: "";

    		const dateStrTo = toDate.toLocaleDateString("de-AT", optionsDate);
            const timeStrTo = entry.to.includes("T")
                ? `, ${toDate.toLocaleTimeString("de-AT", optionsTime)}`
                : "";

    		const info = document.createElement("div");
    		info.textContent = `${dateStrFrom}${timeStrFrom} - ${dateStrTo}${timeStrTo}`;

    		div.appendChild(name);
    		div.appendChild(info);
    		container.appendChild(div);
    	});

    	return container.outerHTML;
    }


	flip() {
		console.log("flip");
		this.cardElement?.classList.toggle("flipped");
	}

	startTime() {
		const today = new Date();
		const h = today.getHours();
		const m = this.checkTime(today.getMinutes());
		const s = this.checkTime(today.getSeconds());
		const d = today.getDate();
		const y = today.getFullYear();
		const wd = this.weekdays[today.getDay()];
		const mt = this.months[today.getMonth()];

		if (this.dateElement) this.dateElement.innerHTML = d;
		if (this.dayElement) this.dayElement.innerHTML = wd;
		if (this.monthElement) this.monthElement.innerHTML = `${mt}/${y}`;

		setTimeout(() => this.startTime(), 500);
	}

	checkTime(i) {
		return i < 10 ? "0" + i : i;
	}
}
