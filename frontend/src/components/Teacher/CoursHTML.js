// htmlCours.js
import React, { useState } from "react";
import "../../Css/Teacher/HtmlCours.css";

const HtmlCours = () => {
  const [code, setCode] = useState("<h1>Hello, EduMaster!</h1>");
  const courseId = localStorage.getItem("courseId");
  const teacherId = localStorage.getItem("teacherId");

  const handleAddMicroCourse = () => {
    window.location.href = "/addMicroCourse";
  };

  return (
    <div className="html-cours">
      <header className="header">
        <h1>Apprenez le HTML avec EduMaster</h1>
        {courseId && <p>ID du Cours: {courseId}</p>}
        <p>Le guide complet pour maîtriser le HTML et créer des pages web modernes.</p>
        {teacherId && (
          <button onClick={handleAddMicroCourse}>Ajouter Micro-Cour</button>
        )}
      </header>

      <nav className="nav">
        <ul>
          <li><a href="#introduction">Introduction</a></li>
          <li><a href="#balises">Balises HTML</a></li>
          <li><a href="#exemple">Exemple Interactif</a></li>
        </ul>
      </nav>

      <section id="introduction" className="section">
        <h2>Introduction au HTML</h2>
        <p>HTML (HyperText Markup Language) est le langage de base utilisé pour créer des pages web.</p>
      </section>

      <section id="balises" className="section">
        <h2>Les balises de base</h2>
        <p>Voici quelques balises essentielles :</p>
        <ul>
          <li><code>&lt;h1&gt;&lt;/h1&gt;</code> : Titre principal</li>
          <li><code>&lt;p&gt;&lt;/p&gt;</code> : Paragraphe</li>
          <li><code>&lt;a href="#"&gt;&lt;/a&gt;</code> : Lien</li>
          <li><code>&lt;img src="image.jpg" /&gt;</code> : Image</li>
        </ul>
      </section>

      <section id="exemple" className="section">
        <h2>Essayez-le vous-même</h2>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="code-editor"
        />
        <div className="preview" dangerouslySetInnerHTML={{ __html: code }} />
      </section>

      <footer className="footer">
        <p>&copy; 2025 EduMaster - Tous droits réservés.</p>
      </footer>
    </div>
  );
};

export default HtmlCours;
