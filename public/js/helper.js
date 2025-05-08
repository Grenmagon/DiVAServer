export function getCurrentDate() {
	const today = new Date();
	const year = today.getFullYear();
	const month = String(today.getMonth() + 1).padStart(2, '0'); // Monate sind 0-basiert!
	const day = String(today.getDate()).padStart(2, '0');
	return `${year}-${month}-${day}`;
}

export function applyShadowWithCss(containerId, cssUrl) {
	const host = document.getElementById(containerId);
	if (!host) {
		console.error("Element mit ID '" + containerId + "' nicht gefunden.");
		return;
	}

	const shadow = host.attachShadow({ mode: "open" });

	// CSS-Link dynamisch laden
	const styleLink = document.createElement("link");
	styleLink.rel = "stylesheet";
	styleLink.href = cssUrl;
	shadow.appendChild(styleLink);

	// Vorhandenen Inhalt in Shadow DOM verschieben
	const content = document.createElement("div");
	content.innerHTML = host.innerHTML;
	shadow.appendChild(content);

	// Optional: Originalinhalt entfernen, um Dopplung zu vermeiden
	host.innerHTML = "";
}


export function loadCSS(cssUrl) {
	const link = document.createElement("link");
	link.rel = "stylesheet";
	link.href = cssUrl;
	document.head.appendChild(link);
}

export function parseTimeToDate(timeStr) {
    // Beispielinput: "09:00:00 PM"
    const [time, modifier] = timeStr.trim().split(' ');
    let [hours, minutes, seconds] = time.split(':').map(Number);

    if (modifier === 'PM' && hours < 12) {
        hours += 12;
    } else if (modifier === 'AM' && hours === 12) {
        hours = 0;
    }

    // Erzeuge ein Date mit festem Datum (z. B. 1970-01-01)
    return new Date(1970, 0, 1, hours, minutes, seconds);
}

export function formatTimeToHHMM(date) {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
}


