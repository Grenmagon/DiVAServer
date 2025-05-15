import * as Helper from "../../js/helper.js";
export class NewsController {
	constructor() {
		this.curSelectedNav = null;
		this.cardsContainer = document.getElementById("cards-container");
		this.newsCardTemplate = document.getElementById("template-news-card");
		this.searchInput = document.getElementById("search-text");
		this.searchButton = document.getElementById("search-button");

		// Methodenbindung
		this.handleSearchClick = this.handleSearchClick.bind(this);
		this.loadNews = this.loadNews.bind(this);
		this.bindData = this.bindData.bind(this);

	}

	init() {
		this.loadNewsTopics();
		this.setupSearchListener();
	}

	async loadNewsTopics() {
		let output = "";
		try {
		const response = await fetch(Helper.getApiPath(`/newsTopics.json`), {
			method: 'GET'
		});
		const data = await response.json();
		console.log("lade newsTopics", data);

		data.forEach(category => {
			output += `<li class="menue hover-link nav-item" id="${category}" >${category}</li>`
		});
		} catch (error) {
			console.error("Fehler beim Laden der News-Topics:", error);
		}
		const newsTopics = document.getElementById("newsTopics");
		if (newsTopics) {
			newsTopics.innerHTML = output;
		} else {
			console.error("Element newsTopics wurde nicht gefunden.");
		}

		this.setupNavListeners();
	}

	setupSearchListener() {
		this.searchButton.addEventListener("click", this.handleSearchClick);
		this.searchInput.addEventListener("keypress", (e) => {
			if (e.key === "Enter") this.handleSearchClick();
		});
	}

	handleSearchClick() {
		const query = this.searchInput.value;
		if (!query) return;

		this.loadNews(query);

		this.curSelectedNav?.classList.remove("active");
		this.curSelectedNav = null;
	}

	setupNavListeners() {
		const navItems = document.querySelectorAll(".nav-item");
		navItems.forEach((item) => {
			item.addEventListener("click", () => this.handleNavSelection(item));
		});
	}

	handleNavSelection(item) {
		const id = item.id;
		this.loadNews(id);

		this.curSelectedNav?.classList.remove("active");
		this.curSelectedNav = item;
		this.curSelectedNav.classList.add("active");
	}

	async loadNews(topic) {
		console.log("Lade News für:", topic);

		let url = typeof topic === "undefined" || !topic
			? "/newsCurrent.json"
			: `/news.json?topic=${encodeURIComponent(topic)}`;

		try {
			const response = await fetch(Helper.getApiPath(url), {
				method: "POST"
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();
			console.log("fülle News Widget");
			this.bindData(data);

		} catch (error) {
			console.error("Fehler beim Laden der News:", error);
		}
	}

	bindData(data) {
		this.cardsContainer.innerHTML = "";

		data.articles.forEach((article) => {
			if (!article.imgSrc) return;

			const cardClone = this.newsCardTemplate.content.cloneNode(true);
			this.fillDataInCard(cardClone, article);
			this.cardsContainer.appendChild(cardClone);
		});
	}

	fillDataInCard(cardClone, article) {
		const newsImg = cardClone.querySelector("#news-img");
		const newsTitle = cardClone.querySelector("#news-title");
		const newsSource = cardClone.querySelector("#news-source");
		const newsDesc = cardClone.querySelector("#news-desc");

		newsImg.src = article.imgSrc;
		newsTitle.innerHTML = article.title;
		newsDesc.innerHTML = article.description;

		const date = new Date(article.date).toLocaleString("en-US", {
			timeZone: "Europe/Vienna",
		});

		newsSource.innerHTML = `${article.source} · ${date}`;

		cardClone.firstElementChild.addEventListener("click", () => {
			window.open(article.url, "_blank");
		});
	}
}
