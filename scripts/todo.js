'use strict'
// Tao to do
function createToDo() {
  let taskInput = document.getElementById('input-task').value
  const owner = JSON.parse(getFromStorage('CURRENT_USER'))
  // valid du lieu
  if(!taskInput) {
    alert('Hay nhap Todo')
    return
  }
  if(!owner) {
    alert('Vui long dang nhap')
    return
  }
  const newToDo = new Task(taskInput, owner.username)
  todoArr.push(newToDo)
  // day todo len storage
  saveToStorage('TODO', JSON.stringify(todoArr))
  // render todo
  renderToDo()
  // Tra ve du lieu mac dinh 
  document.getElementById('input-task').value = ''
}

document.getElementById('btn-add').addEventListener('click',createToDo)


// Load Todo
function loadToDo() {
  const toDoList = JSON.parse(getFromStorage('TODO')) || []
  const userLogin = JSON.parse(getFromStorage('CURRENT_USER'))
  // chua dang nhap
  if(!userLogin) {
    todoArr = []
  } else {
    todoArr = toDoList.filter((toDo) => {
      return userLogin.username === toDo.owner
    })
  }
  renderToDo()
}

// render Todo
function renderToDo() {
  document.getElementById("todo-list").innerHTML = ''
  for (let i = 0; i < todoArr.length; i++ ) {
    document.getElementById("todo-list").innerHTML += 
    `
      <li 
        onclick='toggleComplete(${i})' 
        ${todoArr[i].isDone ? 'class="checked"' : ""}
      >${todoArr[i].task}<span onclick='removeToDo(event, ${i})' class="close">×</span>
      </li>
    `
  }
}

// Xoa todo
function removeToDo(event, i) {
  event.stopPropagation()
  todoArr.splice(i,1)
  saveToStorage('TODO', JSON.stringify(todoArr))
  renderToDo()
}

//  đánh dấu là Task đó đã hoàn thành hoặc chưa hoàn thành
function toggleComplete(i) {
  todoArr[i].isDone = !todoArr[i].isDone
  saveToStorage('TODO', JSON.stringify(todoArr))
  renderToDo()
}

loadToDo()
