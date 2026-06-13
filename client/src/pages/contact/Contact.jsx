import { useState } from 'react'
import Cta from '../../components/cta/Cta'
import './Contact.css'

const engagements = [
  { icon: 'phone_in_talk', titre: 'Téléphone 24h/24',    description: 'Notre réception est joignable à toute heure, 7 jours sur 7, au +32 487 72 54 35.' },
  { icon: 'mark_email_read', titre: 'Réponse sous 24h',  description: 'Toute demande envoyée par email ou formulaire reçoit une réponse dans les 24 heures.' },
  { icon: 'storefront', titre: 'Réception sur place',    description: 'Venez nous rendre visite directement à l\'hôtel, rue de l\'Hôtel 1, 1000 Bruxelles.' },
]

const faqContact = [
  { question: 'Quel est le délai de réponse à un email ?', reponse: 'Nous nous engageons à répondre à toute demande par email sous 24 heures, du lundi au dimanche.' },
  { question: 'Puis-je modifier ma réservation par téléphone ?', reponse: 'Oui, notre équipe peut modifier votre réservation ou l\'annuler 24 heures avant votre séjour par téléphone à tout moment. Munissez-vous de votre numéro de confirmation.' },
  { question: 'Comment joindre la conciergerie ?', reponse: 'La conciergerie est disponible à la réception 24h/24. Vous pouvez également nous écrire via ce formulaire en sélectionnant "Demande d\'information".' },
  { question: 'Puis-je faire une demande pour un groupe ?', reponse: 'Oui, pour toute réservation de groupe (5 chambres ou plus), contactez-nous par email à contact@meritonhotel.be avec vos dates et besoins.' },
]

function Contact() {
  const [faqOuverte, setFaqOuverte] = useState(null)
  return (
    <main>

      <section className="catalogue-header catalogue-header--contact">
        <h1>Nous <em>contacter</em></h1>
        <p>Notre équipe est disponible pour répondre à toutes vos questions.</p>
      </section>

      <section className="contact-page">

        <div className="contact-form-wrapper">
          <h2>Envoyez-nous un message</h2>
          <form className="contact-form">
            <div className="contact-row">
              <div className="contact-field">
                <label>Prénom</label>
                <input type="text" placeholder="Votre prénom" />
              </div>
              <div className="contact-field">
                <label>Nom</label>
                <input type="text" placeholder="Votre nom" />
              </div>
            </div>

            <div className="contact-field">
              <label>Email</label>
              <input type="email" placeholder="votre@email.com" />
            </div>

            <div className="contact-field">
              <label>Sujet</label>
              <select>
                <option value="">Quel est votre sujet ?</option>
                <option value="reservation">Réservation</option>
                <option value="information">Demande d'information</option>
                <option value="reclamation">Réclamation</option>
                <option value="autre">Autre</option>
              </select>
            </div>

            <div className="contact-field">
              <label>Message</label>
              <textarea rows="5" placeholder="Votre message..."></textarea>
            </div>

            <button type="submit" className="btn-primary contact-submit">Envoyer</button>
          </form>
        </div>

        <div className="contact-info">
          <h2>Informations</h2>
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
              <span>Réception ouverte 24h/24, 7j/7</span>
            </li>
          </ul>
        </div>

      </section>

      <section className="contact-engagements">
        <h2>Comment nous <em>répondons</em></h2>
        <div className="engagements-grid">
          {engagements.map((e) => (
            <div key={e.titre} className="engagement-card">
              <span className="material-symbols-outlined engagement-icon">{e.icon}</span>
              <h3>{e.titre}</h3>
              <p>{e.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="contact-faq">
        <h2>Questions <em>fréquentes</em></h2>
        <ul className="faq-list">
          {faqContact.map((item, i) => (
            <li key={i} className={`faq-item${faqOuverte === i ? ' open' : ''}`}>
              <button className="faq-question" onClick={() => setFaqOuverte(faqOuverte === i ? null : i)}>
                <span>{item.question}</span>
                <span className="material-symbols-outlined faq-icon">
                  {faqOuverte === i ? 'remove' : 'add'}
                </span>
              </button>
              {faqOuverte === i && (
                <p className="faq-reponse">{item.reponse}</p>
              )}
            </li>
          ))}
        </ul>
      </section>

      <Cta />

    </main>
  )
}

export default Contact
