import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getRoom } from '../../services/rooms.service'
import './ChambreDetail.css'

function ChambreDetail() {
  const { id } = useParams()
  const [room, setRoom] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getRoom(id)
      .then((data) => setRoom(data))
      .catch(() => setRoom(null))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return <main className="detail-notfound"><p>Chargement...</p></main>
  }

  if (!room) {
    return (
      <main className="detail-notfound">
        <h2>Chambre introuvable</h2>
        <Link to="/chambres" className="btn-primary">Retour au catalogue</Link>
      </main>
    )
  }

  return (
    <main className="detail-page">

      <div className="detail-img-wrapper">
        <img src={room.image} alt={room.name} />
      </div>

      <div className="detail-content">

        <div className="detail-header">
          <div className="detail-header-left">
            <h1>{room.name}</h1>
            <div className="detail-meta">
              <span className="detail-prix">
                à partir de <strong>{room.price} €</strong> / nuit
              </span>
              <span className="catalogue-badge">
                Jusqu'à {room.capacity} personnes
              </span>
            </div>
          </div>
        </div>

        <p className="detail-description">{room.description}</p>

        {room.amenities?.length > 0 && (
          <div className="detail-equipements">
            <h3>Équipements</h3>
            <ul className="detail-equip-list">
              {room.amenities.map((eq) => (
                <li key={eq.icon}>
                  <span className="material-symbols-outlined">{eq.icon}</span>
                  {eq.label}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="detail-actions">
          <Link to="/chambres" className="btn-outline detail-retour">
            Retour au catalogue
          </Link>
          <Link to={`/reservations?roomId=${room.id}`} className="btn-primary">
            Réserver cette chambre
          </Link>
        </div>

      </div>

    </main>
  )
}

export default ChambreDetail
