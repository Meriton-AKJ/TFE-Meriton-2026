import { useState, useEffect } from 'react'
import { getAllBookings, updateBookingStatus } from '../../services/admin.service.js'

const formatDate = (d) =>
  new Date(d).toLocaleDateString('fr-BE', { day: 'numeric', month: 'short', year: 'numeric' })

const statusLabel = {
  pending:   { label: 'En attente',  className: 'status-pending' },
  confirmed: { label: 'Confirmée',   className: 'status-confirmed' },
  cancelled: { label: 'Annulée',     className: 'status-cancelled' },
}

function AdminBookings() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAllBookings()
      .then(setBookings)
      .finally(() => setLoading(false))
  }, [])

  const handleStatusChange = async (id, status) => {
    await updateBookingStatus(id, status)
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status } : b))
    )
  }

  if (loading) return <p>Chargement...</p>

  return (
    <>
      <h1>Réservations</h1>
      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Client</th>
              <th>Chambre</th>
              <th>Arrivée</th>
              <th>Départ</th>
              <th>Total</th>
              <th>Statut</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => {
              const status = statusLabel[b.status] ?? statusLabel.pending
              return (
                <tr key={b.id}>
                  <td>#{String(b.id).padStart(5, '0')}</td>
                  <td>{b.user.name ?? b.user.email}</td>
                  <td>{b.room.name}</td>
                  <td>{formatDate(b.checkIn)}</td>
                  <td>{formatDate(b.checkOut)}</td>
                  <td>{b.totalPrice} €</td>
                  <td>
                    <select
                      className="admin-select"
                      value={b.status}
                      onChange={(e) => handleStatusChange(b.id, e.target.value)}
                    >
                      <option value="pending">En attente</option>
                      <option value="confirmed">Confirmée</option>
                      <option value="cancelled">Annulée</option>
                    </select>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default AdminBookings
