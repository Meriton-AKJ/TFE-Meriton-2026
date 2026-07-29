import { NavLink, Outlet } from 'react-router-dom'
import './Admin.css'

function AdminLayout() {
  return (
    <div className="admin-layout">
      <header className="admin-header">
        <span className="admin-brand">Administration</span>
        <div className="admin-nav">
          <NavLink to="/admin" end>Dashboard</NavLink>
          <NavLink to="/admin/bookings">Réservations</NavLink>
          <NavLink to="/admin/users">Utilisateurs</NavLink>
          <NavLink to="/" className="admin-nav-back">Retour au site</NavLink>
        </div>
      </header>
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  )
}

export default AdminLayout
