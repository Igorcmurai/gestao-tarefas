import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Register() {
  const nav = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    alert('Cadastro não implementado (apenas demo). Use os logins fornecidos.')
    nav('/login')
  }

  return (
    <div className="card">
      <h2>Cadastrar</h2>
      <form onSubmit={handleSubmit}>
        <label>Usuário</label>
        <input />
        <label>E-mail</label>
        <input />
        <label>Senha</label>
        <input type="password" />
        <div className="actions">
          <button className="btn primary">Cadastrar</button>
          <button type="button" onClick={()=>nav('/login')} className="btn ghost">Voltar</button>
        </div>
      </form>
    </div>
  )
}
