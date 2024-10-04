// Get the modals
var addModal = document.getElementById("taskModal");
var editModal = document.getElementById("editTaskModal");

// Get the buttons that open the modals
var addBtn = document.getElementById("openModalBtn");
var editBtn = document.getElementById("openEditModalBtn");
var removeBtn = document.getElementById("removeTaskBtn");

// Get the <span> element that closes the modals
var closeAddModal = addModal.getElementsByClassName("close")[0];
var closeEditModal = editModal.getElementsByClassName("close")[0];

// Get the task form
var taskForm = document.getElementById("taskForm");
var editTaskForm = document.getElementById("editTaskForm");

// Get the task list
var taskList = document.getElementById('task-list');

// Variable to keep track of selected task
var selectedRow;

// Add Task button click event
addBtn.onclick = function () {
    addModal.style.display = "block";
}

// Edit Task button click event
editBtn.onclick = function () {
    if (!selectedRow) {
        alert("Please select a task to edit.");
        return;
    }
    // Populate the edit modal with selected task details
    document.getElementById('editTaskName').value = selectedRow.cells[1].innerHTML;
    document.getElementById('editTaskDesc').value = selectedRow.cells[2].innerHTML;
    editModal.style.display = "block";
}

// Remove Task button click event
removeBtn.onclick = function () {
    if (!selectedRow) {
        alert("Please select a task to remove.");
        return;
    }
    taskList.deleteRow(selectedRow.rowIndex - 1);
    selectedRow = null;
}

// Close the modals when clicking on the close button
closeAddModal.onclick = function () {
    addModal.style.display = "none";
}
closeEditModal.onclick = function () {
    editModal.style.display = "none";
}

// Close the modal if the user clicks outside of it
window.onclick = function (event) {
    if (event.target == addModal) {
        addModal.style.display = "none";
    } else if (event.target == editModal) {
        editModal.style.display = "none";
    }
}

// Add new task to the list
taskForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var taskName = document.getElementById('taskName').value;
    var taskDesc = document.getElementById('taskDesc').value;

    var newRow = taskList.insertRow(-1);
    newRow.onclick = selectRow; // Add click event to the row
    newRow.insertCell(0).innerHTML = taskList.rows.length;
    newRow.insertCell(1).innerHTML = taskName;
    newRow.insertCell(2).innerHTML = taskDesc;

    taskForm.reset();
    addModal.style.display = "none";
});

// Edit the selected task
editTaskForm.addEventListener('submit', function (e) {
    e.preventDefault();
    selectedRow.cells[1].innerHTML = document.getElementById('editTaskName').value;
    selectedRow.cells[2].innerHTML = document.getElementById('editTaskDesc').value;
    editModal.style.display = "none";
    selectedRow = null;
});

// Function to select a row
function selectRow() {
    if (selectedRow) {
        selectedRow.style.backgroundColor = "";
    }
    selectedRow = this;
    selectedRow.style.backgroundColor = "#f2f2f2"; // Highlight the selected row
}
