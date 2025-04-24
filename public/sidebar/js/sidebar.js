import * as Helper from "../../js/helper.js";

document.addEventListener("DOMContentLoaded", () => {
	Helper.loadCSS("/Sidebar/css/sidebar.css");
	//Helper.applyShadowWithCss("SIDEBAR","../css/sidebar.css");
	loadSidebar();

});

function loadSidebar()
{
	console.log("loadSidebar");
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			console.log("fülle sidebar div");
			document.getElementById("SIDEBAR").innerHTML = this.responseText;
		}
	};
	//xhttp.open("GET", "newsHP.html", true);
	xhttp.open("GET", "/sidebar/sidebar.html", true);
	xhttp.send();
}
