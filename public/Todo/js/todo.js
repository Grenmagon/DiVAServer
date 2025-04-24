import { TodoController } from "./todoController.js";

document.addEventListener("DOMContentLoaded", () => {
	console.log("onLoad Todo");

	// Erstelle eine Instanz von TodoController
	const todoController = new TodoController();

	// Event-Listener für das Hinzufügen eines neuen ToDos
	document.getElementById("newTodo").addEventListener("keypress", (e) => {
		if (e.key === "Enter") todoController.addTodo(); // Aufruf der Instanzmethode
	});

	// Button für das Hinzufügen eines neuen ToDos
	const addBtn = document.getElementById("addTodo");
	addBtn.addEventListener("click", () => todoController.addTodo());

	// Button für das Löschen aller ToDos
	const delAllBtn = document.getElementById("deleteAll");
	delAllBtn.addEventListener("click", () => todoController.deleteAllTodos());

	// Initiale Todos abrufen
	todoController.fetchTodos();
});
