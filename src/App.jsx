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
  const location = useLocation()

  const hidingAuthLinks =
    location.pathname === '/login' || location.pathname === '/register'

  return (
    <header className="header">
      <div className="header-left"></div>
      <div className="header-right">
        {user ? (
          <>
            <span className="user">{user}</span>
            <button className="btn-logout" onClick={() => { logout(); nav('/login') }}>
              Log out
            </button>
          </>
        ) : !hidingAuthLinks ? (
          <>
            <Link to="/login" className="btn ghost">Login</Link>
            <Link to="/register" className="btn ghost">Cadastro</Link>
          </>
        ) : null}
      </div>
    </header>
  )
}

export default function App() {
  const location = useLocation()
  const nav = useNavigate()

  React.useEffect(() => {
    // força iniciar no login
    if (location.pathname !== '/login' && location.pathname !== '/register') {
      nav('/login')
    }
    // eslint-disable-next-line
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

      {/* RODAPÉ */}
      <footer style={{
        textAlign: 'center',
        padding: '20px 0',
        marginTop: '40px',
        color: '#6b7280',
        fontSize: '14px'
      }}>
        Desenvolvido por
        <a
          href="https://github.com/Igorcmurai"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#2563eb', marginLeft: 6, textDecoration: 'underline' }}
        >
          Igor C. Murai
        </a>
      </footer>

    </div>
  )
}
