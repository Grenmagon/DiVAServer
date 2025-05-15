import * as Helper from "../../js/helper.js";
export class TodoController {
	constructor() {
		this.list = document.getElementById("todoList");
		this.input = document.getElementById("newTodo");
	}

	async fetchTodos() {
		const res = await fetch(Helper.getApiPath("/Todo/Entries.json"));
		const data = await res.json();
		this.list.innerHTML = "";

		data.entries.forEach((entry) => {
			const li = document.createElement("li");
			li.className = entry.done ? "done" : "";

			const checkbox = document.createElement("input");
			checkbox.type = "checkbox";
			checkbox.checked = entry.done;
			checkbox.onchange = () => this.updateTodo(entry.id, entry.value, checkbox.checked);

			const span = document.createElement("span");
			span.textContent = entry.value;

			const editBtn = document.createElement("button");
			editBtn.textContent = "✎";
			editBtn.onclick = () => this.editTodo(entry);

			const deleteBtn = document.createElement("button");
			deleteBtn.textContent = "🗑️";
			deleteBtn.onclick = () => this.deleteTodo(entry.id);

			li.appendChild(checkbox);
			li.appendChild(span);
			li.appendChild(editBtn);
			li.appendChild(deleteBtn);
			this.list.appendChild(li);
		});
	}

	async addTodo() {
		const value = this.input.value.trim();
		if (!value) return;

		await fetch(Helper.getApiPath("/Todo/Entries/"), {
			method: "POST",
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
			body: new URLSearchParams({ value, done: "false" })
		});
		this.input.value = "";
		this.fetchTodos();
	}

	editTodo(entry) {
		const newValue = prompt("Neuer Text:", entry.value);
		if (newValue === null || newValue.trim() === "") return;
		this.updateTodo(entry.id, newValue, entry.done);
	}

	async updateTodo(id, value, done) {
		await fetch(Helper.getApiPath(`/Todo/Entries/${id}`), {
			method: "PUT",
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
			body: new URLSearchParams({
				value: value,
				done: done.toString()
			})
		});
		this.fetchTodos();
	}

	async deleteTodo(id) {
		await fetch(Helper.getApiPath(`/Todo/Entries/${id}`), {
		method: "DELETE"
		});
		this.fetchTodos();
	}

	async deleteAllTodos() {
		if (confirm("Wirklich alle ToDos löschen?")) {
			await fetch(Helper.getApiPath("/Todo/EntriesAll"), {
				method: "DELETE"
			});
			this.fetchTodos();
		}
	}
}
