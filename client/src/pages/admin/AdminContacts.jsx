import { useState, useEffect } from 'react'
import { getContacts, markContactAsRead } from '../../services/admin.service.js'

function formatDate(d) {
  return new Date(d).toLocaleDateString('fr-BE', { day: 'numeric', month: 'short', year: 'numeric' })
}

function AdminContacts() {
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getContacts()
      .then(setContacts)
      .finally(() => setLoading(false))
  }, [])

  async function handleRead(id) {
    await markContactAsRead(id)
    setContacts((prev) => prev.map((c) => c.id === id ? { ...c, read: true } : c))
  }

  if (loading) return <p>Chargement...</p>

  return (
    <>
      <h1>Messages</h1>
      <div className="admin-card-list">
        {contacts.map((c) => (
          <div key={c.id} className="admin-card" style={{ opacity: c.read ? 0.6 : 1 }}>
            <div className="admin-card-info">
              <span className="admin-card-ref">#{c.id}</span>
              <span><strong>Nom :</strong> {c.firstName} {c.lastName}</span>
              <span><strong>Email :</strong> {c.email}</span>
              <span><strong>Sujet :</strong> {c.subject}</span>
              <span><strong>Message :</strong> {c.message}</span>
              <span><strong>Date :</strong> {formatDate(c.createdAt)}</span>
            </div>
            <div>
              {c.read ? (
                <span className="admin-status status-confirmed">Lu</span>
              ) : (
                <button className="btn-primary" style={{ fontSize: '0.78rem', padding: '0.3em 0.8em' }} onClick={() => handleRead(c.id)}>
                  Marquer lu
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default AdminContacts
