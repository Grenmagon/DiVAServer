
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
		const response = await fetch(`/JSON/calendar.json?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`, {
			method: 'POST'
		});
		const data = await response.json();
		console.log("lade appointments", data);

		let output = "";
		data.appointments.forEach(event => {
			output += `<div><strong>${event.name}</strong><br>${event.from}</div>`;
		});
		return output;
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
