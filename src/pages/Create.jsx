import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addTask } from '../services/tasksService'

export default function Create() {
  const nav = useNavigate()
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [responsible, setResponsible] = useState('')
  const [status, setStatus] = useState('Pendente')
  const [concludedAt, setConcludedAt] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!title) return alert('Título obrigatório')
    addTask({
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
      <h2>Criar Tarefa</h2>
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
          <button type="submit" className="btn primary">Criar Tarefa</button>
          <button type="button" onClick={()=>nav('/')} className="btn ghost">Voltar</button>
        </div>
      </form>
    </div>
  )
}
