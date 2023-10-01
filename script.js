// Initialize tasks array by retrieving from local storage
let tasks = JSON.parse(localStorage.getItem('tasks')) || []

// Function to save tasks to local storage
function saveTasksToLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

// Task form submission
document.getElementById('task-form').addEventListener('submit', function (e) {
  e.preventDefault()
  const title = document.getElementById('task-title').value
  const description = document.getElementById('task-description').value
  const dueDate = document.getElementById('due-date').value
  const assignee = document.getElementById('assignee').value

  // Create a new task object
  const task = {
    title,
    description,
    dueDate,
    assignee,
    completed: false,
  }

  // Add the task to the tasks array
  tasks.push(task)

  // Save tasks to local storage
  saveTasksToLocalStorage()

  // Clear the form inputs
  document.getElementById('task-form').reset()

  // Display the tasks
  displayTasks()
})

// Display tasks in the task list
function displayTasks() {
  const taskList = document.getElementById('task-list')
  taskList.innerHTML = ''

  tasks.forEach((task, index) => {
    const listItem = document.createElement('li')
    listItem.className = `list-group-item ${task.completed ? 'completed' : ''}`
    listItem.innerHTML = `
            <div>
                <h5>${task.title}</h5>
                <p>${task.description}</p>
                <small>Due Date: ${task.dueDate}</small>
                <br>
                <small>Assignee: ${task.assignee}</small>
            </div>
            <div>
                <button class="btn btn-success" onclick="completeTask(${index})">Complete</button>
                <button class="btn btn-danger" onclick="deleteTask(${index})">Delete</button>
            </div>
        `
    taskList.appendChild(listItem)
  })
}

// Complete a task
function completeTask(index) {
  tasks[index].completed = true
  saveTasksToLocalStorage() // Save tasks after completing one
  displayTasks()
}

// Delete a task
function deleteTask(index) {
  tasks.splice(index, 1)
  saveTasksToLocalStorage() // Save tasks after deleting one
  displayTasks()
}

// Initial display of tasks
displayTasks()
