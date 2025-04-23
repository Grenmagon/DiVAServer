import * as Todo from "./todoController.js";

document.addEventListener("DOMContentLoaded", () => {
console.log("onLoad Todo");
    document.getElementById("newTodo").addEventListener("keypress", (e) => {
        if (e.key === "Enter") Weather.getWeather(); // optional
    });

    const addBtn = document.getElementById("addTodo");
    addBtn.addEventListener("click", Todo.addTodo);
    const delAllBtn = document.getElementById("deleteAll");
    delAllBtn.addEventListener("click", Todo.deleteAllTodos);

    Todo.fetchTodos();
});