import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { getRooms } from '../../services/rooms.service'
import Cta from '../../components/cta/Cta'
import './Chambres.css'

const services = [
  { icon: 'restaurant',       titre: 'Restaurant',                 description: 'Cuisine gastronomique belge revisitée, carte du marché et cave à vins d\'exception.' },
  { icon: 'spa',              titre: 'Spa & Bien-être',            description: 'Massages, soins du visage, hammam, sauna et piscine intérieure chauffée.' },
  { icon: 'local_bar',        titre: 'Bar & Lounge',               description: 'Bar élégant ouvert jusqu\'à minuit, cocktails signature et large sélection de spiritueux.' },
  { icon: 'meeting_room',     titre: 'Salles de réunion',          description: 'Deux espaces modulables, équipement audiovisuel complet et service traiteur sur mesure.' },
  { icon: 'fitness_center',   titre: 'Fitness',                    description: 'Salle de sport ouverte 24h/24, équipements Technogym et coachs disponibles sur demande.' },
  { icon: 'room_service',     titre: 'Room service',               description: 'Service en chambre disponible 24h/24 pour vos repas, petits-déjeuners et collations.' },
  { icon: 'local_parking',    titre: 'Parking sécurisé',           description: 'Parking privé couvert, directement accessible depuis l\'hôtel.' },
  { icon: 'support_agent',    titre: 'Conciergerie',               description: 'Notre équipe organise vos visites, réservations de restaurants et transferts aéroport.' },
  { icon: 'free_breakfast',   titre: 'Petit-déjeuner',             description: 'Buffet continental servi chaque matin : viennoiseries fraîches, fruits de saison, charcuteries et fromages.' },
  { icon: 'airport_shuttle',  titre: 'Navette aéroport',           description: 'Service de transfert privé depuis et vers l\'aéroport de Bruxelles-Zaventem, sur réservation.' },
  { icon: 'pedal_bike',       titre: 'Location de vélos',          description: 'Explorez Bruxelles à votre rythme grâce à notre flotte de vélos disponibles à la réception.' },
  { icon: 'wifi',             titre: 'Wi-Fi haut débit',           description: 'Connexion Wi-Fi fibre optique gratuite dans tout l\'établissement, y compris dans les chambres.' },
]

const faq = [
  {
    question: 'À quelle heure est le check-in et le check-out ?',
    reponse: 'Le check-in est disponible à partir de 13h00. Le check-out doit être effectué avant 12h00 (midi). Pour toute demande d\'horaire spécial, contactez notre réception.',
  },
  {
    question: 'Le petit-déjeuner est-il inclus ?',
    reponse: 'Le petit-déjeuner est inclus dans le tarif uniquement pour les clients ayant réservé une Suite Meriton. Pour les autres chambres, il est possible de l\'ajouter directement à l\'hôtel.',
  },
  {
    question: 'Les animaux de compagnie sont-ils acceptés ?',
    reponse: 'Oui, les animaux de compagnie sont les bienvenus au Meriton Hotel. Un supplément de 30 € par séjour sera appliqué.',
  },
  {
    question: 'Quelle est la politique d\'annulation ?',
    reponse: 'L\'annulation est gratuite jusqu\'à 24 heures avant le début du séjour. Au-delà de ce délai, une nuit vous sera facturée.',
  },
  {
    question: 'Le Wi-Fi est-il gratuit ?',
    reponse: 'Oui, le Wi-Fi est entièrement gratuit pour tous les séjourneurs. La connexion est puissante et disponible dans l\'ensemble de l\'hôtel, y compris dans les chambres.',
  },
  {
    question: 'Proposez-vous des lits bébé ?',
    reponse: 'Les lits bébé sont inclus sans supplément dans toutes les chambres familiales. Pour les autres types de chambres, renseignez-vous auprès de notre réception.',
  },
  {
    question: 'Comment rejoindre l\'hôtel depuis l\'aéroport ?',
    reponse: 'Nous proposons un service de navette depuis l\'aéroport de Bruxelles-Zaventem directement jusqu\'à l\'hôtel. Merci de nous contacter à l\'avance pour réserver votre transfert.',
  },
]

