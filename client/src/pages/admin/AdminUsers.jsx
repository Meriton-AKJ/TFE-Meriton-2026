import { useState, useEffect } from 'react'
import { getUsers, updateUserRole, deleteUser } from '../../services/admin.service.js'

function formatDate(d) {
  return new Date(d).toLocaleDateString('fr-BE', { day: 'numeric', month: 'short', year: 'numeric' })
}

function AdminUsers() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getUsers()
      .then(setUsers)
      .finally(() => setLoading(false))
  }, [])

  async function handleRoleChange(id, role) {
    await updateUserRole(id, role)
    setUsers((prev) => prev.map((u) => u.id === id ? { ...u, role } : u))
  }

  async function handleDelete(id) {
    if (!window.confirm('Supprimer cet utilisateur et toutes ses réservations ?')) return
    await deleteUser(id)
    setUsers((prev) => prev.filter((u) => u.id !== id))
  }

  if (loading) return <p>Chargement...</p>

  return (
    <>
      <h1>Utilisateurs</h1>
      <div className="admin-card-list">
        {users.map((u) => (
          <div key={u.id} className="admin-card">
            <div className="admin-card-info">
              <span className="admin-card-ref">#{u.id}</span>
              <span><strong>Nom :</strong> {u.name ?? '—'}</span>
              <span><strong>Email :</strong> {u.email}</span>
              <span><strong>Inscrit le :</strong> {formatDate(u.createdAt)}</span>
            </div>
            <div className="admin-card-actions">
              <select
                className="admin-select"
                value={u.role}
                onChange={(e) => handleRoleChange(u.id, e.target.value)}
              >
                <option value="USER">USER</option>
                <option value="ADMIN">ADMIN</option>
              </select>
              <button className="btn-danger admin-btn-delete" onClick={() => handleDelete(u.id)}>
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default AdminUsers
