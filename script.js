const form = document.querySelector("form")
const input = document.getElementById("input")
const submit = document.getElementById("submit")
const total = document.getElementById("total")
const todoContainer = document.querySelector(".todo-lists")


const todos = JSON.parse(localStorage.getItem("todos")) || [];

function loadTodos() {
    todoContainer.innerHTML = "";
    total.innerText = `Total: ${todos.length}`
    todos.forEach((todo, index) => {
        const div = document.createElement("div")
        div.className = "todo-item"

        const input = document.createElement("input")
        input.type = "checkbox"
        input.id = "complete"
        input.checked = todo.completed;
    
        const p = document.createElement("p")
        p.innerText = todo.todo;

        const div2 = document.createElement("div")
        div2.className = "btns"

        const edit = document.createElement("button")
        edit.className = "edit"
        edit.innerText = "Edit"

        const del = document.createElement("button")
        del.className = "delete"
        del.innerText = "Delete"

        div.appendChild(input)
        div.appendChild(p)
        div2.appendChild(edit)
        div2.appendChild(del)
        div.appendChild(div2)
        todoContainer.appendChild(div)
    })
}

function SaveTodosToLocal() {
    localStorage.setItem("todos", JSON.stringify(todos))
}

//Add new Todo 
submit.addEventListener("click", (e) => {
    e.preventDefault();
    let newTodo = input.value.trim()
    if (newTodo === "") {
        alert("Please write some todos")
        return
    }
    todos.unshift({ id: Date.now(), todo: newTodo, completed: false })
    SaveTodosToLocal()
    loadTodos()
    input.value = ""
})

loadTodos()