import { useState } from 'react'
import { Link } from 'react-router-dom'
import chambres from '../../data/chambres'
import './Chambres.css'

const types = [
  { value: 'tous', label: 'Tous' },
  { value: 'standard', label: 'Standard' },
  { value: 'superieure', label: 'Supérieure' },
  { value: 'suite', label: 'Suite' },
]

function Chambres() {
  const [typeFiltre, setTypeFiltre] = useState('tous')
  const [capaciteFiltre, setCapaciteFiltre] = useState(1)
  const [prixMax, setPrixMax] = useState(250)

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
              max={250}
              step={5}
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
              <div className="catalogue-card-img">
                <img src={c.image} alt={c.nom} />
              </div>
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
