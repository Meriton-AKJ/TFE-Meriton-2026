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

      <div className="detail-img-placeholder">
        <img src={room.image} alt={room.name} />
      </div>

      <div className="detail-content">
        <Link to="/chambres" className="detail-retour">← Retour au catalogue</Link>

        <div className="detail-header">
          <h1>{room.name}</h1>
          <span className="catalogue-badge">{room.capacity} pers.</span>
        </div>

        <p className="detail-description">{room.description}</p>

        <div className="detail-equipements">
          <h3>Équipements</h3>
          <div className="catalogue-equipements">
            {room.amenities.map((eq) => (
              <span key={eq} className="material-symbols-outlined equip-icon" title={eq}>{eq}</span>
            ))}
          </div>
        </div>

        <div className="detail-footer">
          <span className="chambre-prix">à partir de <strong>{room.price} €</strong> / nuit</span>
          <Link to="/reservations" className="btn-primary">Réserver cette chambre</Link>
        </div>
      </div>

    </main>
  )
}

export default ChambreDetail
