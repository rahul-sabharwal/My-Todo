var stvisible = false;

var taskObj = [];
var subtasks = [];
var collapsed = true;
var navhorizontal = true;

var getSubtasks = (taskname) => {
    var subtaskdiv = document.getElementById('main');
    subtaskdiv.innerHTML='<button title="'+taskname+'" onclick="addSubtask(this.title)" type="button" class="subtask-adder"><i class="fa fa-plus"></i></button>';
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
        li.setAttribute("class", "task");
        subtasklist.appendChild(li);
        li.innerHTML += element;
    });
}

var addSubtask = (taskname) => {
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
    var subtasklist = document.getElementById('main');
    getSubtasks(taskname);
    if (collapsed){    
        subtasklist.innerHTML = '<button title="'+taskname+'" onclick="addSubtask(this.title)" type="button" class="subtask-adder"><i class="fa fa-plus"></i></button>';
    } else{

    }
    var subtaskdiv = document.getElementById('main');
    subtaskdiv.innerHTML='<button title="'+taskname+'" onclick="addSubtask(this.title)" type="button" class="subtask-adder"><i class="fa fa-plus"></i></button>';
    var subtasklist = document.createElement('ul');
    subtaskdiv.appendChild(subtasklist);
    for(var i=0;i<taskObj.length;i++){
        if(taskObj[i].tname === taskname){
            var arr = taskObj[i].subtasks;
        };
    }
    console.log(arr);

    arr.forEach((element) => {
        console.log("Wow")
        let li = document.createElement('li');
        li.setAttribute("class", "task-shrink");
        subtasklist.appendChild(li);
        li.innerHTML += element;
    });
}

var addTask = () => {
    const newtask = prompt ("Add New Task...");
    for(var i=0;i<taskObj.length;i++){
        if(newtask===taskObj[i].tname){
            alert("Task Already Present!!!");
            return;
        }
    }
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
                li.setAttribute("class", "task");
                li.setAttribute("title", element);
                tasklist.appendChild(li);
                li.innerHTML = element.charAt(0).toUpperCase();
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
        if(!navhorizontal){
            document.getElementById("main").setAttribute("class", "mainshrinked")
        }else{
            console.log(130)
            document.getElementById("main").setAttribute("class", "mainexpanded")
        }
        collapsed = true;
        document.getElementById("sidebar").setAttribute("class", "tcollapsed")
        document.getElementById("addtask").setAttribute("class", "task-adder-shrink")
        document.getElementById("addtask").innerHTML = "+";
        document.getElementById("toggleSidebarbtn").setAttribute("class","toggleSidebarbtncollapsed")
        document.getElementById("toggleicon").setAttribute("class","fa fa-arrow-right")
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
                li.innerHTML = element.charAt(0).toUpperCase();

        });

    }else{
        if(!navhorizontal){
            console.log("159")
            document.getElementById("main").setAttribute("class", "mainextrashrinked")
        }else{
            console.log("162")
            document.getElementById("main").setAttribute("class", "mainshrinked")
        }
        collapsed=false;
        document.getElementById("sidebar").setAttribute("class", "tactive")
        
        document.getElementById("addtask").setAttribute("class", "task-adder")
        document.getElementById("addtask").innerHTML = "+  Add Task";
        document.getElementById("toggleSidebarbtn").setAttribute("class","toggleSidebarbtn")
        document.getElementById("toggleicon").setAttribute("class","fa fa-close")
        
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


var toggleNavbar = () => {
    if(navhorizontal){
        if(!collapsed){
            console.log("196")
            document.getElementById("main").setAttribute("class", "mainextrashrinked")
        }else{
            console.log("198")
            document.getElementById("main").setAttribute("class", "mainshrinked")
        }
        navhorizontal = false;
        document.getElementById("navbarh").setAttribute("class", "navbarhcollapsed");
        document.getElementById("navbarv").setAttribute("class", "navbarvvisible");

    }else{
        if(collapsed){
            console.log("210")
            document.getElementById("main").setAttribute("class", "mainexpanded")
        }
        else{
            console.log("214")
            document.getElementById("main").setAttribute("class", "mainshrinked")
        }
        navhorizontal = true;
        document.getElementById("navbarv").setAttribute("class", "navbarvcollapsed");
        document.getElementById("navbarh").setAttribute("class", "navbarhvisible");

    }
}