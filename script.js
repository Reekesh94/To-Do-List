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

//   Function to Add a Task
// function addTodo(task, completed = false) {
//     const li = document.createElement("li");
//     li.textContent = task;
  
//     if (completed) li.classList.add("completed");
  
//     li.addEventListener("click", () => {
//       li.classList.toggle("completed");
//       saveTodos();
//     });
  
//     li.addEventListener("contextmenu", (e) => {
//       e.preventDefault();
//       li.remove();
//       saveTodos();
//     });
  
//     list.appendChild(li);
//     saveTodos();
//   }

//   Function to Add a Task with Delete Button and Edit Feature
// This function creates a new list item for the task and appends it to the list
function addTodo(task, completed = false) {
  const li = document.createElement("li");

  const span = document.createElement("span");
  span.textContent = task;
  span.style.flex = "1"; // Makes text take up space, pushes ❌ to right

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "❌";
  deleteBtn.style.background = "transparent";
  deleteBtn.style.border = "none";
  deleteBtn.style.cursor = "pointer";
  deleteBtn.style.fontSize = "16px";

  // Toggle completed when clicking the task text
  span.addEventListener("click", () => {
    li.classList.toggle("completed");
    saveTodos();
  });

  // Delete task on clicking ❌
  deleteBtn.addEventListener("click", () => {
    li.remove();
    saveTodos();
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
        text: li.textContent,
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

//  Function to Filter Tasks
function filterTasks(filter) {
    document.querySelectorAll("li").forEach((li) => {
      switch (filter) {
        case "all":
          li.style.display = "flex";
          break;
        case "active":
          li.style.display = li.classList.contains("completed") ? "none" : "flex";
          break;
        case "completed":
          li.style.display = li.classList.contains("completed") ? "flex" : "none";
          break;
      }
    });
  }
  
// // Make Task Text Editable
//   li.addEventListener("dblclick", () => {
//     const input = document.createElement("input");
//     input.type = "text";
//     input.value = li.textContent;
//     li.textContent = "";
//     li.appendChild(input);
//     input.focus();
  
//     input.addEventListener("blur", () => {
//       li.textContent = input.value;
//       saveTodos();
//     });
  
//     input.addEventListener("keydown", (e) => {
//       if (e.key === "Enter") {
//         input.blur();
//       }
//     });
//   });
  

  