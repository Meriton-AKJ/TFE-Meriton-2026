import './APropos.css'

function APropos() {
  return (
    <main>

      <section className="apropos-histoire">
        <div className="apropos-inner">
          <h2>Notre <em>histoire</em></h2>
          <p>
            Le Meriton Hotel est né d'une rencontre entre deux passions : l'hospitalité et le web.
          </p>
          <p>
            Son fondateur, Meriton Askaj, a grandi entre plusieurs cultures et plusieurs langues,
            une ouverture sur le monde qui a toujours guidé sa vision de l'accueil. Après des années
            passées derrière le comptoir d'un hôtel à l'aéroport de Bruxelles, il a compris que
            l'hôtellerie n'était pas qu'un métier : c'était un art de mettre les gens à l'aise,
            peu importe d'où ils venaient.
          </p>
          <p>
            En parallèle, une reconversion s'est dessinée : une formation en développement web à
            Bruxelles, deux stages en entreprise, et l'envie de créer quelque chose qui lui ressemble.
          </p>
          <p>
            Ce qui a commencé comme un projet de fin d'études est aujourd'hui devenu une réalité :
            le Meriton Hotel, fondé en 2026 au cœur de Bruxelles, est le fruit de ce parcours,
            là où la rigueur technique rencontre la chaleur humaine.
          </p>
        </div>
      </section>

      <section className="apropos-valeurs">
        <h2>Nos <em>valeurs</em></h2>
        <div className="valeurs-grid">
          <div className="valeur-card">
            <span className="material-symbols-outlined valeur-icon">diamond</span>
            <h3>Excellence</h3>
            <p>Un service irréprochable, du check-in au check-out, pour chaque séjour.</p>
          </div>
          <div className="valeur-card">
            <span className="material-symbols-outlined valeur-icon">favorite</span>
            <h3>Hospitalité</h3>
            <p>Nous accueillons chaque client comme un invité de marque, avec attention et sincérité.</p>
          </div>
          <div className="valeur-card">
            <span className="material-symbols-outlined valeur-icon">eco</span>
            <h3>Responsabilité</h3>
            <p>Engagés pour un tourisme durable, nous agissons pour réduire notre empreinte environnementale.</p>
          </div>
          <div className="valeur-card">
            <span className="material-symbols-outlined valeur-icon">location_city</span>
            <h3>Ancrage local</h3>
            <p>Fiers de notre identité bruxelloise, nous valorisons les artisans et producteurs locaux.</p>
          </div>
        </div>
      </section>

      <section className="apropos-equipe">
        <div className="apropos-inner">
          <h2>Notre <em>équipe</em></h2>
          <p>
            Derrière le Meriton Hotel, une équipe de professionnels passionnés veille chaque jour
            à ce que votre séjour soit mémorable. De la réception à l'entretien des chambres,
            chaque collaborateur partage la même conviction : votre confort est notre priorité.
          </p>
          <p>
            Notre équipe multilingue, francophone, néerlandophone et anglophone, est disponible
            24h/24 pour vous accompagner tout au long de votre séjour à Bruxelles.
          </p>
        </div>
      </section>

    </main>
  )
}

export default APropos
