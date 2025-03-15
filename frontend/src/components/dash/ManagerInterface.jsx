import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import '../../Css/dash/ManagerInterface.css';
import DHeader from './D_Header';
import DSidebar from './D_Sidebar';

const ManagerInterface = () => {
  
  const [openSidebar, setOpenSidebar] = useState(false);
  const managerId = '6740f2b9c2932e9eadd97f73';
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({ cin: '', level: '' });
  const [editStudent, setEditStudent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch students
  const fetchStudents = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:3000/api/${managerId}/getData/students`);
      setStudents(response.data.map(student => ({
        firstName: student.firstName,
        lastName: student.lastName,
        CIN: student.CIN,
        level: student.level,
      })));
    } catch (err) {
      console.error('Error fetching students:', err);
      setError('Erreur lors de la récupération des étudiants.');
    } finally {
      setLoading(false);
    }
  }, [managerId]);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  // Add new student
  const handleAddStudent = async () => {
    if (!newStudent.cin || !newStudent.level) {
      setError('Veuillez remplir tous les champs.');
      return;
    }

    try {
      await axios.post(`http://localhost:3000/api/${managerId}/addValidStudents`, {
        validStudentCINs: [{ cin: newStudent.cin, level: newStudent.level }],
      });
      setSuccess('Étudiant ajouté avec succès !');
      fetchStudents();
      setNewStudent({ cin: '', level: '' });
    } catch (err) {
      console.error('Error adding student:', err);
      setError('Erreur lors de l\'ajout de l\'étudiant.');
    }
  };

  // Update student
  const handleUpdateStudent = async () => {
    if (!editStudent.cin || !editStudent.level) {
      setError('Veuillez remplir tous les champs.');
      return;
    }

    try {
      await axios.put(`http://localhost:3000/api/${managerId}/updateValidStudents/${editStudent.originalCin}`, {
        cin: editStudent.cin,
        level: editStudent.level,
      });
      setSuccess('Étudiant modifié avec succès !');
      fetchStudents();
      setEditStudent(null);
    } catch (err) {
      console.error('Error updating student:', err);
      setError('Erreur lors de la modification de l\'étudiant.');
    }
  };

  // Edit mode handler
  const handleEdit = (student) => {
    setEditStudent({ originalCin: student.CIN, cin: student.CIN, level: student.level });
  };

  // Cancel edit mode
  const handleCancelEdit = () => {
    setEditStudent(null);
  };

  const toggleSidebar = () => {
    setOpenSidebar(!openSidebar);
  };

  const closeSidebar = () => {
    setOpenSidebar(false);
  };

  return (
    <div className="manager-interface-container">
      <DSidebar openSidebar={openSidebar} closeSidebar={closeSidebar} />
      <div className="manager-content-container">
        <DHeader adminName="Admin Name" onToggleSidebar={toggleSidebar} avatarUrl="/static/images/avatar/1.jpg" />

        <h2 className="manager-header-title">Interface de Gestion des CIN des Étudiants</h2>

        <div className="manager-form-container manager-card">
          <h3>Ajouter CIN Étudiant</h3>
          <div className="manager-form-group">
            <input
              type="text"
              placeholder="CIN Étudiant"
              value={newStudent.cin}
              onChange={(e) => setNewStudent({ ...newStudent, cin: e.target.value })}
              className="manager-input-field"
            />
            <input
              type="text"
              placeholder="Niveau Étudiant"
              value={newStudent.level}
              onChange={(e) => setNewStudent({ ...newStudent, level: e.target.value })}
              className="manager-input-field"
            />
            <button onClick={handleAddStudent} className="manager-submit-btn">
              Ajouter à la liste
            </button>
          </div>
          {error && <div className="manager-error-message">{error}</div>}
          {success && <div className="manager-success-message">{success}</div>}
        </div>

        {loading ? (
          <p>Chargement des étudiants...</p>
        ) : (
          <div className="manager-table-container manager-card">
            <h3>Liste des Étudiants</h3>
            <table className="manager-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nom</th>
                  <th>Prénom</th>
                  <th>CIN</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <tr key={student.CIN}>
                    <td>{index + 1}</td>
                    <td>{student.firstName}</td>
                    <td>{student.lastName}</td>
                    <td>{student.CIN}</td>
                    <td>
                      <button onClick={() => handleEdit(student)} className="manager-edit-btn">
                        Modifier
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {editStudent && (
          <div className="manager-edit-container manager-card">
            <h3>Modifier Étudiant</h3>
            <div className="manager-form-group">
              <input
                type="text"
                placeholder="CIN Étudiant"
                value={editStudent.cin}
                onChange={(e) => setEditStudent({ ...editStudent, cin: e.target.value })}
                className="manager-input-field"
              />
              <input
                type="text"
                placeholder="Niveau Étudiant"
                value={editStudent.level}
                onChange={(e) => setEditStudent({ ...editStudent, level: e.target.value })}
                className="manager-input-field"
              />
              <button onClick={handleUpdateStudent} className="manager-submit-btn">
                Modifier
              </button>
              <button onClick={handleCancelEdit} className="manager-cancel-btn">
                Annuler
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManagerInterface;
