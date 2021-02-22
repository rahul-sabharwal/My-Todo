// Main object for task and subtasks
var taskObj = [];
var subtasks = [];

// Boolean to check wether sidebar is collapsed or expanded
var collapsed = true;

// Boolean to check whether navbar is horizontal or vertical
var navhorizontal = true;


// Function to get all subtasks
var getSubtasks = (taskname) => {
    var subtaskdiv = document.getElementById('main');
    subtaskdiv.innerHTML = '<button title="' + taskname + '" onclick="addSubtask(this.title)" type="button" class="subtask-adder"><i class="fa fa-plus"></i></button>';
    var subtasklist = document.createElement('ul');
    subtaskdiv.appendChild(subtasklist);

    // traversing through object to get subtask of particular task
    for (var i = 0; i < taskObj.length; i++) {
        if (taskObj[i].tname === taskname) {
            var arr = taskObj[i].subtasks;
        };
    }

    // manipulating DOM for subtasks
    arr.forEach((element) => {
        let li = document.createElement('li');
        li.setAttribute("class", "subtask");
        subtasklist.appendChild(li);
        li.innerHTML += element;
    });
}


// Function to add a new subtask
var addSubtask = (taskname) => {
    const newsubtask = prompt("Add New Subtask in " + taskname);
    // Check for Null Value
    if (newsubtask === null) {
        return;
    }
    // Check for empty spaces values
    else if (/\S/.test(newsubtask)) {
        for (var i = 0; i < taskObj.length; i++) {
            if (taskObj[i].tname === taskname) {
                taskObj[i].subtasks.push(newsubtask);
            };
        }
    }

    // getting subtasks afer adding new subtask
    getSubtasks(taskname);
}


// Function to show subtasks when a task is being clicked
function showSubtasks(taskname) {
    var subtasklist = document.getElementById('main');
    getSubtasks(taskname);
    var subtaskdiv = document.getElementById('main');

    // including button for adding subtsks
    subtaskdiv.innerHTML = '<button title="' + taskname + '" onclick="addSubtask(this.title)" type="button" class="subtask-adder"><i class="fa fa-plus"></i></button>';
    var subtasklist = document.createElement('ul');
    subtaskdiv.appendChild(subtasklist);
    for (var i = 0; i < taskObj.length; i++) {
        if (taskObj[i].tname === taskname) {
            var arr = taskObj[i].subtasks;
        };
    }

    // traversing subtasks add shrinking
    arr.forEach((element) => {
        let li = document.createElement('li');
        li.setAttribute("class", "task-shrink");
        subtasklist.appendChild(li);
        li.innerHTML += element;
    });
}

// Function to add a new task
var addTask = () => {
    const newtask = prompt("Add New Task...");

    // Handle duplicacy of task
    for (var i = 0; i < taskObj.length; i++) {
        if (newtask === taskObj[i].tname) {
            alert("Task Already Present!!!");
            return;
        }
    }
    // Check null values
    if (newtask === null) {
        return;
    }
    // Check value of empty spaces
    if (/\S/.test(newtask)) {
        var element = {
            tname: newtask,
            subtasks: []
        }
        taskObj.push(element);
        localStorage.taskObj = taskObj;
    }
    // Check value of empty spaces
    if (/\S/.test(element.tname)) {
        var tasklist = document.getElementById('tasklist');
        tasklist.innerHTML = '';
        var ar = [];
        for (var i = 0; i < taskObj.length; i++) {
            ar.push(taskObj[i].tname);
        }
        ar.forEach((element) => {
            let li = document.createElement('li');
            li.setAttribute("onclick", "showSubtasks(this.title)");

            // if sidebar is collapsed show first letter of task in capital
            if (collapsed) {
                li.setAttribute("id", "task" + taskObj.length);
                li.setAttribute("class", "task");
                li.setAttribute("title", element);
                tasklist.appendChild(li);
                li.innerHTML = element.charAt(0).toUpperCase();
            } else {
                li.setAttribute("id", "task" + taskObj.length);
                li.setAttribute("class", "task");
                li.setAttribute("title", element);
                tasklist.appendChild(li);
                li.innerHTML += element;
            }

        });
    }
}


// Function to toggle sidebar (to collapse and expand)
var toggleSidebar = () => {
    console.log(document.getElementById("tasks"))

    if (!collapsed) {
        if (!navhorizontal) {
            document.getElementById("main").setAttribute("class", "mainshrinked")
        } else {
            document.getElementById("main").setAttribute("class", "mainexpanded")
        }
        collapsed = true;
        document.getElementById("sidebar").setAttribute("class", "tcollapsed")
        document.getElementById("addtask").setAttribute("class", "task-adder-shrink")
        document.getElementById("addtask").innerHTML = "+";
        document.getElementById("toggleSidebarbtn").setAttribute("class", "toggleSidebarbtncollapsed")
        document.getElementById("toggleicon").setAttribute("class", "fa fa-arrow-right")
        var ar = [];
        var tasklist = document.getElementById('tasklist');
        tasklist.innerHTML = '';
        for (var i = 0; i < taskObj.length; i++) {
            ar.push(taskObj[i].tname);
        }

        ar.forEach((element) => {
            let li = document.createElement('li');
            li.setAttribute("onclick", "showSubtasks(this.title)");
            li.setAttribute("id", "task" + taskObj.length);
            li.setAttribute("class", "task-shrink");
            li.setAttribute("title", element);
            tasklist.appendChild(li);
            li.innerHTML = element.charAt(0).toUpperCase();

        });

    } else {
        if (!navhorizontal) {
            console.log("159")
            document.getElementById("main").setAttribute("class", "mainextrashrinked")
        } else {
            console.log("162")
            document.getElementById("main").setAttribute("class", "mainshrinked")
        }
        collapsed = false;
        document.getElementById("sidebar").setAttribute("class", "tactive")

        document.getElementById("addtask").setAttribute("class", "task-adder")
        document.getElementById("addtask").innerHTML = "+  Add Task";
        document.getElementById("toggleSidebarbtn").setAttribute("class", "toggleSidebarbtn")
        document.getElementById("toggleicon").setAttribute("class", "fa fa-close")

        var ar = [];
        var tasklist = document.getElementById('tasklist');
        tasklist.innerHTML = '';
        for (var i = 0; i < taskObj.length; i++) {
            ar.push(taskObj[i].tname);
        }
        console.log(ar)

        ar.forEach((element) => {
            let li = document.createElement('li');
            li.setAttribute("onclick", "showSubtasks(this.title)");
            li.setAttribute("id", "task" + taskObj.length);
            li.setAttribute("class", "task");
            li.setAttribute("title", element);
            tasklist.appendChild(li);
            li.innerHTML += element;

        });
    }
}

// Toggle Navbar to set Vertical or Horizontal
var toggleNavbar = () => {
    if (navhorizontal) {
        if (!collapsed) {
            document.getElementById("main").setAttribute("class", "mainextrashrinked")
        } else {
            document.getElementById("main").setAttribute("class", "mainshrinked")
        }
        navhorizontal = false;
        document.getElementById("navbarh").setAttribute("class", "navbarhcollapsed");
        document.getElementById("navbarv").setAttribute("class", "navbarvvisible");

    } else {
        if (collapsed) {
            document.getElementById("main").setAttribute("class", "mainexpanded")
        } else {
            document.getElementById("main").setAttribute("class", "mainshrinked")
        }
        navhorizontal = true;
        document.getElementById("navbarv").setAttribute("class", "navbarvcollapsed");
        document.getElementById("navbarh").setAttribute("class", "navbarhvisible");

    }
}