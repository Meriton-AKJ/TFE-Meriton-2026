import { useState, useEffect } from 'react'
import { getAllBookings, updateBookingStatus, createAdminBooking, getUsers } from '../../services/admin.service.js'
import { getRooms } from '../../services/rooms.service.js'

function formatDate(d) {
  return new Date(d).toLocaleDateString('fr-BE', { day: 'numeric', month: 'short', year: 'numeric' })
}

function AdminBookings() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)

  const [showForm, setShowForm] = useState(false)
  const [users, setUsers] = useState([])
  const [rooms, setRooms] = useState([])

  const [userId, setUserId] = useState('')
  const [roomId, setRoomId] = useState('')
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [guests, setGuests] = useState(1)
  const [formError, setFormError] = useState('')
  const [formLoading, setFormLoading] = useState(false)

  useEffect(() => {
    getAllBookings()
      .then(setBookings)
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (!showForm) return
    getUsers().then(setUsers)
    getRooms().then(setRooms)
  }, [showForm])

  const selectedRoom = rooms.find((r) => r.id === parseInt(roomId))
  const maxGuests = selectedRoom ? selectedRoom.capacity : 4

  async function handleStatusChange(id, status) {
    await updateBookingStatus(id, status)
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setFormError('')
    setFormLoading(true)
    try {
      await createAdminBooking({
        userId: parseInt(userId),
        roomId: parseInt(roomId),
        checkIn,
        checkOut,
        guests: parseInt(guests),
      })
      const updated = await getAllBookings()
      setBookings(updated)
      setUserId('')
      setRoomId('')
      setCheckIn('')
      setCheckOut('')
      setGuests(1)
      setShowForm(false)
    } catch (err) {
      setFormError(err.message)
    } finally {
      setFormLoading(false)
    }
  }

  if (loading) return <p>Chargement...</p>

  return (
    <>
      <div className="admin-section-header">
        <h1>Réservations</h1>
        <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Annuler' : '+ Nouvelle réservation'}
        </button>
      </div>

      {showForm && (
        <form className="admin-form" onSubmit={handleSubmit}>
          <h2>Créer une réservation</h2>

          {formError && <p className="admin-form-error">{formError}</p>}

          <div className="admin-form-grid">

            <div className="resa-field">
              <label>Client</label>
              <select value={userId} onChange={(e) => setUserId(e.target.value)} required>
                <option value="">Sélectionner un client</option>
                {users.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name ?? u.email} — {u.email}
                  </option>
                ))}
              </select>
            </div>

            <div className="resa-field">
              <label>Chambre</label>
              <select value={roomId} onChange={(e) => { setRoomId(e.target.value); setGuests(1) }} required>
                <option value="">Sélectionner une chambre</option>
                {rooms.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name} — {r.price} €/nuit
                  </option>
                ))}
              </select>
            </div>

            <div className="resa-field">
              <label>Arrivée</label>
              <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} required />
            </div>

            <div className="resa-field">
              <label>Départ</label>
              <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} required />
            </div>

            <div className="resa-field">
              <label>Nombre de personnes</label>
              <select value={guests} onChange={(e) => setGuests(e.target.value)} required>
                {Array.from({ length: maxGuests }, (_, i) => i + 1).map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>

          </div>

          <button type="submit" className="btn-success" disabled={formLoading}>
            {formLoading ? 'Création...' : 'Créer la réservation'}
          </button>
        </form>
      )}

      <div className="admin-card-list">
        {bookings.map((b) => (
          <div key={b.id} className="admin-card">
            <div className="admin-card-info">
              <span className="admin-card-ref">#{String(b.id).padStart(5, '0')}</span>
              <span><strong>Client :</strong> {b.user.name ?? b.user.email}</span>
              <span><strong>Chambre :</strong> {b.room.name}</span>
              <span><strong>Arrivée :</strong> {formatDate(b.checkIn)}</span>
              <span><strong>Départ :</strong> {formatDate(b.checkOut)}</span>
              <span><strong>Total :</strong> {b.totalPrice} €</span>
            </div>
            <select
              className="admin-select"
              value={b.status}
              onChange={(e) => handleStatusChange(b.id, e.target.value)}
            >
              <option value="pending">En attente</option>
              <option value="confirmed">Confirmée</option>
              <option value="cancelled">Annulée</option>
            </select>
          </div>
        ))}
      </div>
    </>
  )
}

export default AdminBookings
