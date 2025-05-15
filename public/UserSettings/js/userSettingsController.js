import * as Helper from "../../js/helper.js";
export class UserSettingsController {
    constructor(){
    }

	async loadUser() {
		const form = document.getElementById("userForm");

		try {
			const response = await fetch(Helper.getApiPath("/settings.json"));
			if (!response.ok) throw new Error("Fehler beim Laden der Benutzerdaten.");
			const user = await response.json();

			document.getElementById("nameGiven").value = user.nameGiven || "";
			document.getElementById("nameFamily").value = user.nameFamily || "";
			document.getElementById("login").value = user.login || "";
			document.getElementById("calendarId").value = user.CalendarId || "";
			document.getElementById("calendarKey").value = user.CalendarKey || "";
			document.getElementById("homeCity").value = user.homeCity || "";
			document.getElementById("mainNews").value = user.mainNews || "";
			document.getElementById("newsTopics").value = (user.newsTopics || []).join(";") || "";
			document.getElementById("language").value = user.language || "en";
		} catch (error) {
			alert("Fehler beim Laden: " + error.message);
		}

		form.addEventListener("submit", async (e) => {
			e.preventDefault();
			this.sendChange();

		});
	}

	async sendChange() {
		console.log("sendChange");
		const newPassword = document.getElementById("newPassword").value.trim();
		const confirmPassword = document.getElementById("confirmPassword").value.trim();

		if (newPassword && newPassword !== confirmPassword) {
			alert("Die Passwörter stimmen nicht überein!");
			return;
		}


		try {
			const form = document.getElementById("userForm");
			const formData = new FormData(form);
			const body = new URLSearchParams();

			for (const [key, value] of formData.entries()) {
				body.append(key, value);
			}

			let result = await fetch(Helper.getApiPath("/settings"), {
				method: "POST",
				headers: { "Content-Type": "application/x-www-form-urlencoded" },
				body: body
			});

			if (result.ok) {
				alert("Benutzerdaten gespeichert.");
				//window.location.href = "/index.html";
			} else {
				alert("Fehler beim Speichern.");
			}
		} catch (err) {
			alert("Fehler beim Senden: " + err.message);
		}
	}
}
