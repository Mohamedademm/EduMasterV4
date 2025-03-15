import React, { useState, useEffect } from "react";
import { TableContainer,  Paper,
  Button, Typography, Select, MenuItem, InputLabel, FormControl, Dialog,
  DialogActions, DialogContent, DialogContentText, DialogTitle
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import "../Css/Paiements.css";

const Paiements = () => {
  const [paiements, setPaiements] = useState([]);
  const [filtreStatut, setFiltreStatut] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPaiement, setSelectedPaiement] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/paiements") // API des paiements
      .then((res) => res.json())
      .then((data) => setPaiements(data))
      .catch((err) => console.error("Erreur chargement paiements :", err));
  }, []);

  const handleFiltreChange = (event) => {
    setFiltreStatut(event.target.value);
  };

  const handleRemboursement = (id) => {
    setSelectedPaiement(id);
    setOpenDialog(true);
  };

  const confirmerRemboursement = () => {
    console.log("Remboursement validé pour l'ID :", selectedPaiement);
    setOpenDialog(false);
  };

  const handleFactureDownload = (id) => {
    console.log("Téléchargement de la facture pour l'ID :", id);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 80 },
    { field: "nom", headerName: "Nom", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "montant", headerName: "Montant (€)", width: 120 },
    { field: "type", headerName: "Type", width: 120 }, // Cours premium ou abonnement
    { field: "statut", headerName: "Statut", width: 130 },
    {
      field: "facture",
      headerName: "Facture",
      width: 150,
      renderCell: (params) => (
        <Button variant="contained" color="primary" onClick={() => handleFactureDownload(params.row.id)}>
          Télécharger
        </Button>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      width: 180,
      renderCell: (params) => (
        params.row.statut === "Remboursable" && (
          <Button variant="contained" color="error" onClick={() => handleRemboursement(params.row.id)}>
            Rembourser
          </Button>
        )
      ),
    },
  ];

  const paiementsFiltres = filtreStatut
    ? paiements.filter((p) => p.statut === filtreStatut)
    : paiements;

  return (
    <div className="paiements-container">
      <Typography variant="h4" className="titre">Gestion des Paiements</Typography>

      <FormControl className="filtre">
        <InputLabel>Filtrer par statut</InputLabel>
        <Select value={filtreStatut} onChange={handleFiltreChange}>
          <MenuItem value="">Tous</MenuItem>
          <MenuItem value="Réussi">Réussi</MenuItem>
          <MenuItem value="Échoué">Échoué</MenuItem>
          <MenuItem value="Remboursable">Remboursable</MenuItem>
        </Select>
      </FormControl>

      <Paper className="table-container">
        <TableContainer>
          <DataGrid
            rows={paiementsFiltres}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
            autoHeight
          />
        </TableContainer>
      </Paper>

      {/* Fenêtre de confirmation du remboursement */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirmer le remboursement</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Êtes-vous sûr de vouloir rembourser ce paiement ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">Annuler</Button>
          <Button onClick={confirmerRemboursement} color="error">Confirmer</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Paiements;
