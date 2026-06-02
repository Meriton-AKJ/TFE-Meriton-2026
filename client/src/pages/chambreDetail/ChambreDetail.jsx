import { Link, useParams } from 'react-router-dom'
import chambres from '../../data/chambres'
import './ChambreDetail.css'

function ChambreDetail() {
  const { id } = useParams()
  const chambre = chambres.find((c) => c.id === Number(id))

  if (!chambre) {
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
        <img src={chambre.image} alt={chambre.nom} />
      </div>

      <div className="detail-content">
        <Link to="/chambres" className="detail-retour">← Retour au catalogue</Link>

        <div className="detail-header">
          <h1>{chambre.nom}</h1>
          <span className="catalogue-badge">{chambre.capacite} pers.</span>
        </div>

        <p className="detail-description">{chambre.description}</p>

        <div className="detail-equipements">
          <h3>Équipements</h3>
          <div className="catalogue-equipements">
            {chambre.equipements.map((eq) => (
              <span key={eq} className="material-symbols-outlined equip-icon" title={eq}>{eq}</span>
            ))}
          </div>
        </div>

        <div className="detail-footer">
          <span className="chambre-prix">à partir de <strong>{chambre.prix} €</strong> / nuit</span>
          <Link to="/reservations" className="btn-primary">Réserver cette chambre</Link>
        </div>
      </div>

    </main>
  )
}

export default ChambreDetail
