import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getTask, updateTask } from '../services/tasksService'

export default function Edit() {
  const { id } = useParams()
  const nav = useNavigate()
  const task = getTask(id)
  if (!task) return <div>Tarefa não encontrada</div>

  const [title, setTitle] = useState(task.title)
  const [desc, setDesc] = useState(task.description)
  const [responsible, setResponsible] = useState(task.responsible)
  const [status, setStatus] = useState(task.status)
  const [concludedAt, setConcludedAt] = useState(task.concludedAt ? task.concludedAt.split('T')[0] : '')

  function handleSubmit(e) {
    e.preventDefault()
    if (!title) return alert('Título obrigatório')
    updateTask(task.id, {
      title,
      description: desc,
      responsible,
      status,
      concludedAt: concludedAt ? new Date(concludedAt).toISOString() : null
    })
    nav('/')
  }

  return (
    <div className="card">
      <h2>Editar Tarefa</h2>
      <form onSubmit={handleSubmit}>
        <label>Título</label>
        <input value={title} onChange={e=>setTitle(e.target.value)} />
        <label>Descrição</label>
        <input value={desc} onChange={e=>setDesc(e.target.value)} />
        <label>Responsável</label>
        <input value={responsible} onChange={e=>setResponsible(e.target.value)} />
        <label>Status</label>
        <select value={status} onChange={e=>setStatus(e.target.value)}>
          <option>Pendente</option>
          <option>Em andamento</option>
          <option>Finalizado</option>
        </select>

        <label>Data de conclusão (opcional)</label>
        <input type="date" value={concludedAt} onChange={e=>setConcludedAt(e.target.value)} />

        <div className="actions">
          <button className="btn primary">Confirmar edição</button>
          <button type="button" onClick={()=>nav('/')} className="btn ghost">Cancelar</button>
        </div>
      </form>
    </div>
  )
}
