import { useState, useEffect } from 'react'
import { getUsers, updateUserRole, deleteUser } from '../../services/admin.service.js'

const formatDate = (d) =>
  new Date(d).toLocaleDateString('fr-BE', { day: 'numeric', month: 'short', year: 'numeric' })

function AdminUsers() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getUsers()
      .then(setUsers)
      .finally(() => setLoading(false))
  }, [])

  const handleRoleChange = async (id, role) => {
    // On envoie le nouveau rôle à l'API
    await updateUserRole(id, role)

    // On met à jour la liste localement sans recharger la page
    const usersModifies = users.map((user) => {
      if (user.id === id) {
        return { ...user, role: role } // on remplace le rôle de cet user
      }
      return user // les autres restent inchangés
    })

    setUsers(usersModifies)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer cet utilisateur et toutes ses réservations ?')) return
    await deleteUser(id)
    setUsers((prev) => prev.filter((u) => u.id !== id))
  }

  if (loading) return <p>Chargement...</p>

  return (
    <>
      <h1>Utilisateurs</h1>
      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Nom</th>
              <th>Email</th>
              <th>Rôle</th>
              <th>Inscrit le</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.name ?? '—'}</td>
                <td>{u.email}</td>
                <td>
                  <select
                    className="admin-select"
                    value={u.role}
                    onChange={(e) => handleRoleChange(u.id, e.target.value)}
                  >
                    <option value="USER">USER</option>
                    <option value="ADMIN">ADMIN</option>
                  </select>
                </td>
                <td>{formatDate(u.createdAt)}</td>
                <td>
                  <button
                    className="btn-danger admin-btn-delete"
                    onClick={() => handleDelete(u.id)}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default AdminUsers
