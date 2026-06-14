import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/useAuth'
import { loginUser, registerUser } from '../../services/auth.service'
import './Login.css'

function Login() {
  const [mode, setMode] = useState('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const { login } = useAuth()
  const navigate = useNavigate() // useNavigate est un hook, on l'appelle ici, pas dans le handler

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      let data

      if (mode === 'login') {
        data = await loginUser(email, password)
      } else {
        data = await registerUser(name, email, password)
      }

      login(data.token) // stocke le token dans le contexte + localStorage
      navigate('/')     // redirige vers l'accueil
    } catch (err) {
      setError(err.message) // affiche le message d'erreur de l'API
    }
  }

  return (
    <main className="login-page">
      <div className="login-card">

        <img src="/assets/images/logo-meriton-hotel.svg" alt="Meriton Hotel" className="login-logo" />

        <h2>{mode === 'login' ? 'Connexion' : 'Créer un compte'}</h2>

        {error && <p className="login-error">{error}</p>}

        <form className="login-form" onSubmit={handleSubmit}>
          {mode === 'register' && (
            <div className="resa-field">
              <label>Nom complet</label>
              <input
                type="text"
                placeholder="Votre nom et prénom"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}

          <div className="resa-field">
            <label>Email</label>
            <input
              type="email"
              placeholder="votre@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="resa-field">
            <label>Mot de passe</label>
            <input
              type="password"
              placeholder="*******"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-primary resa-submit">
            {mode === 'login' ? 'Se connecter' : "S'inscrire"}
          </button>
        </form>

        <p className="login-switch">
          {mode === 'login' ? (
            <>Pas encore de compte ?{' '}
              <span onClick={() => setMode('register')}>S'inscrire</span>
            </>
          ) : (
            <>Déjà un compte ?{' '}
              <span onClick={() => setMode('login')}>Se connecter</span>
            </>
          )}
        </p>

      </div>
    </main>
  )
}

export default Login
