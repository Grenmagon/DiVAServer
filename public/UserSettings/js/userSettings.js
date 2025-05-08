import { UserSettingsController } from "./userSettingsController.js";

document.addEventListener("DOMContentLoaded", async () => {
    const userSettings = new UserSettingsController();
    userSettings.loadUser();
});
