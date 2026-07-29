import { useState, useEffect } from 'react'
import { getContacts, markContactAsRead } from '../../services/admin.service.js'

const formatDate = (d) =>
  new Date(d).toLocaleDateString('fr-BE', { day: 'numeric', month: 'short', year: 'numeric' })

function AdminContacts() {
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    getContacts()
      .then(setContacts)
      .finally(() => setLoading(false))
  }, [])

  const handleRead = async (id) => {
    await markContactAsRead(id)
    setContacts((prev) => prev.map((c) => c.id === id ? { ...c, read: true } : c))
  }

  if (loading) return <p>Chargement...</p>

  return (
    <>
      <h1>Messages</h1>
      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Nom</th>
              <th>Email</th>
              <th>Sujet</th>
              <th>Message</th>
              <th>Date</th>
              <th>Statut</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((c) => (
              <tr key={c.id} style={{ opacity: c.read ? 0.6 : 1 }}>
                <td>#{c.id}</td>
                <td>{c.firstName} {c.lastName}</td>
                <td>{c.email}</td>
                <td>{c.subject}</td>
                <td style={{ maxWidth: '250px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {c.message}
                </td>
                <td>{formatDate(c.createdAt)}</td>
                <td>
                  {c.read ? (
                    <span className="admin-status status-confirmed">Lu</span>
                  ) : (
                    <button className="btn-primary" style={{ fontSize: '0.78rem', padding: '0.3em 0.8em' }} onClick={() => handleRead(c.id)}>
                      Marquer lu
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default AdminContacts
