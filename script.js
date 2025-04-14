// Getting Elements from HTML
const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");

// Loading Tasks When Page Opens
document.addEventListener("DOMContentLoaded", () => {
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos.forEach((todo) => addTodo(todo.text, todo.completed));
  });

//  Adding a New Task 
form.addEventListener("submit", (e) => {
    e.preventDefault(); // Stops page reload
    const task = input.value.trim(); // Gets what user typed
    if (task) {
      addTodo(task); // Add task to the list
      input.value = ""; // Clear the input field
    }
  });

//   Function to Add a Task with Delete Button and Edit Feature
// This function creates a new list item for the task and appends it to the list
function addTodo(task, completed = false) {
  const li = document.createElement("li");

  const span = document.createElement("span");
  span.textContent = task;
  span.style.flex = "1"; // Makes text take up space, pushes ❌ to right

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "❌";
  deleteBtn.className = "delete-btn";
  deleteBtn.style.background = "none";
  deleteBtn.style.border = "none";
  deleteBtn.style.cursor = "pointer";
  deleteBtn.style.fontSize = "16px";
  deleteBtn.style.marginLeft = "10px";

  span.addEventListener("contextmenu", (e) => {
    e.preventDefault(); // prevents right-click from doing anything
  });  

  // Delete task on clicking ❌
  deleteBtn.addEventListener("click", () => {
    li.remove(); // removes from the page
    saveTodos();  // updates localStorage so it's gone permanently
  });

  // Make editable on double-click
  span.addEventListener("dblclick", () => {
    const input = document.createElement("input");
    input.type = "text";
    input.value = span.textContent;
    span.replaceWith(input);
    input.focus();

    input.addEventListener("blur", () => {
      span.textContent = input.value;
      input.replaceWith(span);
      saveTodos();
    });

    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") input.blur();
    });
  });

   // If task is completed
  if (completed) li.classList.add("completed");

  li.appendChild(span);
  li.appendChild(deleteBtn);
  list.appendChild(li);
  saveTodos();
}


//   Function to Save Tasks to Local Storage
function saveTodos() {
    const todos = [];
    document.querySelectorAll("li").forEach((li) => {
      todos.push({
        text: li.querySelector("span").textContent,
        completed: li.classList.contains("completed"),
      });
    });
    localStorage.setItem("todos", JSON.stringify(todos));
  }

//    Function to Clear All Tasks
function clearAll() {
  if (confirm("Are you sure you want to delete all tasks?")) {
    localStorage.removeItem("todos");
    list.innerHTML = "";
  }
}
