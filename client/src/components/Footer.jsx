import { NavLink } from 'react-router-dom'

function Footer() {
  return (
    <footer>
      <div className="footer-main">

        <div className="footer-brand">
          <NavLink to="/"><img src="/assets/images/logo-meriton-hotel.svg" alt="Meriton Hotel" /></NavLink>
          <p className="footer-tagline">L'art de vous accueillir,<br />depuis 2026.</p>
        </div>

        <div className="footer-nav">
          <h4>NAVIGATION</h4>
          <ul>
            <li><NavLink to="/">Accueil</NavLink></li>
            <li><NavLink to="/chambres">Chambres</NavLink></li>
            <li><NavLink to="/reservations">Réservations</NavLink></li>
            <li><NavLink to="/login">Login</NavLink></li>
          </ul>
        </div>

        <div className="footer-contact">
          <h4>CONTACT</h4>
          <ul>
            <li>Rue de l'Hôtel 1<br />1000 Bruxelles, Belgique</li>
            <li>+32 487 72 54 35</li>
            <li>contact@meritonhotel.be</li>
            <li>Réception ouverte 24h/24</li>
          </ul>
        </div>

      </div>

      <div className="footer-bottom">
        <span>© 2026 Meriton Hotel · Tous droits réservés</span>
        <span>Mentions légales</span>
        <span>Politique de confidentialité</span>
      </div>
    </footer>
  )
}

export default Footer
