import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authenticate, login } from '../services/tasksService'

export default function Login() {
  const nav = useNavigate()
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (!user || !pass) {
      setError('Preencha usuário e senha')
      return
    }
    const name = authenticate(user.trim(), pass)
    if (!name) {
      setError('Usuário ou senha incorreto')
      return
    }
    login(name)
    nav('/')
  }

  return (
    <div className="card" role="main" aria-labelledby="login-title">
      <h2 id="login-title">Login</h2>

      <form onSubmit={handleSubmit} noValidate>
        {error && (
          <div className="alert-inline" role="alert" aria-live="assertive">
            {error}
          </div>
        )}

        <label htmlFor="login-user">Usuário</label>
        <input
          id="login-user"
          name="user"
          autoFocus
          value={user}
          onChange={(e) => setUser(e.target.value)}
          aria-label="Usuário"
          autoComplete="username"
        />

        <label htmlFor="login-pass">Senha</label>
        <input
          id="login-pass"
          name="pass"
          type="password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          aria-label="Senha"
          autoComplete="current-password"
        />

        <div className="actions" style={{ marginTop: 12 }}>
          <button type="submit" className="btn primary" aria-label="Entrar">
            Entrar
          </button>

          <button
            type="button"
            onClick={() => nav('/register')}
            className="btn ghost"
            aria-label="Ir para cadastro"
          >
            Cadastro
          </button>
        </div>
      </form>
    </div>
  )
}
