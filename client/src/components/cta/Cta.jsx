import { Link } from 'react-router-dom'
import './Cta.css'

function Cta() {
  return (
    <section className="section-cta">
      <h2>Prêt à vivre l'expérience <em>Meriton</em> ?</h2>
      <p>Réservez dès maintenant et profitez d'un séjour d'exception au cœur de Bruxelles.</p>
      <Link to="/reservations" className="btn-accent hero-btn">Réserver une chambre</Link>
    </section>
  )
}

export default Cta
