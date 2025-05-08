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

			setLogout();
		}
	};
	//xhttp.open("GET", "newsHP.html", true);
	xhttp.open("GET", "/sidebar/sidebar.html", true);
	xhttp.send();
}

function setLogout() {
    const logoutElement = document.getElementById("logout-link");
    logoutElement.addEventListener("click", logout);
}


async function logout() {
    try {
        const response = await fetch("/logout", {
            method: "POST",
            credentials: "include" // wichtig, damit Cookies mitgeschickt werden
        });

        if (response.ok) {
            // Optionale Meldung anzeigen
            console.log("Erfolgreich ausgeloggt");
            // Weiterleitung zur Start- oder Login-Seite
            window.location.href = "/index.html";
        } else {
            console.error("Logout fehlgeschlagen");
        }
    } catch (error) {
        console.error("Fehler beim Logout:", error);
    }
}


