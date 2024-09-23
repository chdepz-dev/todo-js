const form = document.querySelector("form")
const input = document.getElementById("input")
const submit = document.getElementById("submit")
const total = document.getElementById("total")
const todoContainer = document.querySelector(".todo-lists")
let toast = document.querySelector(".toast")
let toastMessage = document.getElementById("toast-msg")
let completed = document.getElementById("completed")

const todos = JSON.parse(localStorage.getItem("todos")) || [];
let editing = false;

function loadTodos() {
    todoContainer.innerHTML = "";
    total.innerText = `Total: ${todos.length}`
    let completedTodos = todos.filter((todo) => todo.completed).length
    completed.innerText = `Completed: ${completedTodos} `
    todos.forEach((todo, index) => {
        const div = document.createElement("div")
        div.className = "todo-item"

        const input = document.createElement("input")
        input.type = "checkbox"
        // input.id = "complete"
        input.checked = todo.completed;
        input.addEventListener("click", () => {
            todos[index].completed = input.checked;
            SaveTodosToLocal()
            loadTodos()
        })

        const p = document.createElement("p")
        p.innerText = todo.todo;
        p.style.textDecoration = todo.completed ? "line-through" : "none";

        const div2 = document.createElement("div")
        div2.className = "btns"

        const edit = document.createElement("button")
        edit.className = "edit"
        edit.innerText = editing && editingIndex === index ? "Save" : "Edit";
        edit.addEventListener("click", () => {
            if (edit.innerText === "Save") {
                saveEditedTodo(index)
                toastMsg("Todo Edited")
        
            } else {
                toastMsg("Editing mode Activated")
                editTodo(index)
            }
        })

        const del = document.createElement("button")
        del.className = "delete"
        del.innerText = "Delete"
        del.addEventListener("click", () => {
            deleteTodo(todo.id)
            toastMsg("Todo Deleted")
        })

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

function editTodo(index) {
    scrollToform()
    input.value = todos[index].todo;
    editing = true;
    editingIndex = index
    submit.innerText = "Save"
    loadTodos()
}

function saveEditedTodo(index) {
    todos[index].todo = input.value.trim()
    editing = false;
    editingIndex = null;
    submit.innerText = "Submit"
    input.value = ""
    SaveTodosToLocal()
    loadTodos()
}
function deleteTodo(deletIngId) {
    const dltedTodos = todos.filter((todo) => {
        return todo.id !== deletIngId;
    })
    todos.length = 0;
    todos.push(...dltedTodos)
    SaveTodosToLocal()
    loadTodos()
}
//function toggle complete;
function toggleComplete() {

}
//Add new Todo 
submit.addEventListener("click", (e) => {
    e.preventDefault();
    if (editing) {
        saveEditedTodo(editingIndex)
        toastMsg("Todo Edited")
        return
    }
    let newTodo = input.value.trim()
    if (newTodo === "") {
        toastMsg("Todo cannot be blank.")
        return
    }
    todos.unshift({ id: Date.now(), todo: newTodo, completed: false })
    SaveTodosToLocal()
    loadTodos()
    input.value = ""
    toastMsg("Added new todo.")


})

loadTodos()

function scrollToform() {
    let formPosition = form.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
        top: formPosition - 100,
        behavior: "smooth"
    })
}

function toastMsg(msg) {
    toast.style.display = "block"
    toastMessage.innerText = msg;
    setTimeout(() => {
        toast.style.display = "none"

    }, 3000)
}