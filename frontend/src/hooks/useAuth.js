import { useEffect, useState } from 'react';
import axios from 'axios';

const useAuth = () => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    isLoading: true,
    user: null
  });

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setAuth({ isAuthenticated: false, isLoading: false, user: null });
        return;
      }
      try {
        const response = await axios.get('http://localhost:3000/api/auth/verifyToken', {
          headers: { Authorization: `Bearer ${token}` }
        });
        // On peut aussi vérifier ici le rôle si nécessaire (exemple : admin)
        if (response.status === 200 && response.data.user && response.data.user.role === "admin") {
          setAuth({ isAuthenticated: true, isLoading: false, user: response.data.user });
        } else {
          setAuth({ isAuthenticated: false, isLoading: false, user: null });
          localStorage.removeItem('token');
        }
      } catch (error) {
        console.error("Erreur lors de la vérification du token :", error.response?.data || error);
        setAuth({ isAuthenticated: false, isLoading: false, user: null });
        localStorage.removeItem('token');
      }
    };

    verifyToken();
  }, []);

  return auth;
};

export default useAuth;
