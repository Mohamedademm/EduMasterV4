import React, { useState } from 'react';
import '../Css/Contact.css';
const Contact = () => {
  const [nom, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted", { nom, email, message });
    setUsername('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className='Home'>

<footer className="contact-section">
      <div className="contact-container">
        <div className="contact-info">
          <p>
            Notre projet ayant comme objectifs la conception et la réalisation d’une plateforme de « Iset » qui consiste mettre à jour avec Iset.
          </p>
          <div className="contact-details">
            <h4>Contactez-nous</h4>
            <p>
              <strong>Téléphone :</strong><br />
              +216 73 307 960 / 73 307 961
            </p>
            <p>
              <strong>Localisation :</strong><br />
              Cité Erriadh - B.P 135 - 4023 Sousse
            </p>
            <p>
              <strong>Email :</strong><br />
              admin@isetso.rnu.tn
            </p>
          </div>
        </div>
        <div className="contact-form">
          <h2>Nous Contacter</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Nom :</label>
              <input
                type="text"
                id="name"
                name="name"
                value={nom}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email :</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message :</label>
              <textarea
                id="message"
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <buttoncontact type="submit">Envoyer</buttoncontact>
          </form>
        </div>
      </div>
    </footer>
    </div>
    

   
   
  );
};

export default Contact;
