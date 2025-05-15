import * as Helper from "../../js/helper.js";
export class  LoginController {
	constructor() {
	}

	async signUp() {
		const userName = document.getElementById("username");
		const passwd = document.getElementById("password");
		const passwd2 = document.getElementById("password2");
		const passwdInfo = document.getElementById("info");

		if (passwd.value.trim() !== passwd2.value.trim()) {
			if (passwdInfo) {
				passwdInfo.innerHTML = "Passwörter sind nicht gleich!";
				return;
			}
		}

		try {
			const response = await fetch(Helper.getLoginPath(`addUser`),{
				method: 'POST',
				headers: { "Content-Type": "application/x-www-form-urlencoded" },
				body: new URLSearchParams({
					userName: userName.value.trim(),
					passwd: passwd.value.trim()
				})

			});
			console.log(response.status);
			if (response.status === 200)
			{
				window.location.href = "/index.html";
				return;
			}
			else if (response.status === 409)
			{
				passwdInfo.innerHTML = "Benutzer existiert bereits!";
				return;
			}
			console.log("redirect error");
		} catch (error) {
			console.error("Fehler beim anlegen von Benutzern: ", error);
		}

	}
}

