// Careers.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Css/Careers.css';

const Careers = () => {
  const jobOffers = [
    { id: 1, title: 'Développeur Front-End', department: 'Tech', description: 'Intégrez notre équipe technique et participez à la création d’interfaces web innovantes.' },
    { id: 2, title: 'Chef de Projet Marketing', department: 'Marketing', description: 'Rejoignez notre équipe marketing et contribuez à la stratégie globale de l’entreprise.' },
    // Vous pouvez ajouter d'autres offres ici...
  ];

  const [faqItems, setFaqItems] = useState([
    { question: "Quel est le processus de candidature ?", answer: "Nous recevons votre candidature, la traitons via notre système de suivi, et vous contactons pour un entretien si votre profil correspond à nos besoins.", isOpen: false },
    { question: "Comment puis-je suivre ma candidature ?", answer: "Après votre candidature, vous recevrez un email avec un lien pour suivre l’avancement de votre dossier.", isOpen: false },
    // Ajoutez d'autres FAQ si nécessaire...
  ]);

  const toggleFaq = index => {
    const newFaqItems = faqItems.map((item, i) => {
      if (i === index) {
        return { ...item, isOpen: !item.isOpen };
      }
      return item;
    });
    setFaqItems(newFaqItems);
  };

  return (
    <div className="careers-page">
      <header className="careers-header-container">
        <div className="careers-logo">
          <img src="logo-edumaster.png" alt="Logo EduMaster" />
        </div>
        <h1>Carrières – Rejoignez Notre Équipe</h1>
        <nav aria-label="Menu principal">
          <ul>
            <li><a href="#offres">Offres d’Emploi</a></li>
            <li><a href="#culture">Notre Culture</a></li>
            <li><a href="#avantages">Avantages</a></li>
            <li><a href="#processus">Processus</a></li>
            <li><a href="#faq">FAQ</a></li>
          </ul>
        </nav>
        <div className="careers-search-bar">
          <input type="search" placeholder="Rechercher une offre..." aria-label="Recherche" />
        </div>
      </header>

      <section className="careers-hero">
        <div className="careers-overlay">
          <h2>Faites le Grand Saut – Innovez avec Nous</h2>
          <p>Découvrez des opportunités passionnantes au sein d’une entreprise innovante et dynamique.</p>
          <a href="#offres" className="careers-cta-btn">Voir Nos Offres</a>
        </div>
      </section>

      <main className="careers-content">
        <section id="offres" className="careers-job-list">
          <h2>Nos Offres d’Emploi</h2>
          <div className="job-offers">
            {jobOffers.map(job => (
              <article key={job.id} className="job-offer">
                <h3>{job.title}</h3>
                <p>{job.description}</p>
                <Link to={`/career/${job.id}`} className="btn-job-detail">En Savoir Plus</Link>
              </article>
            ))}
          </div>
        </section>

        <section id="culture" className="careers-culture">
          <h2>Notre Culture</h2>
          <p>Chez EduMaster, nous valorisons l’innovation, l’inclusion et l’excellence. Découvrez notre histoire, nos valeurs et la vie au quotidien au sein de notre équipe.</p>
          {/* Intégrez ici une galerie photo ou vidéo */}
        </section>

        <section id="avantages" className="careers-benefits">
          <h2>Avantages et Bénéfices</h2>
          <ul>
            <li>Horaires flexibles et possibilité de télétravail</li>
            <li>Programmes de formation continue et de mentorat</li>
            <li>Assurance santé et avantages sociaux compétitifs</li>
            <li>Ambiance de travail collaborative et dynamique</li>
          </ul>
        </section>

        <section id="processus" className="careers-process">
          <h2>Notre Processus de Recrutement</h2>
          <ol>
            <li>Soumission de votre candidature en ligne</li>
            <li>Entretien téléphonique/visioconférence</li>
            <li>Tests techniques et mises en situation</li>
            <li>Entretien final avec le management</li>
            <li>Intégration et onboarding</li>
          </ol>
          <p>Préparez-vous au mieux en consultant nos conseils pour réussir votre entretien.</p>
        </section>

        <section id="faq" className="careers-faq">
          <h2>Questions Fréquentes</h2>
          {faqItems.map((item, index) => (
            <div key={index} className="faq-item">
              <button className="faq-question" onClick={() => toggleFaq(index)}>
                {item.question}
              </button>
              {item.isOpen && (
                <div className="faq-answer">
                  <p>{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </section>

        <section id="apply" className="careers-application">
          <h2>Postulez Maintenant</h2>
          <form action="submit-application" method="POST" encType="multipart/form-data">
            <label htmlFor="fullName">Nom Complet :</label>
            <input type="text" id="fullName" name="fullName" required />

            <label htmlFor="email">Adresse Email :</label>
            <input type="email" id="email" name="email" required />

            <label htmlFor="phone">Téléphone :</label>
            <input type="tel" id="phone" name="phone" required />

            <label htmlFor="position">Poste Souhaité :</label>
            <input type="text" id="position" name="position" required />

            <label htmlFor="coverLetter">Lettre de Motivation :</label>
            <textarea id="coverLetter" name="coverLetter" rows="5" required></textarea>

            <label htmlFor="cv">Télécharger votre CV :</label>
            <input type="file" id="cv" name="cv" accept=".pdf,.doc,.docx" required />

            <button type="submit" className="btn-submit-application">Envoyer ma Candidature</button>
          </form>
        </section>
      </main>

      <footer>
        <div className="careers-footer-content">
          <nav className="careers-footer-nav">
            <ul>
              <li><a href="#offres">Offres</a></li>
              <li><a href="#culture">Culture</a></li>
              <li><a href="#avantages">Avantages</a></li>
              <li><a href="#processus">Processus</a></li>
              <li><a href="#faq">FAQ</a></li>
              <li><a href="contact.html">Contact</a></li>
            </ul>
          </nav>
          <div className="careers-legal">
            <a href="mentions-legales.html">Mentions Légales</a> | <a href="cgu.html">CGU</a>
          </div>
          <div className="careers-social-media">
            <a href="#" aria-label="Facebook"><img src="facebook-icon.png" alt="Facebook" /></a>
            <a href="#" aria-label="LinkedIn"><img src="linkedin-icon.png" alt="LinkedIn" /></a>
            <a href="#" aria-label="Twitter"><img src="twitter-icon.png" alt="Twitter" /></a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Careers;
