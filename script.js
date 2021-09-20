let text = document.getElementById('text');
let addBtn = document.getElementById('addBtn');
let editBtn = document.getElementsByClassName('edit');
let deleteBtn = document.getElementsByClassName('delete');
let taskList = document.getElementsByClassName('task-list');
let taskListUl = document.querySelector('.task-list-ul');


//call all event Listeners
loadEventListeners();

//load all event Listeners
function loadEventListeners() {
  //DOM Load Event
    document.addEventListener('DOMContentLoaded',getTasks);
  //add Task Event
    addBtn.addEventListener('click',addTask);
  //edit Task Event
    // editBtn.addEventListener('click', editTask);
    taskListUl.addEventListener('click',removeAndEditTask); 
}
let tasks;
//get tasks from localStorage
function getTasks() {
  
  if(localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }


  tasks.forEach(function(task){
    const li = document.createElement('li');
    
    const div = document.createElement('div');
    div.classList.add('task-list-item');
    
    const textDiv = document.createElement('div');
    textDiv.classList.add('list-item-title');
    
    const span = document.createElement('span');
    span.classList.add('inputValue');
    span.textContent = text.value;
    
    const buttonsDiv = document.createElement('div');
    buttonsDiv.classList.add('list-item-buttons');
    
    const editButton = document.createElement('button');
    editButton.classList.add('edit');
    editButton.textContent = 'edit';
    
    
    
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete');
    deleteButton.textContent = 'delete';
    
    
    
      textDiv.appendChild(span);
      div.appendChild(textDiv);
    
      buttonsDiv.appendChild(editButton);
      buttonsDiv.appendChild(deleteButton);
      div.appendChild(buttonsDiv);
      let newText = document.createTextNode(task);
     
      span.appendChild(newText);
      li.appendChild(div);
      taskListUl.appendChild(li)
      
  });
}//get task function

//add Task
function addTask(event) {
if (text.value === '') {
    event.preventDefault();
    
} else {    

const li = document.createElement('li');
const div = document.createElement('div');
div.classList.add('task-list-item');

const textDiv = document.createElement('div');
textDiv.classList.add('list-item-title');

const span = document.createElement('span');
span.classList.add('inputValue');
span.textContent = text.value;

const buttonsDiv = document.createElement('div');
buttonsDiv.classList.add('list-item-buttons');

const editButton = document.createElement('button');
editButton.classList.add('edit');
editButton.textContent = 'edit';



const deleteButton = document.createElement('button');
deleteButton.classList.add('delete');
deleteButton.textContent = 'delete';



  textDiv.appendChild(span);
  div.appendChild(textDiv);

  buttonsDiv.appendChild(editButton);
  buttonsDiv.appendChild(deleteButton);
  div.appendChild(buttonsDiv);

  li.appendChild(div);

  taskListUl.appendChild(li)
  //store in local Storage
  storeTaskInLocalStorage (text.value);
text.value = '';
}
};
function storeTaskInLocalStorage (task) {
  
  if (localStorage.getItem('tasks') === null ) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
    
  }
  tasks.push(task);
  localStorage.setItem('tasks',JSON.stringify(tasks));
  
}

//remove Task

function removeAndEditTask(event) {
  
 
 if (event.target.tagName === 'BUTTON'){
    const button = event.target;
    
    const li = button.parentNode.parentNode.parentNode;
    const ul = li.parentNode;
    if (button.textContent === 'delete'){
       ul.removeChild(li);
       localStorage.removeItem('task');
       console.log(removeTaskFromLocalStorage(event));
       
    } else if (button.textContent === 'edit') {
     const span = taskListUl.firstElementChild.firstElementChild.firstElementChild.firstElementChild;
     const input = document.createElement('input');
     input.classList.add('textEdit');
     input.type = 'text';
     input.value = span.textContent;
     const li2 = li.firstElementChild.firstElementChild;
     li2.insertBefore(input, span);
     li2.removeChild(span);
     button.textContent = 'save';
    } else if (button.textContent === 'save'){
     const input = li.firstElementChild.firstElementChild.firstElementChild;
     const span = document.createElement('span');
     span.classList.add('inputValue');
     span.textContent = input.value;
     const li2 = li.firstElementChild.firstElementChild;
     li2.insertBefore(span, input);
     li2.removeChild(input);
     button.textContent = 'edit';
    }//else if textContent = 'save'
 }//if event.target.tagName
};//remove and edittask func
function removeTaskFromLocalStorage (taskItem) {
  if (localStorage.getItem("tasks") === null ) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
tasks.forEach(function(task, index){
    if(taskItem.textContent === task){
        tasks.splice(index, 1);
    }
});
localStorage.setItem('tasks', JSON.stringify(tasks));
}//removeTaskFromLocalStorage function

