const taskInput=document.getElementById("taskInput");
const taskList=document.getElementById("taskList");
const taskCount=document.getElementById("taskCount");

loadTasks();

function addTask(){

let task=taskInput.value.trim();

if(task===""){
alert("Enter a task");
return;
}

createTask(task,false);

saveTasks();

taskInput.value="";

updateCount();

}

function createTask(text,completed){

const li=document.createElement("li");

const span=document.createElement("span");

span.innerText=text;

if(completed){
span.classList.add("completed");
}

span.onclick=function(){

span.classList.toggle("completed");

saveTasks();

};

const edit=document.createElement("button");

edit.innerHTML="Edit";

edit.className="edit";

edit.onclick=function(){

let newTask=prompt("Edit Task",span.innerText);

if(newTask){

span.innerText=newTask;

saveTasks();

}

};

const del=document.createElement("button");

del.innerHTML="Delete";

del.className="delete";

del.onclick=function(){

li.remove();

saveTasks();

updateCount();

};

li.appendChild(span);

li.appendChild(edit);

li.appendChild(del);

taskList.appendChild(li);

updateCount();

}

function saveTasks(){

const tasks=[];

document.querySelectorAll("#taskList li").forEach(li=>{

tasks.push({

text:li.querySelector("span").innerText,

completed:li.querySelector("span").classList.contains("completed")

});

});

localStorage.setItem("tasks",JSON.stringify(tasks));

}

function loadTasks(){

const tasks=JSON.parse(localStorage.getItem("tasks"))||[];

tasks.forEach(task=>{

createTask(task.text,task.completed);

});

}

function clearTasks(){

taskList.innerHTML="";

saveTasks();

updateCount();

}

function updateCount(){

taskCount.innerText=document.querySelectorAll("#taskList li").length;

}

taskInput.addEventListener("keypress",function(e){

if(e.key==="Enter"){

addTask();

}

});
