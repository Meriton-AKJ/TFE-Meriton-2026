import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getMyBookings } from '../../services/bookings.service.js'
import './MesSejours.css'

const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString('fr-BE', { day: 'numeric', month: 'long', year: 'numeric' })

const statusLabel = {
  pending:   { label: 'En attente',  className: 'status-pending' },
  confirmed: { label: 'Confirmée',   className: 'status-confirmed' },
  cancelled: { label: 'Annulée',     className: 'status-cancelled' },
}

function MesReservations() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getMyBookings()
      .then(setBookings)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <main className="resa-list-page"><p>Chargement...</p></main>

  return (
    <main className="resa-list-page">

      <section className="catalogue-header catalogue-header--resa-list">
        <h1>Mes <em>séjours</em></h1>
        <p>Retrouvez ici l'historique de vos séjours au Meriton Hotel.</p>
      </section>

      <section className="resa-list-content">
        {error && <p className="resa-list-error">{error}</p>}

        {!error && bookings.length === 0 && (
          <div className="resa-list-empty">
            <span className="material-symbols-outlined">hotel</span>
            <h2>Aucune réservation</h2>
            <p>Vous n'avez pas encore effectué de réservation.</p>
            <Link to="/reservations" className="btn-primary">Réserver une chambre</Link>
          </div>
        )}

        {bookings.length > 0 && (
          <ul className="resa-list">
            {bookings.map((b) => {
              const nights = Math.ceil((new Date(b.checkOut) - new Date(b.checkIn)) / (1000 * 60 * 60 * 24))
              const status = statusLabel[b.status] ?? statusLabel.pending
              return (
                <li key={b.id} className="resa-card">
                  <img src={b.room.image} alt={b.room.name} className="resa-card-img" />
                  <div className="resa-card-body">
                    <div className="resa-card-top">
                      <h3>{b.room.name}</h3>
                      <span className={`resa-status ${status.className}`}>{status.label}</span>
                    </div>
                    <ul className="resa-card-details">
                      <li>
                        <span className="material-symbols-outlined">login</span>
                        {formatDate(b.checkIn)}
                      </li>
                      <li>
                        <span className="material-symbols-outlined">logout</span>
                        {formatDate(b.checkOut)}
                      </li>
                      <li>
                        <span className="material-symbols-outlined">nights_stay</span>
                        {nights} nuit{nights > 1 ? 's' : ''}
                      </li>
                      <li>
                        <span className="material-symbols-outlined">group</span>
                        {b.guests} personne{b.guests > 1 ? 's' : ''}
                      </li>
                    </ul>
                    <p className="resa-card-price">{b.totalPrice} €</p>
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </section>

    </main>
  )
}

export default MesReservations
