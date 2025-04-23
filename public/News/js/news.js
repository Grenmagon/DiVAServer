import * as News from "./newsController.js";

document.addEventListener("DOMContentLoaded", () => {
console.log("onLoad News");
    News.setupSearchListener();
    News.setupNavListeners();

    News.loadNews();
});

