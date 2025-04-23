import * as Calendar from "./calendarController.js";

document.addEventListener("DOMContentLoaded", () => {
let cardElement = document.querySelector(".card");
cardElement.addEventListener("click", Calendar.flip);

Calendar.startTime();

});

