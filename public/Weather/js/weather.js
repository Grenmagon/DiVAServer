import * as Weather from "./weatherController.js";

document.addEventListener("DOMContentLoaded", () => {
    console.log("load Weather");
    document.getElementById("city").addEventListener("keypress", (e) => {
        if (e.key === "Enter") Weather.getWeather(); // optional
    });

    const button = document.getElementById("getWeather");
    button.addEventListener("click", Weather.getWeather);
});