const types = [
  { value: 'tous', label: 'Tous' },
  { value: 'standard', label: 'Standard' },
  { value: 'superieure', label: 'Supérieure' },
  { value: 'suite', label: 'Suite' },
]

function Chambres() {
  const [rooms, setRooms] = useState([])
  const [typeFiltre, setTypeFiltre] = useState('tous')
  const [familleFiltre, setFamilleFiltre] = useState(false)
  const [faqOuverte, setFaqOuverte] = useState(null)

  useEffect(() => {
    getRooms().then((data) => setRooms(data))
  }, [])

  const roomsFiltrees = useMemo(() => {
    return rooms.filter((r) => {
      if (typeFiltre !== 'tous' && r.type !== typeFiltre) return false
      if (familleFiltre && !r.family) return false
      return true
    })
  }, [rooms, typeFiltre, familleFiltre])

  return (
    <main>

      <section className="catalogue-header catalogue-header--rooms">
        <h1>Nos <em>chambres</em></h1>
        <p>Découvrez nos hébergements pensés pour votre confort et votre bien-être.</p>
      </section>

      <section className="catalogue-body">

        <div className="catalogue-filtres">
          <div className="filtre-group">
            <label>Type</label>
            <div className="filtre-btns">
              {types.map((t) => (
                <button
                  key={t.value}
                  className={typeFiltre === t.value ? 'filtre-btn active' : 'filtre-btn'}
                  onClick={() => setTypeFiltre(t.value)}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="filtre-group">
            <button
              className={familleFiltre ? 'filtre-btn active' : 'filtre-btn'}
              onClick={() => setFamilleFiltre(!familleFiltre)}>
              Avec enfants
            </button>
          </div>
        </div>

        <div className="catalogue-grid">
          {roomsFiltrees.length === 0 && (
            <p className="catalogue-vide">Aucune chambre ne correspond à vos critères.</p>
          )}
          {roomsFiltrees.map((r) => (
            <div key={r.id} className="catalogue-card">
              <div className="catalogue-card-img">
                <img src={r.image} alt={r.name} />
              </div>
              <div className="catalogue-card-body">
                <div className="catalogue-card-top">
                  <h3>{r.name}</h3>
                  <span className="catalogue-badge">{r.capacity} pers.</span>
                </div>
                <p>{r.description}</p>
                <div className="catalogue-equipements">
                  {r.amenities.map((eq) => (
                    <span key={eq.icon} className="material-symbols-outlined equip-icon" title={eq.label}>{eq.icon}</span>
                  ))}
                </div>
                <div className="catalogue-card-footer">
                  <span className="chambre-prix">à partir de <strong>{r.price} €</strong> / nuit</span>
                  <div className="catalogue-card-actions">
                    <Link to={`/chambres/${r.id}`} className="btn-outline">Détails</Link>
                    <Link to="/reservations" className="btn-primary">Réserver</Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </section>

      <section id="services" className="chambres-services">
        <h2>Nos <em>services</em></h2>
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

      <section className="chambres-faq">
        <h2>Questions <em>fréquentes</em></h2>
        <ul className="faq-list">
          {faq.map((item, i) => (
            <li key={i} className={`faq-item${faqOuverte === i ? ' open' : ''}`}>
              <button className="faq-question" onClick={() => setFaqOuverte(faqOuverte === i ? null : i)}>
                <span>{item.question}</span>
                <span className="material-symbols-outlined faq-icon">
                  {faqOuverte === i ? 'remove' : 'add'}
                </span>
              </button>
              {faqOuverte === i && (
                <p className="faq-reponse">{item.reponse}</p>
              )}
            </li>
          ))}
        </ul>
      </section>

      <Cta />

    </main>
  )
}

export default Chambres
