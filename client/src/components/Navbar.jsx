import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <nav>
      <NavLink to="/">
        <img src="/assets/images/logo-meriton-hotel.svg" alt="Logo de Meriton Hotel" />
      </NavLink>
      <ul>
        <li><NavLink to="/">Accueil</NavLink></li>
        <li><NavLink to="/chambres">Chambres</NavLink></li>
        <li><NavLink to="/reservations">Réservations</NavLink></li>
        <li><NavLink to="/login">Login</NavLink></li>
      </ul>
    </nav>
  )
}

export default Navbar
