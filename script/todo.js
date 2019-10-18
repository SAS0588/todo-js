let todos = [
  {
    id: 1,
    text: "Take out trash and recycling",
    complete: false
  },
  {
    id: 2,
    text: "Pick up dry cleaning",
    complete: false
  },
  {
    id: 3,
    text: "Get oil change",
    complete: false
  },
  {
    id: 4,
    text: "Write thank-you notes",
    complete: false
  }
];



function controller(){
  loadItems();
  integrityCheck();
  updateCount();
  addItem();
  markComplete();
  toggleBtn();
}

function clearAll(){
  const mainTodoList = document.getElementById('main-todo-list'); 
  let child = mainTodoList.lastElementChild;
  
  // while condition cycles through each added child and removes it.
  while (child) { 
      mainTodoList.removeChild(child);
      child = mainTodoList.lastElementChild;
  } 
}

function loadItems(){
  //This function loads the object and displays it to the view. 

  for (todo in todos) {
  
    // Create elements
    const div = document.createElement("div");
    const input = document.createElement("input");
    const span = document.createElement("span");
  
    // Create attributes, assign values, and set to elements
    const divClass = document.createAttribute("class");
    const inputClass = document.createAttribute("class");
    const spanClass = document.createAttribute("class");
    const inputType = document.createAttribute("type");
    const divID = document.createAttribute("id");
    divClass.value = "todo";
    inputClass.value = "todo-checkbox";
    spanClass.value = "todo-text";
    inputType.value = "checkbox";
    divID.value = todos[todo].id;
    div.setAttributeNode(divClass);
    div.setAttributeNode(divID);
    input.setAttributeNode(inputClass);
    input.setAttributeNode(inputType);
    span.setAttributeNode(spanClass);
  
    // Attach todo list object text to span item
    const spanItemText = document.createTextNode(todos[todo].text);
  
    // Add children to parent elements
    span.appendChild(spanItemText);
    div.appendChild(input);
    div.appendChild(span);

    // Attach todo div to parent main div
    document.getElementById('main-todo-list').appendChild(div);

    if (todos[todo].complete == true && hidden == true){
      div.style.display = 'none';
    }

  }
}

function addItem(){
  document.getElementById('text-input').addEventListener('keydown', function (event) {
    if (event.keyCode === 13)
    //event.key === 'enter'
    // if i have a value that isn't going to be a constance value you write it as:
    // CAPITAL_CONSTANTANCE_VALUE. 
    // i.e. const ENTER_KEY_VALUE = 13;
    
    {
      const newTodo = document.getElementById("text-input").value;
      document.getElementById("text-input").value = '';
      if (newTodo !== '') {
        todos.push({
          id: todos.length + 1,
          text: newTodo,
          complete: false
        });
        clearAll();
        controller();
      }
    }
  });
}

function markComplete(){
  const items = document.getElementsByClassName('todo');
  let checkbox = document.getElementsByClassName('todo-checkbox');
  for (let i = 0; i < items.length; i++) {
    items[i].onclick = function(){
      if (todos[i].complete === false){
        checkbox[i].checked = true;
        todos[i].complete = true;
        items[i].classList.add('complete');
        updateCount();
      }
      else {
        checkbox[i].checked = false;
        todos[i].complete = false;
        items[i].classList.remove('complete');
        updateCount();
      }
    }
  }
}

function integrityCheck(){
  const itemsIntegrity = document.getElementsByClassName('todo');
  let checkboxIntegrity = document.getElementsByClassName('todo-checkbox');
  for (let i = 0; i <todos.length; i++){
    if (todos[i].complete === true){
      checkboxIntegrity[i].checked = true;
      itemsIntegrity[i].classList.add('complete');
    }
    else {
      itemsIntegrity[i].classList.remove('complete');
    }
  }
}

function updateCount(){
  let count = 0;
  for (todo of todos){
    if (todo.complete === false){
      count++;
    }
  }
  document.getElementById('remaining-count').innerHTML = count;
}


let hidden = false;
function toggleBtn(){
  
  const btnText = document.getElementById('toggle');
  const divs = document.getElementsByClassName('todo');
  btnText.onclick = function(){
    if (hidden === false){
      btnText.innerHTML = 'Show Completed Items';
      hidden = true;
      for (let i = 0; i <= todos.length - 1; i++){
        if (todos[i].complete === true){
          divs[i].style.display = 'none';
        }
      }
    } else {
      btnText.innerHTML = 'Hide Completed Items';
      hidden = false;
      for (let i = 0; i <= todos.length - 1; i++){
        if (todos[i].complete === true){
          divs[i].style.display = 'block';
        }
      }
    }
  }
}

window.onload = function(){
  controller();
}
