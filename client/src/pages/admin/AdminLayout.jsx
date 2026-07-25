import { NavLink, Outlet } from 'react-router-dom'
import './Admin.css'

function AdminLayout() {
  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <h2>Administration</h2>
        <NavLink to="/admin" end>
          <span className="material-symbols-outlined">dashboard</span>
          Dashboard
        </NavLink>
        <NavLink to="/admin/bookings">
          <span className="material-symbols-outlined">book_online</span>
          Réservations
        </NavLink>
        <NavLink to="/admin/users">
          <span className="material-symbols-outlined">group</span>
          Utilisateurs
        </NavLink>
        <NavLink to="/">
          <span className="material-symbols-outlined">arrow_back</span>
          Retour au site
        </NavLink>
      </aside>
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  )
}

export default AdminLayout
