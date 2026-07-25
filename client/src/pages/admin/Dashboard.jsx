import { useState, useEffect } from 'react'
import { getStats } from '../../services/admin.service.js'

const formatDate = (d) =>
  new Date(d).toLocaleDateString('fr-BE', { day: 'numeric', month: 'short', year: 'numeric' })

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

      <div className="admin-table-wrapper">
        <h2>Dernières réservations</h2>
        <table className="admin-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Client</th>
              <th>Chambre</th>
              <th>Arrivée</th>
              <th>Statut</th>
            </tr>
          </thead>
          <tbody>
            {stats.recentBookings.map((b) => {
              const status = statusLabel[b.status] ?? statusLabel.pending
              return (
                <tr key={b.id}>
                  <td>#{String(b.id).padStart(5, '0')}</td>
                  <td>{b.user.name ?? b.user.email}</td>
                  <td>{b.room.name}</td>
                  <td>{formatDate(b.checkIn)}</td>
                  <td><span className={`admin-status ${status.className}`}>{status.label}</span></td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Dashboard
