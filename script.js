let tasks = [];
let deletedTasks = [];

// Function to load the login screen
function loadLogin(userType) {
  document.getElementById('homeScreen').style.display = 'none';
  document.getElementById('loginScreen').style.display = 'block';
  document.getElementById('loginTitle').innerText = userType === 'admin' ? 'Admin Login' : 'Employee Login';
  localStorage.setItem('userType', userType);
}

// Function to handle login submit
function submitLogin() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const userType = localStorage.getItem('userType');

  const adminUser = { username: 'admin', password: 'admin123' };
  const employeeUser = { username: 'employee', password: 'emp123' };

  if ((userType === 'admin' && username === adminUser.username && password === adminUser.password) ||
      (userType === 'employee' && username === employeeUser.username && password === employeeUser.password)) {
    document.getElementById('loginScreen').style.display = 'none';
    if (userType === 'admin') {
      document.getElementById('adminDashboard').style.display = 'block';
    } else {
      document.getElementById('employeeDashboard').style.display = 'block';
      displayEmployeeTasks();
    }
  } else {
    alert('Invalid login credentials');
  }
}

// Function to go back to the home screen
function goHome() {
  document.getElementById('homeScreen').style.display = 'block';
  document.getElementById('loginScreen').style.display = 'none';
  document.getElementById('adminDashboard').style.display = 'none';
  document.getElementById('employeeDashboard').style.display = 'none';
  document.getElementById('taskBinSection').style.display = 'none';
  localStorage.removeItem('userType');
}

// Function to assign tasks
function assignTask() {
  const taskDescription = document.getElementById('taskDescription').value;
  const dueDate = document.getElementById('dueDate').value;

  if (taskDescription && dueDate) {
    tasks.push({ description: taskDescription, dueDate, completed: false });
    displayAdminTasks();
  } else {
    alert('Please fill out both fields');
  }
}

// Display tasks for the admin
function displayAdminTasks() {
  const adminTaskList = document.getElementById('adminTaskList');
  adminTaskList.innerHTML = '';
  tasks.forEach((task, index) => {
    adminTaskList.innerHTML += `
      <li>
        <strong>${task.description}</strong> (Due: ${task.dueDate}) 
        <button onclick="deleteTask(${index})"><i class="fas fa-trash"></i> Delete</button>
        ${task.completed ? '<span> (Completed)</span>' : ''}
      </li>`;
  });
}

// Display tasks for the employee
function displayEmployeeTasks() {
  const employeeTaskList = document.getElementById('employeeTaskList');
  employeeTaskList.innerHTML = '';
  tasks.forEach((task, index) => {
    if (!task.completed) {
      employeeTaskList.innerHTML += `
        <li>
          <strong>${task.description}</strong> (Due: ${task.dueDate})
          <button onclick="markTaskAsDone(${index})"><i class="fas fa-check"></i> Done</button>
        </li>`;
    }
  });
}

// Function to delete a task
function deleteTask(index) {
  deletedTasks.push(tasks[index]);
  tasks.splice(index, 1);
  displayAdminTasks();
  displayDeletedTasks();
}

// Function to display deleted tasks
function displayDeletedTasks() {
  const taskBin = document.getElementById('taskBin');
  taskBin.innerHTML = '';
  deletedTasks.forEach((task, index) => {
    taskBin.innerHTML += `
      <li>
        <strong>${task.description}</strong> (Due: ${task.dueDate}) 
        <button onclick="restoreTask(${index})"><i class="fas fa-undo"></i> Restore</button>
      </li>`;
  });
  document.getElementById('taskBinSection').style.display = deletedTasks.length > 0 ? 'block' : 'none';
}

// Function to clear all deleted tasks
function clearDeletedTasks() {
  deletedTasks = [];
  displayDeletedTasks();
}

// Function to restore a deleted task
function restoreTask(index) {
  tasks.push(deletedTasks[index]);
  deletedTasks.splice(index, 1);
  displayAdminTasks();
  displayDeletedTasks();
}

// Function to mark a task as done
function markTaskAsDone(index) {
  tasks[index].completed = true;
  displayEmployeeTasks();
  displayAdminTasks();
}

// Function to log out
function logout() {
  document.getElementById('homeScreen').style.display = 'block';
  document.getElementById('loginScreen').style.display = 'none';
  document.getElementById('adminDashboard').style.display = 'none';
  document.getElementById('employeeDashboard').style.display = 'none';
  document.getElementById('taskBinSection').style.display = 'none';
  localStorage.removeItem('userType');
}

// Function to display contact us message
function contactUs() {
  alert('Contact us at: info@localcompany.com');
}
