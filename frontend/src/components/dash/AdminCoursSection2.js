import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Box,
} from "@mui/material";

const AdminCoursSection2 = () => {
  const [courses, setCourses] = useState([]);
  const [domains, setDomains] = useState([]);
  const [selectedDomain, setSelectedDomain] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/courses")
      .then((response) => {
        const data = response.data;
        setCourses(data);

        const uniqueDomains = [...new Set(data.map((course) => course.domaine))];
        setDomains(uniqueDomains);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur lors de la récupération des cours:", err);
        setError("Erreur lors du chargement des cours.");
        setLoading(false);
      });
  }, []);

  const filteredCourses = selectedDomain
    ? courses.filter(
        (course) =>
          course.domaine.toLowerCase() === selectedDomain.toLowerCase()
      )
    : courses;

  return (
    <div className="AdminCoursSection">
        
    <Box >
      <Typography variant="h4" align="center" gutterBottom>
        Gestion des Cours
      </Typography>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="domain-select-label">Filtrer par domaine</InputLabel>
        <Select
          labelId="domain-select-label"
          id="domain-select"
          value={selectedDomain}
          label="Filtrer par domaine"
          onChange={(e) => setSelectedDomain(e.target.value)}
        >
          <MenuItem value="">
            <em>Tous</em>
          </MenuItem>
          {domains.map((domain, index) => (
            <MenuItem key={index} value={domain}>
              {domain}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error" align="center">
          {error}
        </Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ backgroundColor: "#1976d2" }}>
              <TableRow>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Nom du cours
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Domaine
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Nb Micro-Cours
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Enseignant
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Image
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Date de création
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCourses.map((course) => (
                <TableRow key={course._id} hover>
                  <TableCell>{course.name}</TableCell>
                  <TableCell>{course.domaine}</TableCell>
                  <TableCell>{course.NbMicroCour}</TableCell>
                  <TableCell>{course.teacher}</TableCell>
                  <TableCell>
                    <img src={course.image} alt={course.name} width="100" />
                  </TableCell>
                  <TableCell>
                    {new Date(course.createdAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
              {filteredCourses.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    Aucun cours trouvé.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
    </div>
  );
};

export default AdminCoursSection2;
