var stvisible = false;

var taskObj = [];
var subtasks = [];
var collapsed = false;



var getSubtasks = (taskname) => {
    var subtaskdiv = document.getElementById('subtasks');
    subtaskdiv.innerHTML='<button onclick="addSubtask(this.innerHTML)" type="button" class="task-adder">+ Add Subtask to '+taskname+'</button>';
    var subtasklist = document.createElement('ul');
    subtaskdiv.appendChild(subtasklist);
    for(var i=0;i<taskObj.length;i++){
        if(taskObj[i].tname === taskname){
            var arr = taskObj[i].subtasks;
        };
    }
    console.log(arr);

    arr.forEach((element) => {
        let li = document.createElement('li');
        subtasklist.appendChild(li);
        li.innerHTML += element;
    });
}

var addSubtask = (taskname) => {
    taskname = taskname.substring(17, taskname.length+1);
    console.log(taskname);
    const newsubtask = prompt("Add New Subtask in "+taskname);
    if(newsubtask===null){
        return;
    }
    else if(/\S/.test(newsubtask)){
        for(var i=0;i<taskObj.length;i++){
            if(taskObj[i].tname === taskname){
                taskObj[i].subtasks.push(newsubtask);
                localStorage.taskObj = taskObj;
            };
        }
    }
    getSubtasks(taskname);
}

function showSubtasks(taskname) {
    console.log(taskname);
    var subtasklist = document.getElementById('subtasks');
    getSubtasks(taskname);
    if (collapsed){    
        subtasklist.innerHTML = '<button onclick="addSubtask(this.innerHTML)" type="button" class="task-adder">+ Add Subtask to '+taskname+'</button>';
    } else{

    }
    var subtaskdiv = document.getElementById('subtasks');
    subtaskdiv.innerHTML='<button onclick="addSubtask(this.innerHTML)" type="button" class="task">+ Add Subtask to '+taskname+'</button>';
    var subtasklist = document.createElement('ul');
    subtaskdiv.appendChild(subtasklist);
    for(var i=0;i<taskObj.length;i++){
        if(taskObj[i].tname === taskname){
            var arr = taskObj[i].subtasks;
        };
    }
    console.log(arr);

    arr.forEach((element) => {
        let li = document.createElement('li');
        subtasklist.appendChild(li);
        li.innerHTML += element;
    });
}

var addTask = () => {
    const newtask = prompt ("Add New Task...");
    if(newtask === null){
        return;
    }
    if(/\S/.test(newtask)){
        var element = {
            tname : newtask,
            subtasks : []
        }
        taskObj.push(element);
        localStorage.taskObj = taskObj;
    }

    if(/\S/.test(element.tname)){
        var tasklist = document.getElementById('tasklist');
        tasklist.innerHTML = '';
        var ar = [];
        for(var i=0;i<taskObj.length;i++){
            ar.push(taskObj[i].tname);
        }
        ar.forEach((element) => {
            let li = document.createElement('li');
            li.setAttribute("onclick", "showSubtasks(this.title)");
            if(collapsed){
                li.setAttribute("id", "task"+taskObj.length);
                li.setAttribute("class", "task-shrink");
                li.setAttribute("title", element);
                tasklist.appendChild(li);
                li.innerHTML += "#";
            }else{
                li.setAttribute("id", "task"+taskObj.length);
                li.setAttribute("class", "task");
                li.setAttribute("title", element);
                tasklist.appendChild(li);
                li.innerHTML += element;
            }

        });
    }

    

}

var toggleSidebar = () => {
    console.log(document.getElementById("tasks"))
    if(!collapsed){
        collapsed = true;
        document.getElementById("tsbtn").innerHTML = "Open Sidebar"
        document.getElementById("sidebar").setAttribute("class", "tcollapsed")
        document.getElementById("main").setAttribute("class", "mainexpanded")
        document.getElementById("addtask").setAttribute("class", "task-adder-shrink")
        document.getElementById("addtask").innerHTML = "+";
        
        var ar = [];
        var tasklist = document.getElementById('tasklist');
        tasklist.innerHTML = '';
        for(var i=0;i<taskObj.length;i++){
            ar.push(taskObj[i].tname);
        }
        console.log(ar)

        ar.forEach((element) => {
            let li = document.createElement('li');
            li.setAttribute("onclick", "showSubtasks(this.title)");
                li.setAttribute("id", "task"+taskObj.length);
                li.setAttribute("class", "task-shrink");
                li.setAttribute("title", element);
                tasklist.appendChild(li);
                li.innerHTML += "#";

        });

    }else{
        collapsed=false;
        document.getElementById("tsbtn").innerHTML = "Close Sidebar"
        document.getElementById("sidebar").setAttribute("class", "tactive")
        document.getElementById("main").setAttribute("class", "mainshrinked")
        document.getElementById("addtask").setAttribute("class", "task-adder")
        document.getElementById("addtask").innerHTML = "+  Add Task";
        var ar = [];
        var tasklist = document.getElementById('tasklist');
        tasklist.innerHTML = '';
        for(var i=0;i<taskObj.length;i++){
            ar.push(taskObj[i].tname);
        }
        console.log(ar)

        ar.forEach((element) => {
            let li = document.createElement('li');
            li.setAttribute("onclick", "showSubtasks(this.title)");
            li.setAttribute("id", "task"+taskObj.length);
            li.setAttribute("class", "task");
            li.setAttribute("title", element);
            tasklist.appendChild(li);
            li.innerHTML += element;

        });
    }
}