import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getRooms } from '../../services/rooms.service'
import { useAuth } from '../../context/useAuth'
import Wave from '../../components/styleSection/wave/Wave'
import Cta from '../../components/cta/Cta'
import './Accueil.css'

const services = [
  { icon: 'restaurant',    titre: 'Restaurant',           description: 'Cuisine gastronomique belge revisitée, carte du marché et cave à vins d\'exception.' },
  { icon: 'spa',           titre: 'Spa & Bien-être',      description: 'Massages, soins du visage, hammam, sauna et piscine intérieure chauffée.' },
  { icon: 'local_bar',     titre: 'Bar & Lounge',         description: 'Bar élégant ouvert jusqu\'à minuit, cocktails signature et large sélection de spiritueux.' },
  { icon: 'fitness_center',titre: 'Fitness',              description: 'Salle de sport ouverte 24h/24, équipements Technogym et coachs disponibles sur demande.' },
  { icon: 'room_service',  titre: 'Room service',         description: 'Service en chambre disponible 24h/24 pour vos repas, petits-déjeuners et collations.' },
  { icon: 'support_agent', titre: 'Conciergerie',         description: 'Notre équipe organise vos visites, réservations de restaurants et transferts aéroport.' },
]

const spots = [
  { id: 'monuments', icon: 'location_city', titre: 'Grand-Place',   description: 'Classée au patrimoine mondial de l\'UNESCO. À 5 minutes à pied de l\'hôtel.' },
  { id: 'culture',   icon: 'museum',        titre: 'Musées Royaux', description: 'Art, histoire et sciences réunis dans les prestigieuses collections royales belges.' },
  { id: 'atomium',   icon: 'attractions',   titre: 'Atomium',       description: 'Le symbole de Bruxelles, construit pour l\'Exposition universelle de 1958.' },
  { id: 'gastro',    icon: 'bakery_dining', titre: 'Gastronomie',   description: 'Pralines artisanales, gaufres, bières trappistes, un voyage pour les papilles.' },
]

const avis = [
  { nom: 'Sophie L.',   note: 5, texte: 'Un séjour inoubliable. Le personnel aux petits soins, la chambre d\'un raffinement absolu. On y retourne sans hésiter.' },
  { nom: 'Thomas D.',   note: 5, texte: 'Le restaurant est une expérience à part entière. Produits du terroir, service impeccable et cave à vins exceptionnelle.' },
  { nom: 'Marie C.',    note: 4, texte: 'Très bon rapport qualité-prix pour Bruxelles. Le spa est vraiment remarquable.' },
  { nom: 'Lucas M.',    note: 5, texte: 'Accueil chaleureux, chambre impeccable. Je recommande vivement à tous.' },
  { nom: 'Isabelle T.', note: 5, texte: 'Le petit-déjeuner est un vrai moment de bonheur. Produits frais et variés.' },
  { nom: 'Antoine R.',  note: 4, texte: 'Hôtel élégant, idéalement situé. La Suite Meriton est un rêve absolu.' },
  { nom: 'Camille B.',  note: 5, texte: 'Le bar lounge est parfait pour terminer la soirée. Ambiance feutrée et cocktails délicieux.' },
]

