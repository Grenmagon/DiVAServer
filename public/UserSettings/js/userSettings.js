import { UserSettingsController } from "./userSettingsController.js";
import * as Helper from "../../js/helper.js";

document.addEventListener("DOMContentLoaded", async () => {
    Helper.loadCSS("/UserSettings/css/userSettings.css");
    const userSettings = new UserSettingsController();
    //userSettings.loadUser();
});
