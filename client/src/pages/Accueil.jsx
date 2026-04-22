import { Link } from 'react-router-dom'

const chambres = [
  {
    id: 1,
    nom: 'Chambre Confort',
    description: 'Chambre chaleureuse avec vue sur jardin, salle de bain privée.',
    prix: 89,
  },
  {
    id: 2,
    nom: 'Chambre Supérieure',
    description: 'Spacieuse, décorée avec soin, literie haut de gamme.',
    prix: 149,
  },
  {
    id: 3,
    nom: 'Suite Meriton',
    description: 'Le summum du luxe : salon privé, baignoire balnéo, vue panoramique.',
    prix: 349,
  },
]

const services = [
  {
    icon: 'restaurant',
    titre: 'Restaurant',
    description: 'Cuisine gastronomique belge revisitée, produits frais du terroir.',
  },
  {
    icon: 'spa',
    titre: 'Spa & Bien-être',
    description: 'Massages, soins du visage, hammam et piscine intérieure.',
  },
  {
    icon: 'meeting_room',
    titre: 'Salle de réunion',
    description: 'Espaces modulables, équipement audiovisuel, service traiteur.',
  },
]

const avis = [
  {
    nom: 'Sophie L.',
    note: 5,
    texte: 'Un séjour inoubliable. Le personnel aux petits soins, la chambre d\'un raffinement absolu.',
  },
  {
    nom: 'Thomas D.',
    note: 5,
    texte: 'Le restaurant est exceptionnel. On sent à la fois à la hauteur de la réputation.',
  },
  {
    nom: 'Marie C.',
    note: 4,
    texte: 'Très bon rapport qualité-prix pour Bruxelles. Le spa est vraiment remarquable.',
  },
]

function Accueil() {
  return (
    <main>

      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <p className="hero-label">Bienvenue au</p>
          <h1>Meriton Hotel</h1>
          <p className="hero-sub">L'art de vous accueillir, depuis 2026.</p>
          <Link to="/reservations" className="btn-accent hero-btn">Réserver maintenant</Link>
        </div>
      </section>

      {/* Barre de réservation rapide */}
      <section className="reservation-bar">
        <div className="reservation-bar-inner">
          <div className="resa-field">
            <label>Arrivée</label>
            <input type="date" />
          </div>
          <div className="resa-field">
            <label>Départ</label>
            <input type="date" />
          </div>
          <div className="resa-field">
            <label>Adultes</label>
            <select>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
            </select>
          </div>
          <div className="resa-field">
            <label>Chambres</label>
            <select>
              <option>1</option>
              <option>2</option>
              <option>3</option>
            </select>
          </div>
          <Link to="/reservations" className="btn-primary resa-btn">Rechercher</Link>
        </div>
      </section>

      {/* Chambres */}
      <section className="section-chambres">
        <div className="section-header">
          <h2>Nos <em>chambres</em></h2>
          <Link to="/chambres" className="voir-tout">Voir tout le catalogue </Link>
        </div>
        <div className="chambres-grid">
          {chambres.map((c) => (
            <div key={c.id} className="chambre-card">
              <div className="chambre-img-placeholder" />
              <div className="chambre-info">
                <h3>{c.nom}</h3>
                <p>{c.description}</p>
                <div className="chambre-footer">
                  <span className="chambre-prix">à partir de <strong>{c.prix} €</strong> / nuit</span>
                  <Link to="/reservations" className="btn-primary">Réserver</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="section-services">
        <h2>Nos <em>services</em></h2>
        <div className="services-grid">
          {services.map((s) => (
            <div key={s.titre} className="service-card">
              <span className="material-symbols-outlined service-icon">{s.icon}</span>
              <h3>{s.titre}</h3>
              <p>{s.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Avis clients */}
      <section className="section-avis">
        <h2>Ce que nos <em>clients</em> disent</h2>
        <div className="avis-grid">
          {avis.map((a) => (
            <div key={a.nom} className="avis-card">
              <div className="avis-etoiles">{'★'.repeat(a.note)}{'☆'.repeat(5 - a.note)}</div>
              <p className="avis-texte">"{a.texte}"</p>
              <span className="avis-nom">— {a.nom}</span>
            </div>
          ))}
        </div>
      </section>

    </main>
  )
}

export default Accueil
