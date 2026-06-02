import { useState } from 'react'
import './Login.css'

function Login() {
  const [mode, setMode] = useState('login')

  return (
    <main className="login-page">
      <div className="login-card">

        <img src="/assets/images/logo-meriton-hotel.svg" alt="Meriton Hotel" className="login-logo" />

        <h2>{mode === 'login' ? 'Connexion' : 'Créer un compte'}</h2>

        <form className="login-form">
          {mode === 'register' && (
            <div className="resa-row">
              <div className="resa-field">
                <label>Prénom</label>
                <input type="text" />
              </div>
              <div className="resa-field">
                <label>Nom</label>
                <input type="text" />
              </div>
            </div>
          )}

          <div className="resa-field">
            <label>Email</label>
            <input type="email" />
          </div>

          <div className="resa-field">
            <label>Mot de passe</label>
            <input type="password" />
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
