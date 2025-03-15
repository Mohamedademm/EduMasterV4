// Blog.js
import React from 'react';
import '../Css/Blog.css';

const Blog = () => {
  return (
    <>
      <header>
        <div className="blogPage-header-container">
          <div className="blogPage-logo">
            <h3>Le Blog EduMaster : <br/> Apprenez, Enseignez et Évoluez</h3>
          </div>
          
          <nav aria-label="Menu principal">
            <ul>
              <li><a href="#etudiants">Étudiants</a></li>
              <li><a href="#enseignants">Enseignants</a></li>
              <li><a href="#technique">Aide Technique</a></li>
              <li><a href="#tendances">Tendances</a></li>
            </ul>
          </nav>
          <div className="blogPage-search-bar">
            <input type="search" placeholder="Rechercher un article..." aria-label="Recherche" />
          </div>
        </div>
      </header>
      
      <section className="blogPage-hero">
        <div className="blogPage-overlay">
          <h2>Découvrez nos conseils exclusifs</h2>
          <p>Réussite, pédagogie, et innovation au cœur de votre apprentissage.</p>
          <a href="#newsletter" className="blogPage-cta-btn">Inscrivez-vous à notre Newsletter</a>
        </div>
      </section>
      
      <main className="blogPage-content">
        <div className="blogPage-main-left">
          <section className="blogPage-articles">
            <article className="blogPage-featured-article">
              <img src="article1.jpg" alt="Illustration de l'article" />
              <div className="blogPage-article-info">
                <h3>Titre de l'Article</h3>
                <p>Extrait de l'article avec un résumé bref et accrocheur...</p>
                <a href="article1.html" className="blogPage-btn-readmore">Lire Plus</a>
              </div>
            </article>
            {/* Répétez pour d'autres articles */}
          </section>
          
          <section className="blogPage-aide-sections">
            <div id="etudiants" className="blogPage-aide-section">
              <h2>Aide pour les Étudiants</h2>
              <ul>
                <li><a href="#reviser">Comment bien réviser pour les examens ? 📚</a></li>
                <li><a href="#plateformes">Les meilleures plateformes pour apprendre en ligne 🌐</a></li>
                <li><a href="#emploi">Comment organiser son emploi du temps pour étudier efficacement ? ⏳</a></li>
                <li><a href="#test">Astuces pour réussir un test en ligne ✅</a></li>
                <li><a href="#erreurs">Les erreurs à éviter en tant qu’étudiant en ligne 🚫</a></li>
              </ul>
            </div>
            <div id="enseignants" className="blogPage-aide-section">
              <h2>Aide pour les Enseignants</h2>
              <ul>
                <li><a href="#creer-cours">Comment créer un cours interactif sur EduMaster ? 🎥</a></li>
                <li><a href="#engager">Les meilleures méthodes pour engager ses élèves en ligne 💡</a></li>
                <li><a href="#ia">Utiliser l'IA pour personnaliser l'apprentissage des étudiants 🤖</a></li>
                <li><a href="#monetiser">Comment monétiser ses cours avec EduMaster ? 💰</a></li>
                <li><a href="#corriger">Optimiser la correction des examens en ligne 📝</a></li>
              </ul>
            </div>
            <div id="technique" className="blogPage-aide-section">
              <h2>Aide Technique et Utilisation d’EduMaster</h2>
              <ul>
                <li><a href="#inscription">Comment s’inscrire et configurer son compte ? 🆕</a></li>
                <li><a href="#connexion">Problèmes de connexion et solutions 🔄</a></li>
                <li><a href="#suivre">Comment suivre un cours et progresser efficacement ? 🚀</a></li>
                <li><a href="#certifications">Ajouter et gérer ses certifications 🎖</a></li>
                <li><a href="#support">Contacter le support en cas de problème 📞</a></li>
              </ul>
            </div>
          </section>
          
          <section id="tendances" className="blogPage-tendances">
            <h2>Tendances</h2>
            <ul>
              <li><a href="#trend1">Tendance 1</a></li>
              <li><a href="#trend2">Tendance 2</a></li>
              <li><a href="#trend3">Tendance 3</a></li>
            </ul>
          </section>
        </div>
        
        <aside className="blogPage-sidebar">
          <div className="blogPage-widget blogPage-popular-articles">
            <h3>Articles Populaires</h3>
            <ul>
              <li><a href="#article-pop">Titre Article Populaire 1</a></li>
              <li><a href="#article-pop">Titre Article Populaire 2</a></li>
              <li><a href="#article-pop">Titre Article Populaire 3</a></li>
            </ul>
          </div>
          <div className="blogPage-widget blogPage-subscribe-newsletter" id="newsletter">
            <h3>Newsletter</h3>
            <form>
              <input type="email" placeholder="Votre email" required />
              <button type="submit">S'abonner</button>
            </form>
          </div>
        </aside>
      </main>
      
      <footer>
        <div className="blogPage-footer-content">
          <nav className="blogPage-footer-nav">
            <ul>
              <li><a href="#etudiants">Étudiants</a></li>
              <li><a href="#enseignants">Enseignants</a></li>
              <li><a href="#technique">Aide Technique</a></li>
              <li><a href="#tendances">Tendances</a></li>
              <li><a href="contact.html">Contact</a></li>
            </ul>
          </nav>
          <div className="blogPage-legal">
            <a href="mentions-legales.html">Mentions Légales</a> | <a href="cgu.html">CGU</a>
          </div>
          <div className="blogPage-social-media">
            <a href="#" aria-label="Facebook"><img src="facebook-icon.png" alt="Facebook" /></a>
            <a href="#" aria-label="LinkedIn"><img src="linkedin-icon.png" alt="LinkedIn" /></a>
            <a href="#" aria-label="Twitter"><img src="twitter-icon.png" alt="Twitter" /></a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Blog;
