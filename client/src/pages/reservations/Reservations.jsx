import './Reservations.css'

const avantages = [
  { icon: 'verified',         titre: 'Meilleur prix garanti',    description: 'Réserver en direct vous assure le meilleur tarif disponible.' },
  { icon: 'event_available',  titre: 'Annulation gratuite',      description: 'Annulation sans frais jusqu\'à 24h avant votre arrivée.' },
  { icon: 'wifi',             titre: 'Wi-Fi inclus',             description: 'Connexion haut débit gratuite dans toutes les chambres.' },
  { icon: 'schedule',         titre: 'Réception 24h/24',         description: 'Notre équipe est disponible à toute heure pour vous accueillir.' },
]

function Reservations() {
  return (
    <main>

      <section className="catalogue-header catalogue-header--reservation">
        <h1>Faire une <em>réservation</em></h1>
        <p>Réservez votre séjour en quelques étapes simples.</p>
      </section>

      <section className="resa-page">

        <div className="resa-form-wrapper">
          <h2>Votre séjour</h2>

          <form className="resa-form">
            <div className="resa-row">
              <div className="resa-field">
                <label>Arrivée</label>
                <input type="date" />
              </div>
              <div className="resa-field">
                <label>Départ</label>
                <input type="date" />
              </div>
            </div>

            <div className="resa-row">
              <div className="resa-field">
                <label>Adultes</label>
                <select>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                </select>
              </div>
              <div className="resa-field">
                <label>Chambres</label>
                <select>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                </select>
              </div>
            </div>

            <div className="resa-field">
              <label>Type de chambre</label>
              <select>
                <option value="">Sélectionnez un type de chambre</option>
                <option value="1">Chambre Standard : 120 € / nuit</option>
                <option value="2">Chambre Standard Familiale : 210 € / nuit</option>
                <option value="3">Chambre Supérieure : 185 € / nuit</option>
                <option value="4">Chambre Supérieure Familiale : 260 € / nuit</option>
                <option value="5">Suite Meriton : 320 € / nuit</option>
                <option value="5">Suite Familiale : 420 € / nuit</option>
              </select>
            </div>

            <button type="submit" className="btn-primary resa-submit">Réserver</button>

            <p className="resa-mention">
              <span className="material-symbols-outlined">info</span>
              Annulation gratuite jusqu'à 24h avant votre arrivée.
            </p>
          </form>
        </div>

        <div className="resa-info">
          <ul>
            <li>
              <span className="material-symbols-outlined">location_on</span>
              <span>Rue de l'Hôtel 1<br />1000 Bruxelles, Belgique</span>
            </li>
            <li>
              <span className="material-symbols-outlined">phone</span>
              <span>+32 487 72 54 35</span>
            </li>
            <li>
              <span className="material-symbols-outlined">mail</span>
              <span>contact@meritonhotel.be</span>
            </li>
            <li>
              <span className="material-symbols-outlined">schedule</span>
              <span>Réception ouverte 24h/24</span>
            </li>
          </ul>
        </div>

      </section>

      <section className="resa-avantages">
        <h2>Pourquoi réserver <em>en direct</em> ?</h2>
        <div className="avantages-grid">
          {avantages.map((a) => (
            <div key={a.titre} className="avantage-card">
              <span className="material-symbols-outlined avantage-icon">{a.icon}</span>
              <h3>{a.titre}</h3>
              <p>{a.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="resa-experiences">
        <h2>Votre séjour, <em>votre façon</em></h2>
        <div className="experiences-grid">
          <div className="experience-card">
            <span className="material-symbols-outlined experience-icon">luggage</span>
            <h3>Voyager</h3>
            <p>Idéalement situé au cœur de Bruxelles, le Meriton Hotel est votre point de départ parfait pour explorer la capitale européenne et ses environs.</p>
          </div>
          <div className="experience-card">
            <span className="material-symbols-outlined experience-icon">explore</span>
            <h3>Découvrir</h3>
            <p>Grand-Place, Atomium, musées royaux… Notre équipe de conciergerie vous guide pour découvrir le meilleur de Bruxelles à votre rythme.</p>
          </div>
          <div className="experience-card">
            <span className="material-symbols-outlined experience-icon">spa</span>
            <h3>Se relaxer</h3>
            <p>Spa, piscine intérieure et massages, laissez-vous aller à une détente absolue sans quitter l'hôtel.</p>
          </div>
        </div>
      </section>

    </main>
  )
}

export default Reservations
