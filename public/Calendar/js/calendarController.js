/*
export function flip() {
console.log("flip");
    let cardElement = document.querySelector(".card");
  cardElement.classList.toggle("flipped");
}

export function startTime() {
  var weekday = new Array();
  weekday[0] = "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";
  var month = new Array();
  month[0] = "January";
  month[1] = "February";
  month[2] = "March";
  month[3] = "April";
  month[4] = "May";
  month[5] = "June";
  month[6] = "July";
  month[7] = "August";
  month[8] = "September";
  month[9] = "October";
  month[10] = "November";
  month[11] = "December";
  var today = new Date();
  var h = today.getHours();
  var m = today.getMinutes();
  var s = today.getSeconds();
  var d = today.getDate();
  var y = today.getFullYear();
  var wd = weekday[today.getDay()];
  var mt = month[today.getMonth()];

  m = checkTime(m);
  s = checkTime(s);
  document.getElementById("date").innerHTML = d;
  document.getElementById("day").innerHTML = wd;
  document.getElementById("month").innerHTML = mt + "/" + y;

  var t = setTimeout(startTime, 500);
}

export function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}
*/
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
