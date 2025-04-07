const form = document.getElementById("task-form")
const input = document.getElementById("task-input")
const dateInput = document.getElementById("due-date")
const list = document.getElementById("task-list")

let tasks = JSON.parse(localStorage.getItem("tasks") || "[]")
dateInput.valueAsDate = new Date()

form.addEventListener("submit", e => {
  e.preventDefault()
  const task = {
    id: Date.now(),
    text: input.value.trim(),
    due: dateInput.value,
    done: false
  }
  if (task.text === "") return
  tasks.push(task)
  save()
  render()
  input.value = ""
  input.focus()
})

function render() {
  list.innerHTML = tasks.length ? "" : "<li class='list-group-item text-center'>Tidak ada tugas</li>"
  tasks.forEach(t => {
    const li = document.createElement("li")
    li.className = "task-item list-group-item" + (t.done ? " completed" : "") + (isOverdue(t) ? " overdue" : "")
    li.innerHTML = `
      <div>
        <div>${t.text}</div>
        <small class="text-muted">Tenggat: ${format(t.due)}</small>
      </div>
      <div>
        <button class="btn btn-sm btn-${t.done ? "warning" : "success"} me-1">${t.done ? "Batal" : "Selesai"}</button>
        <button class="btn btn-sm btn-danger">Hapus</button>
      </div>`
    li.querySelector(".btn-success, .btn-warning").onclick = () => toggle(t.id)
    li.querySelector(".btn-danger").onclick = () => remove(t.id)
    list.appendChild(li)
  })
}
function toggle(id) {
  tasks = tasks.map(t => t.id === id ? { ...t, done: !t.done } : t)
  save()
  render()
}
function remove(id) {
  if (confirm("Hapus tugas ini?")) {
    tasks = tasks.filter(t => t.id !== id)
    save()
    render()
  }
}
function isOverdue(t) {
  return !t.done && new Date(t.due) < new Date()
}
function format(d) {
  return new Date(d).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })
}
function save() {
  localStorage.setItem("tasks", JSON.stringify(tasks))
}

render()
