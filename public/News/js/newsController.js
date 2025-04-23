let curSelectedNav = null;

export function setupSearchListener() {
    const button = document.getElementById("search-button");
    const input = document.getElementById("search-text");
    button.addEventListener("click", () => {
        handleSearchClick(input);
    });
    input.addEventListener("keypress", (e) => {
            if (e.key === "Enter") handleSearchClick(input); // optional
        });
}

export function handleSearchClick(input) {
    const query = input.value;
    if (!query) return;
    loadNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
}

export function setupNavListeners() {
    const navItems = document.querySelectorAll(".nav-item");

    navItems.forEach((item) => {
        item.addEventListener("click", () => {
            handleNavSelection(item);
        });
    });
}

export function handleNavSelection(item) {
    const id = item.id;
    loadNews(id);

    curSelectedNav?.classList.remove("active");
    curSelectedNav = item;
    curSelectedNav.classList.add("active");
}

export function bindData(data) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";

    data.articles.forEach((article) => {
        if (!article.imgSrc) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

export function fillDataInCard(cardClone, article) {
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

export function loadNews(topic) {
console.log(topic);
	let xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			console.log("fülle News Widget");
			let data = JSON.parse(this.responseText);
			bindData(data);
		}
		else
		    console.log(this);
	};

	// URL mit von und bis als Parameter
	let url = "";
	if (typeof topic === "undefined")
	    url = "/JSON/newsCurrent.json";
	else
	    url = "/JSON/news.json?topic="+ topic;


	xhttp.open("POST", url, true);
	xhttp.send();
}
