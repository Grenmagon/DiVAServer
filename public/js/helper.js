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
