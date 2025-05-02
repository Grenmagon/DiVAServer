import { NewsController } from './newsController.js';
import * as Helper from "../../js/helper.js";

document.addEventListener("DOMContentLoaded", () => {
    Helper.loadCSS("/News/css/news.css");
	const newsController = new NewsController();
	newsController.init();
	newsController.loadNews(); // Start mit aktuellen News
});


