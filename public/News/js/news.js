import { NewsController } from './newsController.js';

document.addEventListener("DOMContentLoaded", () => {
	const newsController = new NewsController();
	newsController.init();
	newsController.loadNews(); // Start mit aktuellen News
});


