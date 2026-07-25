import { NavLink } from 'react-router-dom'
import { useAuth } from '../../context/useAuth'
import './Navbar.css'

function Navbar() {
  const { isAuthenticated, logout } = useAuth()

  return (
    <nav>
      <NavLink to="/">
        <img src="/assets/images/logo-meriton-hotel.svg" alt="Logo de Meriton Hotel" />
      </NavLink>
      <ul>
        <li><NavLink to="/">Accueil</NavLink></li>
        <li><NavLink to="/chambres">Chambres</NavLink></li>
        <li><NavLink to="/reservations">Réservations</NavLink></li>
        {isAuthenticated ? (
          <>
            <li><NavLink to="/mes-sejours">Mes séjours</NavLink></li>
            <li><span className="nav-logout" onClick={logout}>Déconnexion</span></li>
          </>
        ) : (
          <li><NavLink to="/login">Connexion</NavLink></li>
        )}
      </ul>
    </nav>
  )
}

export default Navbar
