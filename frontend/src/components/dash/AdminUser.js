import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "../ui/card";
import { Table, TableHead, TableRow, TableCell, TableBody } from "../ui/table";
import Button from "../ui/Button";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";
import "../../Css/dash/AdminUser.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./Sidebar";
import '../../Css/react-confirm-alert.css'; // Conserver l'import si nécessaire
// On n'utilise plus react-confirm-alert ici

const AdminUser = () => {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    inactiveUsers: 0,
    roles: { admin: 0, teacher: 0, user: 0 },
    registrationsByMonth: {},
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Recherche et filtre
  const [searchQuery, setSearchQuery] = useState("");
  const [filterActive, setFilterActive] = useState("all");

  // Tri
  const [sortField, setSortField] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchUsers();
    fetchStats();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get("http://localhost:3000/api/users");
      const filteredUsers = response.data.filter(user => user.role === "user");
      setUsers(filteredUsers);
    } catch (err) {
      console.error("Erreur lors de la récupération des utilisateurs :", err);
      setError("Erreur lors de la récupération des utilisateurs");
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/users/stats");
      setStats(response.data);
    } catch (err) {
      console.error("Erreur lors de la récupération des statistiques :", err);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleFilterChange = (e) => {
    setFilterActive(e.target.value);
    setCurrentPage(1);
  };

  const handleSort = (field) => {
    const direction = sortField === field && sortDirection === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortDirection(direction);
  };

  const handleDeleteClick = (user) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer ${user.firstName} ${user.lastName} ?`)) {
      confirmDelete(user._id);
    }
  };

  const confirmDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:3000/api/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toast.success("Utilisateur supprimé avec succès.");
      fetchUsers();
    } catch (err) {
      console.error("Erreur lors de la suppression de l'utilisateur :", err);
      toast.error("Erreur lors de la suppression de l'utilisateur.");
    }
  };

  // Filtrage des utilisateurs selon la recherche et le statut actif/inactif
  const filteredUsers = users.filter(user => {
    const matchesSearch =
      user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      filterActive === "all" ||
      (filterActive === "active" && user.active) ||
      (filterActive === "inactive" && !user.active);
    return matchesSearch && matchesFilter;
  });

  // Tri des utilisateurs
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (!sortField) return 0;
    let fieldA = a[sortField];
    let fieldB = b[sortField];

    if (sortField === "createdAt") {
      fieldA = new Date(fieldA);
      fieldB = new Date(fieldB);
    } else {
      fieldA = fieldA.toString().toLowerCase();
      fieldB = fieldB.toString().toLowerCase();
    }

    if (fieldA < fieldB) return sortDirection === "asc" ? -1 : 1;
    if (fieldA > fieldB) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  // Calcul de la pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = sortedUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedUsers.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Données pour les graphiques
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];
  const roleData = Object.keys(stats.roles).map((role, index) => ({
    name: role,
    value: stats.roles[role],
    color: COLORS[index % COLORS.length],
  }));
  const registrationData = Object.keys(stats.registrationsByMonth).map((month) => ({
    month,
    count: stats.registrationsByMonth[month],
  }));

  return (
    <div className="AdminCours">
      <Sidebar />
      <section className="admin-container">
        <h1>Gestion des Utilisateurs</h1>
        {/* Barre de recherche et filtre */}
        <div className="filter-container">
          <input
            type="text"
            placeholder="Rechercher par nom ou email..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-input"
          />
          <select value={filterActive} onChange={handleFilterChange} className="filter-select">
            <option value="all">Tous</option>
            <option value="active">Actifs</option>
            <option value="inactive">Inactifs</option>
          </select>
        </div>
        {/* Indicateur de chargement et messages d'erreur */}
        {loading && <p>Chargement des utilisateurs...</p>}
        {error && <p className="error-message">{error}</p>}
        <div className="stats-container">
          <Card className="stat-card">
            <CardContent>
              <h3>Total Utilisateurs</h3>
              <p>{users.length}</p>
            </CardContent>
          </Card>
          <Card className="stat-card">
            <CardContent>
              <h3>Utilisateurs Actifs</h3>
              <p>{stats.activeUsers}</p>
            </CardContent>
          </Card>
          <Card className="stat-card">
            <CardContent>
              <h3>Utilisateurs Inactifs</h3>
              <p>{stats.inactiveUsers}</p>
            </CardContent>
          </Card>
        </div>
        <div className="charts-container">
          <div className="chart">
            <h3>Répartition des Rôles</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={roleData} dataKey="value" nameKey="name" outerRadius={80} label>
                  {roleData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="chart">
            <h3>Inscriptions par Mois</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={registrationData}>
                <XAxis dataKey="month" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Line type="monotone" dataKey="count" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* Liste des utilisateurs */}
        <Table>
          <TableHead>
            <TableRow>
              <TableCell onClick={() => handleSort("firstName")}>Prénom</TableCell>
              <TableCell onClick={() => handleSort("lastName")}>Nom</TableCell>
              <TableCell onClick={() => handleSort("email")}>Email</TableCell>
              <TableCell onClick={() => handleSort("role")}>Rôle</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentUsers.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Button onClick={() => handleDeleteClick(user)} className="btn-danger">
                    Supprimer
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {/* Pagination */}
        <div className="pagination-container">
          <Button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            Précédent
          </Button>
          <span>
            Page {currentPage} sur {totalPages}
          </span>
          <Button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
            Suivant
          </Button>
        </div>
      </section>
      <ToastContainer />
    </div>
  );
};

export default AdminUser;
