import { CalendarController } from './CalendarController.js';
import * as Helper from "../../js/helper.js";

document.addEventListener("DOMContentLoaded", () => {
    Helper.loadCSS("/Calendar/css/calendar.css");
	const calendar = new CalendarController();
	calendar.init();

	document.querySelector(".card")?.addEventListener("click", () => {
		calendar.flip();


	});
});
