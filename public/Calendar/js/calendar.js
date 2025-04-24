import { CalendarController } from './CalendarController.js';

document.addEventListener("DOMContentLoaded", () => {
	const calendar = new CalendarController();
	calendar.init();

	document.querySelector(".card")?.addEventListener("click", () => {
		calendar.flip();
	});
});
