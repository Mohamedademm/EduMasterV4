import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from "./Sidebar";

// Modal component for improved accessibility and separation of concerns
const Modal = ({ children, onClose }) => {
  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose} aria-label="Fermer le formulaire">&times;</button>
        {children}
      </div>
    </div>
  );
};

const Certifications = () => {
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formMode, setFormMode] = useState(''); // 'add' ou 'edit'
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    description: '',
    dateEmission: '',
    dateExpiration: '',
    status: '',
    user: ''
  });
  const [notification, setNotification] = useState('');

  useEffect(() => {
    fetchCertifications();
  }, []);

  const fetchCertifications = async () => {
    try {
      const response = await axios.get('/api/certifications');
      setCertifications(response.data);
      setLoading(false);
    } catch (err) {
      setError('Erreur lors du chargement des certifications.');
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredCertifications = certifications.filter(cert =>
    cert.name.toLowerCase().includes(search.toLowerCase()) ||
    cert.id.toString().includes(search)
  );

  const openAddForm = () => {
    setFormMode('add');
    setFormData({
      id: '',
      name: '',
      description: '',
      dateEmission: '',
      dateExpiration: '',
      status: '',
      user: ''
    });
    setShowForm(true);
  };

  const openEditForm = (cert) => {
    setFormMode('edit');
    setFormData({
      id: cert.id,
      name: cert.name,
      description: cert.description,
      dateEmission: cert.dateEmission,
      dateExpiration: cert.dateExpiration,
      status: cert.status,
      user: cert.user
    });
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
  };

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formMode === 'add') {
        await axios.post('/api/certifications', formData);
        setNotification('Certification ajoutée avec succès.');
      } else if (formMode === 'edit') {
        await axios.put(`/api/certifications/${formData.id}`, formData);
        setNotification('Certification modifiée avec succès.');
      }
      fetchCertifications();
      closeForm();
      setTimeout(() => setNotification(''), 3000);
    } catch (err) {
      setError('Erreur lors de la soumission du formulaire.');
      console.error(err);
    }
  };

  const handleDelete = async (certId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette certification ?')) {
      try {
        await axios.delete(`/api/certifications/${certId}`);
        setNotification('Certification supprimée avec succès.');
        fetchCertifications();
        setTimeout(() => setNotification(''), 3000);
      } catch (err) {
        setError('Erreur lors de la suppression de la certification.');
        console.error(err);
      }
    }
  };

  return (
    <div className="AdminCours">
      <Sidebar />
      <section className="admin-container">
        <h1>Page des Certifications</h1>
        {error && <div className="error-message">{error}</div>}
        {notification && <div className="notification">{notification}</div>}
        {loading ? (
          <p>Chargement...</p>
        ) : (
          <>
            <div className="search-container" style={{ marginBottom: '20px' }}>
              <input
                type="text"
                placeholder="Rechercher..."
                value={search}
                onChange={handleSearchChange}
                aria-label="Rechercher des certifications"
              />
              <button onClick={openAddForm}>Ajouter Certification</button>
            </div>
            <table className="certifications-table" border="1" cellPadding="10">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nom</th>
                  <th>Date d’émission</th>
                  <th>Date d’expiration</th>
                  <th>Statut</th>
                  <th>Utilisateur</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCertifications.map(cert => (
                  <tr key={cert.id}>
                    <td>{cert.id}</td>
                    <td>{cert.name}</td>
                    <td>{cert.dateEmission}</td>
                    <td>{cert.dateExpiration}</td>
                    <td>{cert.status}</td>
                    <td>{cert.user}</td>
                    <td>
                      <button onClick={() => openEditForm(cert)}>Modifier</button>
                      <button onClick={() => handleDelete(cert.id)}>Supprimer</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
        {showForm && (
          <Modal onClose={closeForm}>
            <h2>{formMode === 'add' ? 'Ajouter une Certification' : 'Modifier la Certification'}</h2>
            <form onSubmit={handleFormSubmit} className="form-certification">
              {formMode === 'edit' && (
                <div className="form-group">
                  <label>ID : {formData.id}</label>
                </div>
              )}
              <div className="form-group">
                <label htmlFor="name">Nom :</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description :</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="dateEmission">Date d’émission :</label>
                <input
                  type="date"
                  id="dateEmission"
                  name="dateEmission"
                  value={formData.dateEmission}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="dateExpiration">Date d’expiration :</label>
                <input
                  type="date"
                  id="dateExpiration"
                  name="dateExpiration"
                  value={formData.dateExpiration}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="status">Statut :</label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleFormChange}
                  required
                >
                  <option value="">Sélectionner un statut</option>
                  <option value="active">Actif</option>
                  <option value="expired">Expiré</option>
                  <option value="pending">En attente</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="user">Utilisateur :</label>
                <input
                  type="text"
                  id="user"
                  name="user"
                  value={formData.user}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div className="form-actions" style={{ marginTop: '10px' }}>
                <button type="submit">{formMode === 'add' ? 'Ajouter' : 'Modifier'}</button>
                <button type="button" onClick={closeForm} style={{ marginLeft: '10px' }}>Annuler</button>
              </div>
            </form>
          </Modal>
        )}
      </section>
    </div>
  );
};

export default Certifications;
