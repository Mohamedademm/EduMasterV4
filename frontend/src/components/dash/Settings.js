import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from "./Sidebar";

const Settings = () => {
  const [settings, setSettings] = useState({
    appName: '',
    version: '',
    language: '',
    theme: 'light',
    fontSize: 'medium',
    notifications: {
      email: false,
      sms: false,
      push: false,
    },
    security: {
      twoFactor: false,
      passwordPolicy: 'strong',
    },
    integrations: {
      apiKey: '',
      webhookUrl: '',
    },
  });
  const [activeTab, setActiveTab] = useState('general');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notification, setNotification] = useState('');

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await axios.get('/api/settings');
      setSettings(response.data);
      setLoading(false);
    } catch (err) {
      setError("Erreur lors du chargement des paramètres.");
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Pour les champs de notifications et d'intégrations, utilisez des gestionnaires spécifiques
    setSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [name]: checked,
      },
    }));
  };

  const handleSecurityChange = (e) => {
    const { name, checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      security: {
        ...prev.security,
        [name]: checked,
      },
    }));
  };

  const handleIntegrationChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({
      ...prev,
      integrations: {
        ...prev.integrations,
        [name]: value,
      },
    }));
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('/api/settings', settings);
      setNotification("Paramètres mis à jour avec succès.");
      setTimeout(() => setNotification(''), 3000);
    } catch (err) {
      setError("Erreur lors de la mise à jour des paramètres.");
    }
  };

  return (
    <div className="AdminCours">
      <Sidebar />
      <section className="admin-container">
        <h1>Page des Paramètres</h1>
        {error && <div className="error-message">{error}</div>}
        {notification && <div className="notification">{notification}</div>}
        {loading ? (
          <p>Chargement...</p>
        ) : (
          <>
            <div className="tabs">
              <button
                className={activeTab === 'general' ? 'active' : ''}
                onClick={() => handleTabChange('general')}
              >
                Général
              </button>
              <button
                className={activeTab === 'appearance' ? 'active' : ''}
                onClick={() => handleTabChange('appearance')}
              >
                Apparence
              </button>
              <button
                className={activeTab === 'notifications' ? 'active' : ''}
                onClick={() => handleTabChange('notifications')}
              >
                Notifications
              </button>
              <button
                className={activeTab === 'security' ? 'active' : ''}
                onClick={() => handleTabChange('security')}
              >
                Sécurité
              </button>
              <button
                className={activeTab === 'integrations' ? 'active' : ''}
                onClick={() => handleTabChange('integrations')}
              >
                Intégrations
              </button>
              <button
                className={activeTab === 'backup' ? 'active' : ''}
                onClick={() => handleTabChange('backup')}
              >
                Sauvegarde
              </button>
            </div>
            <form onSubmit={handleSubmit} className="settings-form">
              {activeTab === 'general' && (
                <div className="tab-content">
                  <h2>Paramètres Généraux</h2>
                  <div className="form-group">
                    <label htmlFor="appName">Nom de l'application :</label>
                    <input
                      type="text"
                      id="appName"
                      name="appName"
                      value={settings.appName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="version">Version :</label>
                    <input
                      type="text"
                      id="version"
                      name="version"
                      value={settings.version}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="language">Langue par défaut :</label>
                    <select
                      id="language"
                      name="language"
                      value={settings.language}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="fr">Français</option>
                      <option value="en">Anglais</option>
                      <option value="es">Espagnol</option>
                    </select>
                  </div>
                </div>
              )}
              {activeTab === 'appearance' && (
                <div className="tab-content">
                  <h2>Personnalisation de l'Interface</h2>
                  <div className="form-group">
                    <label htmlFor="theme">Thème :</label>
                    <select
                      id="theme"
                      name="theme"
                      value={settings.theme}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="light">Clair</option>
                      <option value="dark">Sombre</option>
                      <option value="custom">Personnalisé</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="fontSize">Taille de la police :</label>
                    <select
                      id="fontSize"
                      name="fontSize"
                      value={settings.fontSize}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="small">Petit</option>
                      <option value="medium">Moyen</option>
                      <option value="large">Grand</option>
                    </select>
                  </div>
                </div>
              )}
              {activeTab === 'notifications' && (
                <div className="tab-content">
                  <h2>Configuration des Notifications</h2>
                  <div className="form-group">
                    <label>
                      <input
                        type="checkbox"
                        name="email"
                        checked={settings.notifications.email}
                        onChange={handleNotificationChange}
                      />
                      Notifications par Email
                    </label>
                  </div>
                  <div className="form-group">
                    <label>
                      <input
                        type="checkbox"
                        name="sms"
                        checked={settings.notifications.sms}
                        onChange={handleNotificationChange}
                      />
                      Notifications par SMS
                    </label>
                  </div>
                  <div className="form-group">
                    <label>
                      <input
                        type="checkbox"
                        name="push"
                        checked={settings.notifications.push}
                        onChange={handleNotificationChange}
                      />
                      Notifications Push
                    </label>
                  </div>
                </div>
              )}
              {activeTab === 'security' && (
                <div className="tab-content">
                  <h2>Paramètres de Sécurité</h2>
                  <div className="form-group">
                    <label>
                      <input
                        type="checkbox"
                        name="twoFactor"
                        checked={settings.security.twoFactor}
                        onChange={handleSecurityChange}
                      />
                      Authentification à deux facteurs
                    </label>
                  </div>
                  <div className="form-group">
                    <label htmlFor="passwordPolicy">Politique de mot de passe :</label>
                    <select
                      id="passwordPolicy"
                      name="passwordPolicy"
                      value={settings.security.passwordPolicy}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="weak">Faible</option>
                      <option value="medium">Moyenne</option>
                      <option value="strong">Forte</option>
                    </select>
                  </div>
                </div>
              )}
              {activeTab === 'integrations' && (
                <div className="tab-content">
                  <h2>Intégrations Externes</h2>
                  <div className="form-group">
                    <label htmlFor="apiKey">Clé API :</label>
                    <input
                      type="text"
                      id="apiKey"
                      name="apiKey"
                      value={settings.integrations.apiKey}
                      onChange={handleIntegrationChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="webhookUrl">URL du Webhook :</label>
                    <input
                      type="text"
                      id="webhookUrl"
                      name="webhookUrl"
                      value={settings.integrations.webhookUrl}
                      onChange={handleIntegrationChange}
                      required
                    />
                  </div>
                </div>
              )}
              {activeTab === 'backup' && (
                <div className="tab-content">
                  <h2>Sauvegarde et Restauration</h2>
                  <p>
                    Cette section permettra à l'administrateur de planifier et de gérer les sauvegardes
                    des paramètres système. (Fonctionnalité à implémenter)
                  </p>
                </div>
              )}
              <div className="form-actions">
                <button type="submit">Enregistrer les modifications</button>
              </div>
            </form>
          </>
        )}
      </section>
    </div>
  );
};

export default Settings;
