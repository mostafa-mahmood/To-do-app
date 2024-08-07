// Global Variables
const userInput = document.getElementById("userInput");
const addTask = document.getElementById("addTask");
const tasks = document.querySelector(".tasks");

// Load tasks when the page loads
window.onload = loadTasks;

// Add task button click event
addTask.onclick = function() {
    if (userInput.value !== "") {
        let taskId = 'task_' + Date.now(); // Unique ID based on timestamp
        let value = userInput.value;
        saveToLocal(taskId, value, false);
        createElement(taskId, value, false);
    }
}

// Save task to localStorage
function saveToLocal(taskId, value, isChecked) {
    localStorage.setItem(taskId, JSON.stringify({value, isChecked}));
}

// Create new task element
function createElement(taskId, value, isChecked) {
    let newElement = document.createElement("div");
    newElement.classList.add("task");
    newElement.id = taskId;
    newElement.innerHTML = `
        <div class="displayText" style="${isChecked ? 'text-decoration: line-through; background-color: rgb(40, 145, 40);' : ''}">${value}</div>
        <div class="check" onclick="checkTask('${taskId}')"><i class="fa-regular fa-circle-check"></i></div>
        <div class="delete" onclick="deleteTask('${taskId}')"><i class="fa-solid fa-trash"></i></div>
    `;
    tasks.appendChild(newElement);
    userInput.value = "";
}

// Check (complete) a task
function checkTask(taskId) {
    let element = document.getElementById(taskId);
    let child = element.firstElementChild;
    let isChecked = child.style.textDecoration === 'line-through';
    child.style.textDecoration = isChecked ? 'none' : 'line-through';
    child.style.backgroundColor = isChecked ? '' : 'rgb(40, 145, 40)';
    
    // Update localStorage
    let taskData = JSON.parse(localStorage.getItem(taskId));
    taskData.isChecked = !isChecked;
    localStorage.setItem(taskId, JSON.stringify(taskData));
}

// Delete a task
function deleteTask(taskId) {
    localStorage.removeItem(taskId);
    let toDelete = document.getElementById(taskId);
    toDelete.remove();
}

// Load tasks from localStorage
function loadTasks() {
    for (let i = 0; i < localStorage.length; i++) {
        let taskId = localStorage.key(i);
        if (taskId.startsWith('task_')) {
            let taskData = JSON.parse(localStorage.getItem(taskId));
            createElement(taskId, taskData.value, taskData.isChecked);
        }
    }
}