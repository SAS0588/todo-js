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

// Project plan
/*
  Create a controller that calls on separate functions that create the nodes.

  Iterate through the list of objects and put the text in the inner HTML to display to the user.
*/

// OBJECTIVE 1 - Display the list of To-Do items
// Loop through the todo items object
function createList(){
  removeChild();
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
    const spanId = document.createAttribute("id");
    divClass.value = "todo";
    inputClass.value = "todo-checkbox";
    spanClass.value = "todo-text";
    inputType.value = "checkbox";
    spanId.value = todos[todo].id;
    div.setAttributeNode(divClass);
    input.setAttributeNode(inputClass);
    input.setAttributeNode(inputType);
    span.setAttributeNode(spanClass);
    span.setAttributeNode(spanId);
  
    // Attach todo list object text to span item
    const spanItemText = document.createTextNode(todos[todo].text);
  
    // Add children to parent elements
    span.appendChild(spanItemText);
    div.appendChild(input);
    div.appendChild(span);
  
    // Attach todo div to parent main div
    document.getElementById('main-todo-list').appendChild(div);
    markComplete();
  }
}

// removes all the children in parentNode main-todo-list
function removeChild(){
  const mainTodoList = document.getElementById('main-todo-list'); 
  let child = mainTodoList.lastElementChild;
  
  // while condition cycles through each added child and removes it.
  while (child) { 
      mainTodoList.removeChild(child);
      child = mainTodoList.lastElementChild;
  } 
}



// OBJECTIVE 2: Add ability to mark to-do items complete
// function markComplete() {};=> created to be inserted after textBox creation

function markComplete(){
  const divComplete = document.getElementsByClassName('todo');
  const checkboxes = document.getElementsByClassName('todo-checkbox');
  for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].addEventListener('change', () => {
      if (checkboxes[i].checked == true) {
        todos[i].complete = true;
        divComplete[i].classList.add('complete');
        updateItems();
      } else {
        todos[i].complete = false;
        divComplete[i].classList.remove('complete');
        updateItems();
      };
    })
  };
}



// OBJECTIVE 3: Remaining to-do count

let updateItems = () => {
  let spanCount = 0;
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].complete == false) {
      spanCount++;
    }
  }
  document.getElementById('remaining-count').innerHTML = spanCount;
}

window.onload = function(){
  createList();
  updateItems();

};

// OBJECTIVE 4: Create new to-do items
document.addEventListener('keydown',function(event){
  if (event.keyCode === 13){
    grabItem();
  }   
});

function grabItem(){
  const newTodo = document.getElementById("text-input").value;
  document.getElementById("text-input").value = '';
  if (newTodo !== ''){
    addItem(newTodo);
  } else {
    console.log("i'm empty");
  }
}

function addItem(item){
  todos.push({id: todos.length + 1, text: item, complete: false});
  createList();
  
}
