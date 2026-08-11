import { useState, useEffect } from 'react'
import { getStats } from '../../services/admin.service.js'

function formatDate(d) {
  return new Date(d).toLocaleDateString('fr-BE', { day: 'numeric', month: 'short', year: 'numeric' })
}

const statusLabel = {
  pending:   { label: 'En attente',  className: 'status-pending' },
  confirmed: { label: 'Confirmée',   className: 'status-confirmed' },
  cancelled: { label: 'Annulée',     className: 'status-cancelled' },
}

function Dashboard() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getStats()
      .then(setStats)
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p>Chargement...</p>

  return (
    <>
      <h1>Dashboard</h1>

      <div className="admin-stats">
        <div className="stat-card">
          <span className="material-symbols-outlined">book_online</span>
          <div className="stat-card-info">
            <span>Réservations</span>
            <strong>{stats.totalBookings}</strong>
          </div>
        </div>
        <div className="stat-card">
          <span className="material-symbols-outlined">group</span>
          <div className="stat-card-info">
            <span>Utilisateurs</span>
            <strong>{stats.totalUsers}</strong>
          </div>
        </div>
        <div className="stat-card">
          <span className="material-symbols-outlined">bed</span>
          <div className="stat-card-info">
            <span>Chambres</span>
            <strong>{stats.totalRooms}</strong>
          </div>
        </div>
        <div className="stat-card">
          <span className="material-symbols-outlined">euro</span>
          <div className="stat-card-info">
            <span>Revenus</span>
            <strong>{stats.totalRevenue} €</strong>
          </div>
        </div>
      </div>

      <h2>Dernières réservations</h2>
      <div className="admin-card-list">
        {stats.recentBookings.map((b) => {
          const status = statusLabel[b.status] ?? statusLabel.pending
          return (
            <div key={b.id} className="admin-card">
              <div className="admin-card-info">
                <span className="admin-card-ref">#{String(b.id).padStart(5, '0')}</span>
                <span><strong>Client :</strong> {b.user.name ?? b.user.email}</span>
                <span><strong>Chambre :</strong> {b.room.name}</span>
                <span><strong>Arrivée :</strong> {formatDate(b.checkIn)}</span>
              </div>
              <span className={`admin-status ${status.className}`}>{status.label}</span>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Dashboard
