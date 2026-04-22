import { Link, useParams } from 'react-router-dom'

const chambres = [
  {
    id: 1,
    nom: 'Chambre Confort',
    capacite: 2,
    prix: 89,
    description: 'Chambre chaleureuse avec vue sur jardin, salle de bain privée et literie soignée.',
    equipements: ['wifi', 'tv', 'air_conditioned', 'bathtub'],
  },
  {
    id: 2,
    nom: 'Chambre Supérieure',
    capacite: 2,
    prix: 149,
    description: 'Spacieuse et élégante, décorée avec soin, literie haut de gamme et vue sur la ville.',
    equipements: ['wifi', 'tv', 'air_conditioned', 'bathtub', 'local_bar'],
  },
  {
    id: 3,
    nom: 'Chambre Familiale',
    capacite: 4,
    prix: 199,
    description: 'Idéale pour les familles, avec deux espaces séparés et salle de bain double vasque.',
    equipements: ['wifi', 'tv', 'air_conditioned', 'crib'],
  },
  {
    id: 4,
    nom: 'Suite Junior',
    capacite: 2,
    prix: 249,
    description: 'Un coin salon privatif, une salle de bain luxueuse avec douche à l\'italienne.',
    equipements: ['wifi', 'tv', 'air_conditioned', 'bathtub', 'local_bar', 'room_service'],
  },
  {
    id: 5,
    nom: 'Suite Meriton',
    capacite: 2,
    prix: 349,
    description: 'Le summum du luxe : salon privé, baignoire balnéo et vue panoramique sur Bruxelles.',
    equipements: ['wifi', 'tv', 'air_conditioned', 'bathtub', 'local_bar', 'room_service', 'spa'],
  },
]

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

      <div className="detail-img-placeholder" />

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
