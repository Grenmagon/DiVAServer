/*
export async function fetchTodos() {
  const res = await fetch("/Todo/Entries/");
  const data = await res.json();
  const list = document.getElementById("todoList");
  list.innerHTML = "";

  data.entries.forEach(entry => {
  console.log(entry);
    const li = document.createElement("li");
    li.className = entry.done ? "done" : "";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = entry.done;
    checkbox.onchange = () => updateTodo(entry.id, entry.value, checkbox.checked);

    const span = document.createElement("span");
    span.textContent = entry.value;

    const editBtn = document.createElement("button");
    editBtn.textContent = "✎";
    editBtn.onclick = () => editTodo(entry);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑️";
    deleteBtn.onclick = () => deleteTodo(entry.id);

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    list.appendChild(li);
  });
}

export async function addTodo() {
  const input = document.getElementById("newTodo");
  const value = input.value.trim();
  if (!value) return;

  await fetch("/Todo/Entries/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ value, done: "false" })
  });
  input.value = "";
  fetchTodos();
}

export function editTodo(entry) {
  const newValue = prompt("Neuer Text:", entry.value);
  if (newValue === null || newValue.trim() === "") return;
  updateTodo(entry.id, newValue, entry.done);
}

export async function updateTodo(id, value, done) {
  await fetch(`/Todo/Entries/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      value: value,
      done: done.toString()
    })
  });
  fetchTodos();
}

export async function deleteTodo(id) {
  await fetch(`/Todo/Entries/${id}`, {
    method: "DELETE"
  });
  fetchTodos();
}

export async function deleteAllTodos() {
  if (confirm("Wirklich alle ToDos löschen?")) {
    await fetch("/Todo/EntriesAll", {
      method: "DELETE"
    });
    fetchTodos();
  }
}
*/

export class TodoController {
	constructor() {
		this.list = document.getElementById("todoList");
		this.input = document.getElementById("newTodo");
	}

	async fetchTodos() {
		const res = await fetch("/Todo/Entries/");
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

		await fetch("/Todo/Entries/", {
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
		await fetch(`/Todo/Entries/${id}`, {
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
		await fetch(`/Todo/Entries/${id}`, {
			method: "DELETE"
		});
		this.fetchTodos();
	}

	async deleteAllTodos() {
		if (confirm("Wirklich alle ToDos löschen?")) {
			await fetch("/Todo/EntriesAll", {
				method: "DELETE"
			});
			this.fetchTodos();
		}
	}
}
