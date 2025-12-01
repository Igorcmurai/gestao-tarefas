import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { listTasks, removeTask, seedSampleIfEmpty } from '../services/tasksService'

export default function Home() {
  const nav = useNavigate()
  const [tasks, setTasks] = useState([])
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('') // '' = todos

  useEffect(() => {
    seedSampleIfEmpty()
    load()
  }, [])

  function load() {
    setTasks(listTasks())
  }

  function handleDelete(id) {
    if (!confirm('Deletar tarefa?')) return
    removeTask(id)
    load()
  }

  const filtered = tasks.filter(t => {
    if (filter && t.status !== filter) return false
    if (!query) return true
    const q = query.toLowerCase()
    return (t.title || '').toLowerCase().includes(q)
        || (t.responsible || '').toLowerCase().includes(q)
  })

  return (
    <div>
      <div className="top-actions">
        <div className="top-left">
          <select value={filter} onChange={e => setFilter(e.target.value)}>
            <option value=''>Todos status</option>
            <option value='Pendente'>Pendente</option>
            <option value='Em andamento'>Em andamento</option>
            <option value='Finalizado'>Finalizado</option>
          </select>
        </div>

        <div className="top-center">
          <input
            placeholder="Buscar por título ou responsável"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>

        <div className="top-right">
          <button onClick={() => { setFilter(''); setQuery('') }} className="btn ghost">
            Limpar Filtro
          </button>
          <button onClick={() => nav('/create')} className="btn primary">
            Criar Tarefa
          </button>
        </div>
      </div>

      <div className="grid header-grid">
        <div>ID</div>
        <div>Título</div>
        <div>Responsável</div>
        <div>Status</div>
        <div>Datas</div>
        <div>Ações</div>
      </div>

      {filtered.map(t => (
        <div className="row-box" key={t.id}>
          <div>{t.id}</div>

          <div>
            <Link to={`/details/${t.id}`} state={{ fromHome: true }}>
              {t.title}
            </Link>
          </div>

          <div>{t.responsible}</div>
          <div>{t.status}</div>

          <div>
            <div className="small-muted">
              {formatDate(t.createdAt)}
              {t.concludedAt ? ` • ${formatDate(t.concludedAt)}` : ''}
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => nav(`/edit/${t.id}`)} className="btn ghost">Editar</button>
              <button onClick={() => handleDelete(t.id)} className="btn-delete">Deletar</button>
            </div>
          </div>
        </div>
      ))}

      {filtered.length === 0 && (
        <div style={{ marginTop: 18, color: 'var(--muted)' }}>
          Nenhuma tarefa encontrada.
        </div>
      )}
    </div>
  )
}

function formatDate(d) {
  if (!d) return '-'
  return new Date(d).toLocaleDateString()
}
