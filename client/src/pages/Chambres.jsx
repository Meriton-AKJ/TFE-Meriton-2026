import { useState } from 'react'
import { Link } from 'react-router-dom'

const chambres = [
  {
    id: 1,
    nom: 'Chambre Confort',
    type: 'confort',
    capacite: 2,
    prix: 89,
    description: 'Chambre chaleureuse avec vue sur jardin, salle de bain privée et literie soignée.',
    equipements: ['wifi', 'tv', 'air_conditioned', 'bathtub'],
  },
  {
    id: 2,
    nom: 'Chambre Supérieure',
    type: 'superieure',
    capacite: 2,
    prix: 149,
    description: 'Spacieuse et élégante, décorée avec soin, literie haut de gamme et vue sur la ville.',
    equipements: ['wifi', 'tv', 'air_conditioned', 'bathtub', 'local_bar'],
  },
  {
    id: 3,
    nom: 'Chambre Familiale',
    type: 'familiale',
    capacite: 4,
    prix: 199,
    description: 'Idéale pour les familles, avec deux espaces séparés et salle de bain double vasque.',
    equipements: ['wifi', 'tv', 'air_conditioned', 'crib'],
  },
  {
    id: 4,
    nom: 'Suite Junior',
    type: 'suite',
    capacite: 2,
    prix: 249,
    description: 'Un coin salon privatif, une salle de bain luxueuse avec douche à l\'italienne.',
    equipements: ['wifi', 'tv', 'air_conditioned', 'bathtub', 'local_bar', 'room_service'],
  },
  {
    id: 5,
    nom: 'Suite Meriton',
    type: 'suite',
    capacite: 2,
    prix: 349,
    description: 'Le summum du luxe : salon privé, baignoire balnéo et vue panoramique sur Bruxelles.',
    equipements: ['wifi', 'tv', 'air_conditioned', 'bathtub', 'local_bar', 'room_service', 'spa'],
  },
]

const types = [
  { value: 'tous', label: 'Tous' },
  { value: 'confort', label: 'Confort' },
  { value: 'superieure', label: 'Supérieure' },
  { value: 'familiale', label: 'Familiale' },
  { value: 'suite', label: 'Suite' },
]

function Chambres() {
  const [typeFiltre, setTypeFiltre] = useState('tous')
  const [capaciteFiltre, setCapaciteFiltre] = useState(1)
  const [prixMax, setPrixMax] = useState(400)

  const chambresFiltrees = chambres.filter((c) => {
    if (typeFiltre !== 'tous' && c.type !== typeFiltre) return false
    if (c.capacite < capaciteFiltre) return false
    if (c.prix > prixMax) return false
    return true
  })

  return (
    <main>

      <section className="catalogue-header">
        <h1>Nos <em>chambres</em></h1>
        <p>Découvrez nos hébergements pensés pour votre confort et votre bien-être.</p>
      </section>

      <section className="catalogue-body">

        <aside className="catalogue-filtres">
          <h3>Filtres</h3>

          <div className="filtre-group">
            <label>Type de chambre</label>
            <div className="filtre-btns">
              {types.map((t) => (
                <button
                  key={t.value}
                  className={typeFiltre === t.value ? 'filtre-btn active' : 'filtre-btn'}
                  onClick={() => setTypeFiltre(t.value)}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="filtre-group">
            <label>Nombre de personnes</label>
            <select value={capaciteFiltre} onChange={(e) => setCapaciteFiltre(Number(e.target.value))}>
              <option value={1}>1+</option>
              <option value={2}>2+</option>
              <option value={3}>3+</option>
              <option value={4}>4+</option>
            </select>
          </div>

          <div className="filtre-group">
            <label>Prix max : <strong>{prixMax} €</strong> / nuit</label>
            <input
              type="range"
              min={50}
              max={400}
              step={10}
              value={prixMax}
              onChange={(e) => setPrixMax(Number(e.target.value))}
            />
          </div>
        </aside>

        <div className="catalogue-grid">
          {chambresFiltrees.length === 0 && (
            <p className="catalogue-vide">Aucune chambre ne correspond à vos critères.</p>
          )}
          {chambresFiltrees.map((c) => (
            <div key={c.id} className="catalogue-card">
              <div className="catalogue-card-img" />
              <div className="catalogue-card-body">
                <div className="catalogue-card-top">
                  <h3>{c.nom}</h3>
                  <span className="catalogue-badge">{c.capacite} pers.</span>
                </div>
                <p>{c.description}</p>
                <div className="catalogue-equipements">
                  {c.equipements.map((eq) => (
                    <span key={eq} className="material-symbols-outlined equip-icon" title={eq}>{eq}</span>
                  ))}
                </div>
                <div className="catalogue-card-footer">
                  <span className="chambre-prix">à partir de <strong>{c.prix} €</strong> / nuit</span>
                  <div className="catalogue-card-actions">
                    <Link to={`/chambres/${c.id}`} className="btn-outline">Détails</Link>
                    <Link to="/reservations" className="btn-primary">Réserver</Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </section>
    </main>
  )
}

export default Chambres
