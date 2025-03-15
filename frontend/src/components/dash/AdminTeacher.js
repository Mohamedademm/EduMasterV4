// AdminTeacher.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminTeacherStatistique from "./AdminTeacherStatistique";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TextField,
  CircularProgress,
  Typography,
  IconButton,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { ToastContainer, toast } from "react-toastify";
import { CSVLink } from "react-csv";
import "react-toastify/dist/ReactToastify.css";
import Button from "../ui/Button";
import Sidebar from "./Sidebar";
import "../../Css/dash/AdminTeacher.css";

const AdminTeacher = () => {
  const [teachers, setTeachers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterSubject, setFilterSubject] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [isEditing, setIsEditing] = useState(false);
  const [teacherToEdit, setTeacherToEdit] = useState(null);
  const [editTeacher, setEditTeacher] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        // On essaie d'abord de récupérer depuis localStorage
        const storedTeachers = localStorage.getItem("teachers");
        if (storedTeachers) {
          setTeachers(JSON.parse(storedTeachers));
        }
        // Puis on récupère depuis l'API pour avoir les données à jour
        const response = await axios.get("http://localhost:3000/api/users");
        const teacherData = response.data.filter(
          (user) => user.role === "teacher"
        );
        setTeachers(teacherData);
        localStorage.setItem("teachers", JSON.stringify(teacherData));
        setLoading(false);
      } catch (err) {
        console.error("Erreur lors du chargement des enseignants :", err);
        setError("Erreur lors du chargement des enseignants.");
        setLoading(false);
      }
    };
    fetchTeachers();
  }, []);

  const filteredTeachers = teachers.filter((teacher) => {
    const matchesSearch =
      teacher.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "active"
        ? teacher.active !== false
        : teacher.active === false);
    const matchesSubject =
      filterSubject === "all" ||
      (teacher.subject &&
        teacher.subject.toLowerCase() === filterSubject.toLowerCase());
    return matchesSearch && matchesStatus && matchesSubject;
  });

  const totalPages = Math.ceil(filteredTeachers.length / itemsPerPage);
  const currentTeachers = filteredTeachers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Suppression via confirmation native
  const handleDeleteClick = async (teacher) => {
    const confirmDelete = window.confirm(
      `Êtes-vous sûr de vouloir supprimer l'enseignant ${teacher.firstName} ${teacher.lastName} ?`
    );
    if (!confirmDelete) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3000/api/users/${teacher._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Enseignant supprimé avec succès");
      const updatedTeachers = teachers.filter((t) => t._id !== teacher._id);
      setTeachers(updatedTeachers);
      localStorage.setItem("teachers", JSON.stringify(updatedTeachers));
    } catch (err) {
      console.error("Erreur lors de la suppression de l'enseignant :", err);
      toast.error("Erreur lors de la suppression de l'enseignant");
    }
  };

  const handleEditClick = (teacher) => {
    setTeacherToEdit(teacher);
    setEditTeacher({
      firstName: teacher.firstName,
      lastName: teacher.lastName,
      email: teacher.email,
    });
    setIsEditing(true); // On cache le tableau et on affiche le formulaire inline
  };

  const confirmEdit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:3000/api/users/${teacherToEdit._id}`,
        {
          firstName: editTeacher.firstName,
          lastName: editTeacher.lastName,
          email: editTeacher.email,
          role: "teacher",
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Enseignant modifié avec succès");
      const updatedTeachers = teachers.map((t) =>
        t._id === teacherToEdit._id ? { ...t, ...response.data } : t
      );
      setTeachers(updatedTeachers);
      localStorage.setItem("teachers", JSON.stringify(updatedTeachers));
      setIsEditing(false);
      setTeacherToEdit(null);
    } catch (err) {
      console.error("Erreur lors de la modification de l'enseignant :", err);
      toast.error("Erreur lors de la modification de l'enseignant");
    }
  };

  const csvData = teachers.map((teacher) => ({
    Prénom: teacher.firstName,
    Nom: teacher.lastName,
    Email: teacher.email,
    Matière: teacher.subject || "N/A",
    DateInscription: new Date(teacher.createdAt).toLocaleDateString(),
    Statut: teacher.active !== false ? "Actif" : "Inactif",
  }));

  return (
    <div className="AdminCours">
      <Sidebar />
      <section className="admin-container">
        <AdminTeacherStatistique />
        <div className="admin-teacher-container" style={{ padding: "20px" }}>
          <Typography variant="h4" align="center" gutterBottom>
            Gestion des Enseignants
          </Typography>
          {/* Filtres avancés */}
          <div className="filter-container" style={{ marginBottom: "20px" }}>
            <TextField
              label="Rechercher un enseignant..."
              variant="outlined"
              fullWidth
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ marginBottom: "10px" }}
            />
            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <TextField
                select
                label="Statut"
                value={filterStatus}
                onChange={(e) => {
                  setFilterStatus(e.target.value);
                  setCurrentPage(1);
                }}
                SelectProps={{ native: true }}
                variant="outlined"
                fullWidth
              >
                <option value="all">Tous</option>
                <option value="active">Actifs</option>
                <option value="inactive">Inactifs</option>
              </TextField>
              <TextField
                select
                label="Matière"
                value={filterSubject}
                onChange={(e) => {
                  setFilterSubject(e.target.value);
                  setCurrentPage(1);
                }}
                SelectProps={{ native: true }}
                variant="outlined"
                fullWidth
              >
                <option value="all">Toutes</option>
                <option value="math">Mathématiques</option>
                <option value="physics">Physique</option>
                <option value="chemistry">Chimie</option>
              </TextField>
            </div>
          </div>
          {/* Bouton d'export CSV */}
          <div style={{ marginBottom: "20px", textAlign: "right" }}>
            <Button variant="default">
              <CSVLink
                data={csvData}
                filename={"enseignants.csv"}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Exporter CSV
              </CSVLink>
            </Button>
          </div>
          {loading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "20px 0",
              }}
            >
              <CircularProgress />
            </div>
          ) : error ? (
            <Typography color="error" align="center">
              {error}
            </Typography>
          ) : (
            <>
              {!isEditing ? (
                <>
                  <TableContainer component={Paper} style={{ marginBottom: "20px" }}>
                    <Table>
                      <TableHead style={{ backgroundColor: "#1976d2" }}>
                        <TableRow>
                          <TableCell style={{ color: "white", fontWeight: "bold" }}>
                            Prénom
                          </TableCell>
                          <TableCell style={{ color: "white", fontWeight: "bold" }}>
                            Nom
                          </TableCell>
                          <TableCell style={{ color: "white", fontWeight: "bold" }}>
                            Email
                          </TableCell>
                          <TableCell style={{ color: "white", fontWeight: "bold" }}>
                            Matière
                          </TableCell>
                          <TableCell style={{ color: "white", fontWeight: "bold" }}>
                            Date Inscription
                          </TableCell>
                          <TableCell style={{ color: "white", fontWeight: "bold" }}>
                            Statut
                          </TableCell>
                          <TableCell style={{ color: "white", fontWeight: "bold" }}>
                            Actions
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {currentTeachers.length > 0 ? (
                          currentTeachers.map((teacher) => (
                            <TableRow key={teacher._id} hover>
                              <TableCell>{teacher.firstName}</TableCell>
                              <TableCell>{teacher.lastName}</TableCell>
                              <TableCell>{teacher.email}</TableCell>
                              <TableCell>{teacher.subject || "N/A"}</TableCell>
                              <TableCell>
                                {new Date(teacher.createdAt).toLocaleDateString()}
                              </TableCell>
                              <TableCell>
                                {teacher.active !== false ? "Actif" : "Inactif"}
                              </TableCell>
                              <TableCell>
                                <IconButton
                                  color="primary"
                                  onClick={() => handleEditClick(teacher)}
                                >
                                  <Edit />
                                </IconButton>
                                <IconButton
                                  color="error"
                                  onClick={() => handleDeleteClick(teacher)}
                                >
                                  <Delete />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={7} align="center">
                              Aucun enseignant trouvé.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <div
                    className="pagination-container"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <Button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      Précédent
                    </Button>
                    <Typography>
                      Page {currentPage} sur {totalPages}
                    </Typography>
                    <Button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      Suivant
                    </Button>
                  </div>
                </>
              ) : (
                // Formulaire inline pour modifier l'enseignant
                <div style={{ padding: "20px", backgroundColor: "#f5f5f5", borderRadius: "5px" }}>
                  <Typography variant="h5" align="center" gutterBottom>
                    Modifier l'enseignant
                  </Typography>
                  <form onSubmit={confirmEdit}>
                    <TextField
                      label="Prénom"
                      variant="outlined"
                      fullWidth
                      value={editTeacher.firstName}
                      onChange={(e) =>
                        setEditTeacher({ ...editTeacher, firstName: e.target.value })
                      }
                      style={{ marginBottom: "10px" }}
                    />
                    <TextField
                      label="Nom"
                      variant="outlined"
                      fullWidth
                      value={editTeacher.lastName}
                      onChange={(e) =>
                        setEditTeacher({ ...editTeacher, lastName: e.target.value })
                      }
                      style={{ marginBottom: "10px" }}
                    />
                    <TextField
                      label="Email"
                      variant="outlined"
                      fullWidth
                      value={editTeacher.email}
                      onChange={(e) =>
                        setEditTeacher({ ...editTeacher, email: e.target.value })
                      }
                      style={{ marginBottom: "10px" }}
                    />
                    <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                      <Button variant="destructive" type="submit">
                        Modifier
                      </Button>
                      <Button variant="outline" onClick={() => setIsEditing(false)}>
                        Annuler
                      </Button>
                    </div>
                  </form>
                </div>
              )}
            </>
          )}
        </div>
        <ToastContainer position="top-right" autoClose={3000} />
      </section>
    </div>
  );
};

export default AdminTeacher;
