// todo.ts

type Task = { id: number; title: string; completed: boolean; };

const tasks: Task[] = [];

function addTask(title: string) {
    const task = {
        id: tasks.length + 1,
        title: title,
        completed: false,
    };
    tasks.push(task);
    renderTasks();
}

function completeTask(id: number) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = true;
        renderTasks();
    }
}

function renderTasks() {
    const list = document.getElementById("task-list");
    if (list == null) {
        throw new Error("element with ID 'task-title' does not exist");
    }
    list.innerHTML = "";

    tasks.forEach(task => {
        const li = document.createElement("li");
        li.className = task.completed ? "completed" : "";
        li.innerHTML = `
      ${task.title}
      <button onclick="completeTask(${task.id})">✔</button>
    `;
        list.appendChild(li);
    });
}

// Handle form submission
let taskForm = document.getElementById("task-form");
if (taskForm == null) throw new Error("element with ID 'task-form' does not exist");

taskForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const input = <HTMLInputElement>document.getElementById("task-title");
    if (input == null) throw new Error("element with ID 'task-title' does not exist");

    const title = input.value.trim();
    if (title !== "") {
        addTask(title);
        input.value = "";
    }
});