function Accueil() {
  const [featured, setFeatured] = useState([])
  const { user, isAuthenticated } = useAuth()

  useEffect(() => {
    getRooms().then((data) => setFeatured(data.filter((r) => r.featured)))
  }, [])

  return (
    <main>

      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <p className="hero-label">
            {isAuthenticated
              ? <>Bonjour <span className="hero-username">{user?.name}</span>,</>
              : 'Bienvenue au'}
          </p>
          <h1>Meriton Hotel</h1>
          <p className="hero-sub">
            {isAuthenticated
              ? 'Nous sommes ravis de bientôt vous accueillir.'
              : "L'art de vous accueillir, depuis 2026."}
          </p>
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
          {featured.map((r) => (
            <div key={r.id} className="chambre-card">
              <div className="chambre-img-placeholder">
                <img src={r.image} alt={r.name} />
              </div>
              <div className="chambre-info">
                <h3>{r.name}</h3>
                <p>{r.description}</p>
                <div className="chambre-footer">
                  <span className="chambre-prix">à partir de <strong>{r.price} €</strong> / nuit</span>
                  <Link to="/reservations" className="btn-primary">Réserver</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="section-services">
        <div className="section-header">
          <h2>Nos <em>services</em></h2>
          <Link to="/chambres#services" className="voir-tout">Voir tous nos services</Link>
        </div>
        <ul className="services-list">
          {services.map((s) => (
            <li key={s.titre} className="service-row">
              <span className="material-symbols-outlined service-row-icon">{s.icon}</span>
              <div className="service-row-body">
                <strong>{s.titre}</strong>
                <span>{s.description}</span>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Avis clients */}
      <section className="section-avis">

        <Wave
          bgColor="#fff"
          fill="#002C5F"
          path="M0,40 C360,0 1080,80 1440,40 L1440,80 L0,80 Z"
        />

        <div className="section-avis-inner">
          <h2>Ce que nos <em>clients</em> disent</h2>
          <div className="avis-scroll">
            {avis.map((a) => (
              <div key={a.nom} className="avis-card">
                <span className="avis-quote-mark">"</span>
                <p className="avis-card-texte">{a.texte}</p>
                <div className="avis-card-meta">
                  <span className="avis-etoiles" aria-label={`${a.note} étoiles sur 5`}>
                    {'★'.repeat(a.note)}{'☆'.repeat(5 - a.note)}
                  </span>
                  <span className="avis-nom">- {a.nom}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Wave
          fill="#F8F9FA"
          path="M0,55 C400,25 1000,65 1440,38 L1440,80 L0,80 Z"
        />

      </section>

      {/* Découvrir Bruxelles */}
      <section className="section-bruxelles">

        <div className="bruxelles-header">
          <h2>Découvrir <em>Bruxelles</em></h2>
          <p className="bruxelles-intro">
            Au cœur de la Belgique, Bruxelles vous invite à explorer sa riche mosaïque d'histoire, d'art et de saveurs.
            De la majestueuse Grand-Place aux façades Art Nouveau finement travaillées, jusqu'au parfum des gaufres fraîchement
            cuites qui flottent dans les rues pavées, chaque coin raconte une histoire. Siège de l'Union européenne,
            Bruxelles allie énergie cosmopolite et charme intemporel. C'est donc une ville où chaque visite ressemble à une
            célébration de la vie et de la culture.
          </p>
        </div>

        <div className="bruxelles-grid">
          {spots.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="bruxelles-card">
              <span className="material-symbols-outlined bruxelles-icon">{s.icon}</span>
              <h3>{s.titre}</h3>
              <p>{s.description}</p>
            </a>
          ))}
        </div>

        <div className="bruxelles-details">

          <article id="monuments" className="bruxelles-detail">
            <img src="/assets/images/grand-place.webp" alt="Grand-Place de Bruxelles" className="bruxelles-detail-img" />
            <div className="bruxelles-detail-text">
              <h3>Monuments emblématiques</h3>
              <p>
                Commencez par la Grand-Place, place centrale classée au patrimoine mondial de l'UNESCO, entourée de maisons
                de corporations richement ornées qui vous éblouiront de jour comme de nuit. Ne manquez pas le facétieux
                Manneken Pis, petite statue à la grande personnalité, ou l'élégance du Palais Royal. Promenez-vous dans
                les rues bordées d'immeubles Art Nouveau et détendez-vous dans les parcs tout proches.
              </p>
              <p>
                Chaque monument offre un aperçu unique de la culture et du charme de Bruxelles, faisant de la ville une
                destination incontournable pour les passionnés d'histoire et les amoureux d'architecture.
              </p>
            </div>
          </article>

          <article id="culture" className="bruxelles-detail">
            <img src="/assets/images/palais-beaux-arts.webp" alt="Palais des Beaux-Arts de Bruxelles" className="bruxelles-detail-img" />
            <div className="bruxelles-detail-text">
              <h3>Art, culture et créativité</h3>
              <p>
                Admirez les chefs-d'œuvre des artistes flamands aux Musées royaux des Beaux-Arts de Belgique, puis plongez
                dans l'univers surréaliste de René Magritte au musée consacré à sa vie et à son œuvre. Découvrez l'art et
                le design contemporains au BOZAR, pôle culturel dynamique mettant en avant des talents belges et internationaux.
              </p>
              <p>
                À la tombée de la nuit, vivez la scène des arts du spectacle de Bruxelles : des concerts classiques à
                La Monnaie, l'opéra national, aux productions avant-gardistes des théâtres de la ville. Que vous soyez
                attiré par l'élégance intemporelle ou l'expression moderne, Bruxelles offre une scène pour chaque amateur d'art.
              </p>
            </div>
          </article>

          <article id="atomium" className="bruxelles-detail">
            <img src="/assets/images/atomium.webp" alt="Atomium de Bruxelles" className="bruxelles-detail-img" />
            <div className="bruxelles-detail-text">
              <h3>L'Atomium et l'architecture moderne</h3>
              <p>
                Construit pour l'Exposition universelle de 1958, l'Atomium est devenu le symbole incontournable de Bruxelles.
                Cette structure monumentale, représentant une molécule de fer agrandie 165 milliards de fois, offre une vue
                panoramique exceptionnelle sur la ville depuis ses sphères.
              </p>
              <p>
                À quelques pas, le quartier du Laeken et ses serres royales, les nombreuses façades Art Nouveau signées
                Victor Horta, et les boulevards haussmanniens témoignent de l'extraordinaire richesse architecturale
                de la capitale européenne. C'est une ville qui dialogue en permanence entre héritage et modernité.
              </p>
            </div>
          </article>

          <article id="gastro" className="bruxelles-detail">
            <img src="/assets/images/gastronomie.webp" alt="Gastronomie bruxelloise" className="bruxelles-detail-img" />
            <div className="bruxelles-detail-text">
              <h3>Les incontournables de la gastronomie</h3>
              <ol className="bruxelles-gastro-list">
                <li>
                  <strong>Gaufres de Maison Dandoy:</strong> Croustillantes à l'extérieur, moelleuses à l'intérieur,
                  idéales avec un peu de sucre glace ou de crème fraîche.
                </li>
                <li>
                  <strong>Chocolats Neuhaus:</strong> La plus ancienne chocolaterie belge, berceau de la praline et
                  d'un savoir-faire artisanal centenaire.
                </li>
                <li>
                  <strong>Frites Atelier:</strong> Créées par un chef étoilé, ces frites gastronomiques réinventent
                  un grand classique national.
                </li>
                <li>
                  <strong>Moules-frites Chez Léon:</strong> Institution bruxelloise depuis 1893, cette brasserie animée
                  sert le plat emblématique de la ville dans la plus pure tradition belge.
                </li>
              </ol>
            </div>
          </article>

        </div>
      </section>

      <Cta />

    </main>
  )
}

export default Accueil
