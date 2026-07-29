import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { createBooking } from '../../services/bookings.service.js'
import { isAuthenticated } from '../../services/auth.service.js'
import './Reservations.css'

const API_URL = import.meta.env.VITE_API_URL

const avantages = [
  { icon: 'verified',         titre: 'Meilleur prix garanti',    description: 'Réserver en direct vous assure le meilleur tarif disponible.' },
  { icon: 'event_available',  titre: 'Annulation gratuite',      description: 'Annulation sans frais jusqu\'à 24h avant votre arrivée.' },
  { icon: 'wifi',             titre: 'Wi-Fi inclus',             description: 'Connexion haut débit gratuite dans toutes les chambres.' },
  { icon: 'schedule',         titre: 'Réception 24h/24',         description: 'Notre équipe est disponible à toute heure pour vous accueillir.' },
]

const toDateInput = (d) => {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

const today = toDateInput(new Date())

const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString('fr-BE', { day: 'numeric', month: 'long', year: 'numeric' })

function Reservations() {
  const [searchParams] = useSearchParams()
  const preselectedRoomId = searchParams.get('roomId')

  const [rooms, setRooms] = useState([])
  const [form, setForm] = useState({
    roomId: preselectedRoomId || '',
    checkIn: '',
    checkOut: '',
    guests: 1,
  })
  const [loading, setLoading] = useState(false)
  const [confirmed, setConfirmed] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(`${API_URL}/rooms`)
      .then((r) => r.json())
      .then(setRooms)
      .catch(() => {})
  }, [])

  const minCheckOut = form.checkIn
    ? toDateInput(new Date(new Date(form.checkIn).getTime() + 86400000))
    : toDateInput(new Date(Date.now() + 86400000))

  const selectedRoom = rooms.find((r) => r.id === parseInt(form.roomId))

  const nights =
    form.checkIn && form.checkOut
      ? Math.ceil((new Date(form.checkOut) - new Date(form.checkIn)) / (1000 * 60 * 60 * 24))
      : 0

  const totalPrice = selectedRoom && nights > 0 ? selectedRoom.price * nights : null

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => {
      const updated = { ...prev, [name]: name === 'guests' ? parseInt(value) : value }
      if (name === 'checkIn') {
        const nextMinCheckOut = toDateInput(new Date(new Date(value).getTime() + 86400000))
        if (prev.checkOut && prev.checkOut <= nextMinCheckOut) {
          updated.checkOut = ''
        }
      }
      if (name === 'roomId') {
        // Réinitialise guests si la capacité de la nouvelle chambre est inférieure
        const room = rooms.find((r) => r.id === parseInt(value))
        if (room && prev.guests > room.capacity) {
          updated.guests = 1
        }
      }
      return updated
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    if (!isAuthenticated()) {
      setError('Vous devez être connecté pour réserver.')
      return
    }

    if (form.checkIn < today) {
      setError("La date d'arrivée ne peut pas être dans le passé.")
      return
    }

    if (nights <= 0) {
      setError('La date de départ doit être après la date d\'arrivée.')
      return
    }

    setLoading(true)
    try {
      const booking = await createBooking({
        roomId: parseInt(form.roomId),
        checkIn: form.checkIn,
        checkOut: form.checkOut,
        guests: form.guests,
      })
      setConfirmed({ booking, room: selectedRoom, nights, totalPrice })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (confirmed) {
    const { room, nights: n, totalPrice: total, booking } = confirmed
    return (
      <main>
        <section className="catalogue-header catalogue-header--reservation">
          <h1>Réservation <em>confirmée</em></h1>
        </section>
        <section className="resa-page resa-confirmed-wrapper">
          <div className="resa-confirmed-card">
            <div className="resa-confirmed-header">
              <span className="material-symbols-outlined">check_circle</span>
              <div>
                <h2>Merci pour votre réservation !</h2>
                <p>Référence #{String(booking.id).padStart(5, '0')}</p>
              </div>
            </div>
            <ul className="resa-confirmed-details">
              <li>
                <span className="material-symbols-outlined">bed</span>
                <span>
                  <strong>Chambre</strong>
                  {room.name}
                </span>
              </li>
              <li>
                <span className="material-symbols-outlined">login</span>
                <span>
                  <strong>Arrivée</strong>
                  {formatDate(booking.checkIn)}
                </span>
              </li>
              <li>
                <span className="material-symbols-outlined">logout</span>
                <span>
                  <strong>Départ</strong>
                  {formatDate(booking.checkOut)}
                </span>
              </li>
              <li>
                <span className="material-symbols-outlined">nights_stay</span>
                <span>
                  <strong>Durée</strong>
                  {n} nuit{n > 1 ? 's' : ''}
                </span>
              </li>
              <li>
                <span className="material-symbols-outlined">group</span>
                <span>
                  <strong>Personnes</strong>
                  {booking.guests}
                </span>
              </li>
              <li className="resa-confirmed-total">
                <span className="material-symbols-outlined">euro</span>
                <span>
                  <strong>Total</strong>
                  {total} €
                </span>
              </li>
            </ul>
            <div className="resa-success-actions">
              <Link to="/" className="btn-primary">Retour à l'accueil</Link>
              <Link to="/chambres" className="btn-outline">Voir les chambres</Link>
            </div>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main>

      <section className="catalogue-header catalogue-header--reservation">
        <h1>Faire une <em>réservation</em></h1>
        <p>Réservez votre séjour en quelques étapes simples.</p>
      </section>

      <section className="resa-page">

        <div className="resa-form-wrapper">
          <h2>Votre séjour</h2>

          {!isAuthenticated() && (
            <div className="resa-auth-notice">
              <span className="material-symbols-outlined">info</span>
              <span>Vous devez être <Link to="/login">connecté</Link> pour réserver.</span>
            </div>
          )}

          <form className="resa-form" onSubmit={handleSubmit}>
            <div className="resa-field">
              <label>Type de chambre</label>
              <select name="roomId" value={form.roomId} onChange={handleChange} required>
                <option value="">Sélectionnez un type de chambre</option>
                {rooms.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name} : {r.price} € / nuit
                  </option>
                ))}
              </select>
            </div>

            <div className="resa-row">
              <div className="resa-field">
                <label>Arrivée</label>
                <input
                  type="date"
                  name="checkIn"
                  value={form.checkIn}
                  min={today}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="resa-field">
                <label>Départ</label>
                <input
                  type="date"
                  name="checkOut"
                  value={form.checkOut}
                  min={minCheckOut}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="resa-field">
              <label>Nombre de personnes</label>
              <select name="guests" value={form.guests} onChange={handleChange}>
                {Array.from({ length: selectedRoom ? selectedRoom.capacity : 4 }, (_, i) => i + 1).map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>

            {totalPrice !== null && (
              <div className="resa-summary">
                <span>{nights} nuit{nights > 1 ? 's' : ''} × {selectedRoom.price} €</span>
                <strong>Total : {totalPrice} €</strong>
              </div>
            )}

            {error && (
              <p className="resa-error">
                <span className="material-symbols-outlined">error</span>
                {error}
              </p>
            )}

            <button type="submit" className="btn-primary resa-submit" disabled={loading}>
              {loading ? 'Réservation en cours…' : 'Réserver'}
            </button>

            <p className="resa-mention">
              <span className="material-symbols-outlined">info</span>
              Annulation gratuite jusqu'à 24h avant votre arrivée.
            </p>
          </form>
        </div>

        <div className="resa-info">
          <ul>
            <li>
              <span className="material-symbols-outlined">location_on</span>
              <span>Rue de l'Hôtel 1<br />1000 Bruxelles, Belgique</span>
            </li>
            <li>
              <span className="material-symbols-outlined">phone</span>
              <span>+32 487 72 54 35</span>
            </li>
            <li>
              <span className="material-symbols-outlined">mail</span>
              <span>contact@meritonhotel.be</span>
            </li>
            <li>
              <span className="material-symbols-outlined">schedule</span>
              <span>Réception ouverte 24h/24</span>
            </li>
          </ul>
        </div>

      </section>

      <section className="resa-avantages">
        <h2>Pourquoi réserver <em>en direct</em> ?</h2>
        <div className="avantages-grid">
          {avantages.map((a) => (
            <div key={a.titre} className="avantage-card">
              <span className="material-symbols-outlined avantage-icon">{a.icon}</span>
              <h3>{a.titre}</h3>
              <p>{a.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="resa-experiences">
        <h2>Votre séjour, <em>votre façon</em></h2>
        <div className="experiences-grid">
          <div className="experience-card">
            <span className="material-symbols-outlined experience-icon">luggage</span>
            <h3>Voyager</h3>
            <p>Idéalement situé au cœur de Bruxelles, le Meriton Hotel est votre point de départ parfait pour explorer la capitale européenne et ses environs.</p>
          </div>
          <div className="experience-card">
            <span className="material-symbols-outlined experience-icon">explore</span>
            <h3>Découvrir</h3>
            <p>Grand-Place, Atomium, musées royaux… Notre équipe de conciergerie vous guide pour découvrir le meilleur de Bruxelles à votre rythme.</p>
          </div>
          <div className="experience-card">
            <span className="material-symbols-outlined experience-icon">spa</span>
            <h3>Se relaxer</h3>
            <p>Spa, piscine intérieure et massages, laissez-vous aller à une détente absolue sans quitter l'hôtel.</p>
          </div>
        </div>
      </section>

    </main>
  )
}

export default Reservations
