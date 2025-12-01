import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getTask } from '../services/tasksService'

export default function Details() {
  const { id } = useParams()
  const nav = useNavigate()

  const task = getTask(id)
  if (!task) {
    // redireciona para home se não existir
    setTimeout(() => nav('/'), 10)
    return null
  }

  return (
    <div className="card" role="region" aria-labelledby="details-title">
      <h2 id="details-title">Detalhes</h2>

      <div className="detail-row">
        <div className="detail-label">Título:</div>
        <div className="detail-content">{task.title}</div>
      </div>

      <div className="detail-row">
        <div className="detail-label">Descrição:</div>
        <div className="detail-content">{task.description}</div>
      </div>

      <div className="detail-row">
        <div className="detail-label">Responsável:</div>
        <div className="detail-content">{task.responsible}</div>
      </div>

      <div className="detail-row">
        <div className="detail-label">Status:</div>
        <div className="detail-content">{task.status}</div>
      </div>

      <div className="detail-row">
        <div className="detail-label">Datas:</div>
        <div className="detail-content">
          {formatDate(task.createdAt)}
          {task.concludedAt ? ' — ' + formatDate(task.concludedAt) : ''}
        </div>
      </div>

      <div className="actions" style={{ marginTop: 14 }}>
        <button
          type="button"
          onClick={() => nav(`/edit/${task.id}`)}
          className="btn primary"
        >
          Editar Tarefa
        </button>

        <button
          type="button"
          onClick={() => nav('/')}
          className="btn ghost"
        >
          Voltar
        </button>
      </div>
    </div>
  )
}

function formatDate(d) {
  if (!d) return '-'
  return new Date(d).toLocaleDateString()
}
