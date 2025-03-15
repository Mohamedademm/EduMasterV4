import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Snackbar,
  Alert,
  Box,
} from "@mui/material";

function GestionProfil() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: '',
  });

  // Récupère l'ID de l'utilisateur dans le localStorage
  const userId = JSON.parse(localStorage.getItem('user'))?._id;

  useEffect(() => {
    // Vérifie si l'utilisateur est connecté
    if (!userId) {
      setError('Utilisateur non connecté.');
      setLoading(false);
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/users/${userId}`);
        setUser(response.data);
      } catch (err) {
        setError('Erreur lors de la récupération des données utilisateur.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    setUpdating(true);
  
    // Vérification du token dans le localStorage
    const token = JSON.parse(localStorage.getItem('user'))?.token;
  
    if (!token) {
      setNotification({
        open: true,
        message: "Token manquant. Veuillez vous reconnecter.",
        severity: 'error',
      });
      setUpdating(false);
      return;
    }
  
    try {
      // Votre code pour la mise à jour de l'utilisateur
      const response = await axios.put(
        `http://localhost:3000/api/users/${userId}`,
        {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Utilisation du token dans l'en-tête
          },
        }
      );
  
      setNotification({
        open: true,
        message: "Profil mis à jour avec succès",
        severity: 'success',
      });
      setUser(response.data); // Mise à jour des données utilisateur
    } catch (err) {
      setNotification({
        open: true,
        message: "Erreur lors de la mise à jour du profil",
        severity: 'error',
      });
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="spinner-overlay">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return <p className="text-danger text-center">{error}</p>;
  }

  return (
    <Container sx={{ maxWidth: 500, mt: 5 }}>
      <Card sx={{ p: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Gestion du Profil
          </Typography>

          <TextField
            fullWidth
            label="Prénom"
            name="firstName"
            value={user?.firstName || ""}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Nom"
            name="lastName"
            value={user?.lastName || ""}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Email"
            name="email"
            value={user?.email || ""}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Rôle"
            value={user?.role || ""}
            disabled
            sx={{ mb: 2 }}
          />

          <Typography variant="caption" color="textSecondary">
            Créé le : {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : ""}
          </Typography>

          <Box mt={3}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleUpdate}
              disabled={updating}
            >
              {updating ? <CircularProgress size={24} /> : "Enregistrer"}
            </Button>
          </Box>
        </CardContent>
      </Card>

      <Snackbar
        open={notification.open}
        autoHideDuration={3000}
        onClose={() => setNotification({ ...notification, open: false })}
      >
        <Alert severity={notification.severity}>{notification.message}</Alert>
      </Snackbar>
    </Container>
  );
}

export default GestionProfil;
