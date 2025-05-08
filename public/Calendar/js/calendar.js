import { CalendarController } from './CalendarController.js';
import * as Helper from "../../js/helper.js";

document.addEventListener("DOMContentLoaded", () => {
    Helper.loadCSS("/Calendar/css/calendar.css");
	const calendar = new CalendarController();
	calendar.init();
	const from = Helper.getCurrentDate();
	const to = Helper.getCurrentDate();
	calendar.fillBackSide(from, to);

	document.querySelector(".card")?.addEventListener("click", () => {
		calendar.flip();


	});
});
