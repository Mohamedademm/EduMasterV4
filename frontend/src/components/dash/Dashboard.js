import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './Sidebar';
import Section1 from './Section1';
import Section2 from './Section2';
import Section3 from './Section3';
import '../../Css/dash/Dashboard.css';

function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      // Récupérer et afficher le token stocké
      const token = localStorage.getItem('token');
      console.log("Token récupéré dans Dashboard :", token);
      if (!token) {
        setError('Aucun token trouvé. Veuillez vous connecter.');
        navigate('/login'); // Rediriger vers la page de login si pas de token
        return;
      }

      try {
        // Affiche une trace avant d'envoyer la requête
        console.log("Envoi de la requête vers /api/dashboard avec le token...");
        const response = await axios.get('http://localhost:3000/api/dashboard', {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log("Réponse du Dashboard :", response.data);
        setDashboardData(response.data);
      } catch (err) {
        console.error('Erreur lors du chargement du Dashboard :', err.response || err);
        if (err.response && (err.response.status === 401 || err.response.status === 403)) {
          // Si le token est invalide ou expiré, on le retire et redirige
          localStorage.removeItem('token');
          navigate('/login');
        } else {
          setError("Erreur lors du chargement du Dashboard.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [navigate]);

  if (isLoading) {
    return <div className="dashboard-loading">Chargement...</div>;
  }

  if (error) {
    return <div className="dashboard-error">{error}</div>;
  }

  return (
    <div className="dashboard">
      <Sidebar />
      <main className="mainContent">
        <Section1 userData={dashboardData?.user || {}} />
        <Section2 userData={dashboardData?.user || {}} />
        <Section3 userData={dashboardData?.user || {}} />
      </main>
    </div>
  );
}

export default Dashboard;
