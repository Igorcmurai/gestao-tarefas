const KEY = "gestao_tarefas_lista";
const USER_KEY = "gestao_tarefas_user";

function load() {
  const data = localStorage.getItem(KEY);
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function save(list) {
  localStorage.setItem(KEY, JSON.stringify(list));
}

export function getTasks() {
  return load();
}

export function getTask(id) {
  return load().find((t) => t.id === Number(id));
}

export function addTask(newTask) {
  const list = load();
  const id = list.length > 0 ? list[list.length - 1].id + 1 : 1;

  const now = new Date().toISOString();

  const task = {
    ...newTask,
    id,
    createdAt: now,
    updatedAt: now
  };

  list.push(task);
  save(list);
  return task;
}

export function updateTask(id, updated) {
  const list = load();
  const idx = list.findIndex((t) => t.id === Number(id));
  if (idx === -1) return;

  const now = new Date().toISOString();

  list[idx] = {
    ...list[idx],
    ...updated,
    updatedAt: now
  };

  save(list);
}

export function removeTask(id) {
  const list = load().filter((t) => t.id !== Number(id));
  save(list);
}

const USERS = [
  { user: "igorcmurai", pass: "igor123", name: "Igor C. Murai" },
  { user: "gustavocmurai", pass: "gustavo123", name: "Gustavo C. Murai" }
];

export function authenticate(user, pass) {
  const found = USERS.find((u) => u.user === user && u.pass === pass);
  return found ? found.name : null;
}

export function login(name) {
  localStorage.setItem(USER_KEY, name);
}

export function logout() {
  localStorage.removeItem(USER_KEY);
}

export function getUser() {
  return localStorage.getItem(USER_KEY);
}
