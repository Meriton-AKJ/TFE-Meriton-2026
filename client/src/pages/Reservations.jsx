function Reservations() {
  return (
    <main>

      <section className="catalogue-header">
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
                <option value="">-- Sélectionnez --</option>
                <option value="confort">Chambre Confort — 89 € / nuit</option>
                <option value="superieure">Chambre Supérieure — 149 € / nuit</option>
                <option value="familiale">Chambre Familiale — 199 € / nuit</option>
                <option value="suite-junior">Suite Junior — 249 € / nuit</option>
                <option value="suite-meriton">Suite Meriton — 349 € / nuit</option>
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

    </main>
  )
}

export default Reservations
