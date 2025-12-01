// serviço simples usando localStorage
const KEY_TASKS = 'tasks_db_v1'
const KEY_USER = 'app_user_v1'

function readTasks() {
  const raw = localStorage.getItem(KEY_TASKS)
  return raw ? JSON.parse(raw) : []
}
function writeTasks(tasks) {
  localStorage.setItem(KEY_TASKS, JSON.stringify(tasks))
}

export function listTasks() {
  return readTasks()
}

export function addTask(task) {
  const tasks = readTasks()
  const id = tasks.length ? Math.max(...tasks.map(t => t.id)) + 1 : 1
  const newTask = {
    ...task,
    id,
    createdAt: new Date().toISOString(),
    concludedAt: task.concludedAt || null
  }
  tasks.push(newTask)
  writeTasks(tasks)
  return id
}

export function getTask(id) {
  const tasks = readTasks()
  return tasks.find(t => Number(t.id) === Number(id)) || null
}

export function updateTask(id, patch) {
  const tasks = readTasks()
  const idx = tasks.findIndex(t => Number(t.id) === Number(id))
  if (idx === -1) return false
  tasks[idx] = { ...tasks[idx], ...patch }

  if (tasks[idx].status === 'Finalizado' && !tasks[idx].concludedAt) {
    tasks[idx].concludedAt = new Date().toISOString()
  } else if (patch.hasOwnProperty('concludedAt')) {
    tasks[idx].concludedAt = patch.concludedAt || null
  } else if (tasks[idx].status !== 'Finalizado') {
    tasks[idx].concludedAt = null
  }

  writeTasks(tasks)
  return true
}

export function removeTask(id) {
  let tasks = readTasks()
  tasks = tasks.filter(t => Number(t.id) !== Number(id))
  writeTasks(tasks)
}

export function seedSampleIfEmpty() {
  const tasks = readTasks()
  if (tasks.length === 0) {
    const now = new Date().toISOString()
    writeTasks([
      { id:1, title:'Comprar pão', description:'Ir na padaria', responsible:'Igor', status:'Pendente', createdAt: now, concludedAt: null },
      { id:2, title:'Separar ferramentas', description:'Organizar caixinha', responsible:'Gustavo', status:'Em andamento', createdAt: now, concludedAt: null },
      { id:3, title:'Organizar o quarto', description:'Arrumar gavetas', responsible:'Kleber', status:'Finalizado', createdAt: now, concludedAt: now }
    ])
  }
}

/* Autenticação simples com usuários fixos */
const users = [
  { user: 'igorcmurai', pass: 'igor123', name: 'Igor' },
  { user: 'gustavocmurai', pass: 'gustavo123', name: 'Gustavo' }
]

export function authenticate(username, password) {
  const u = users.find(x => x.user === username && x.pass === password)
  return u ? u.name : null
}

export function login(userName) {
  localStorage.setItem(KEY_USER, userName)
}
export function logout() {
  localStorage.removeItem(KEY_USER)
}
export function getUser() {
  return localStorage.getItem(KEY_USER)
}
