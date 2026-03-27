let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

// ===== SAVE =====
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// ===== RENDER =====
function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  let filtered = tasks.filter(task => {
    if (currentFilter === "active") return !task.completed;
    if (currentFilter === "done") return task.completed;
    return true;
  });

  filtered.forEach((task, index) => {
    const li = document.createElement("li");
    if (task.completed) li.classList.add("completed");

    const span = document.createElement("span");
    span.textContent = task.text;

    span.onclick = () => {
      task.completed = !task.completed;
      saveTasks();
      renderTasks();
    };

    const actions = document.createElement("div");
    actions.className = "actions";

    const editBtn = document.createElement("button");
    editBtn.textContent = "✏️";
    editBtn.onclick = () => editTask(index);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑️";
    deleteBtn.onclick = () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    };

    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    li.appendChild(span);
    li.appendChild(actions);

    list.appendChild(li);
  });
}

// ===== ADD =====
function addTask() {
  const input = document.getElementById("taskInput");
  const text = input.value.trim();

  if (!text) return;

  tasks.push({ text, completed: false });
  saveTasks();
  renderTasks();

  input.value = "";
}

// ===== EDIT =====
function editTask(index) {
  const newText = prompt("Edit task:", tasks[index].text);
  if (newText !== null) {
    tasks[index].text = newText;
    saveTasks();
    renderTasks();
  }
}

// ===== FILTER =====
function filterTasks(type) {
  currentFilter = type;
  renderTasks();
}

// ===== ENTER KEY =====
document.getElementById("taskInput")
  .addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      addTask();
    }
  });

// ===== DARK MODE =====
const toggle = document.getElementById("themeToggle");

toggle.onclick = () => {
  document.body.classList.toggle("light");

  localStorage.setItem(
    "theme",
    document.body.classList.contains("light") ? "light" : "dark"
  );
};

(function () {
  const saved = localStorage.getItem("theme");
  if (saved === "light") {
    document.body.classList.add("light");
  }
})();

// INIT
renderTasks();