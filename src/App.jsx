import React from 'react'
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Create from './pages/Create'
import Details from './pages/Details'
import Edit from './pages/Edit'
import Login from './pages/Login'
import Register from './pages/Register'
import { logout, getUser } from './services/tasksService'

function Header() {
  const nav = useNavigate()
  const user = getUser()
  return (
    <header className="header">
      <div className="header-left">{/* espaço para logo, opcional */}</div>
      <div className="header-right">
        {user ? (
          <>
            <span className="user">{user}</span>
            <button
              onClick={() => { logout(); nav('/login') }}
              className="btn-logout"
            >
              Log out
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn ghost">Login</Link>
            <Link to="/register" className="btn ghost">Cadastro</Link>
          </>
        )}
      </div>
    </header>
  )
}

export default function App() {
  const location = useLocation()
  const nav = useNavigate()

  React.useEffect(() => {
    // Força limpeza de sessão e garante que a rota inicial seja /login
    logout()
    if (location.pathname !== '/login' && location.pathname !== '/register') {
      nav('/login')
    }
    // executar apenas no primeiro mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="app">
      <Header />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
    </div>
  )
}
