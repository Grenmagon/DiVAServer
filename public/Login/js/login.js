import { LoginController } from './loginController.js';
import * as Helper from "../../js/helper.js";

document.addEventListener("DOMContentLoaded", () => {
    Helper.loadCSS("/Login/css/login.css");
		const login = new LoginController();
    	document.getElementById("signUpBtn").addEventListener("keypress", (e) => {
    		if (e.key === "Enter") login.signUp(); // optional
    	});

    	const button = document.getElementById("signUpBtn");
    	button.addEventListener("click", login.signUp);
});


