import React, { useState, useEffect } from "react";
import Card from "../Card";
import CreeCours from "../Teacher/CreeCours";
import "../../Css/dash/AdminCours.css";
import Modal from "react-modal";
import Sidebar from "./Sidebar";
import AdminCoursSection2 from "./AdminCoursSection2";

Modal.setAppElement("#root");

function AdminCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("Tous"); // "Tous", "En attente", "Validé", "Refusé"
  const [selectedCourses, setSelectedCourses] = useState(new Set());
  const [editingCourse, setEditingCourse] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 6; 
  const [previewCourse, setPreviewCourse] = useState(null);
  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const res = await fetch("http://localhost:3000/api/courses");
        if (!res.ok) throw new Error("Erreur lors du chargement");
        const data = await res.json();
        setCourses(data);
      } catch (error) {
        console.error("Erreur:", error);
        setErrorMessage("Une erreur s'est produite lors du chargement des cours.");
      } finally {
        setLoading(false);
      }
    }
    fetchCourses();
  }, []);

  const handleCourseSaved = (data) => {
    const updatedCourse = data.course || data;
    if (editingCourse) {
      setCourses((prev) =>
        prev.map((course) =>
          course._id === updatedCourse._id ? updatedCourse : course
        )
      );
      setSuccessMessage("Cours modifié avec succès !");
    } else {
      setCourses((prev) => [...prev, updatedCourse]);
      setSuccessMessage("Cours créé avec succès !");
    }
    setShowForm(false);
    setEditingCourse(null);
  };

  const handleDelete = async (courseId) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce cours ?")) return;
    try {
      const res = await fetch(`http://localhost:3000/api/courses/${courseId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Erreur de suppression");
      setCourses((prev) => prev.filter((course) => course._id !== courseId));
      setSuccessMessage("Cours supprimé avec succès !");
    } catch (error) {
      console.error("Erreur de suppression:", error);
      setErrorMessage("Une erreur s'est produite lors de la suppression du cours.");
    }
  };

  const handleBatchDelete = async () => {
    if (selectedCourses.size === 0) {
      alert("Veuillez sélectionner au moins un cours à supprimer.");
      return;
    }
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer les cours sélectionnés ?"))
      return;
    try {
      for (let courseId of selectedCourses) {
        const res = await fetch(`http://localhost:3000/api/courses/${courseId}`, {
          method: "DELETE",
        });
        if (!res.ok) throw new Error("Erreur lors de la suppression par lot");
      }
      setCourses((prev) => prev.filter((course) => !selectedCourses.has(course._id)));
      setSelectedCourses(new Set());
      setSuccessMessage("Cours sélectionnés supprimés avec succès !");
    } catch (error) {
      console.error("Erreur de suppression par lot:", error);
      setErrorMessage("Une erreur s'est produite lors de la suppression des cours sélectionnés.");
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleFilterStatus = (e) => {
    setFilterStatus(e.target.value);
    setCurrentPage(1);
  };

  const filteredCourses = courses.filter((course) => {
    const matchSearch = course.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = filterStatus === "Tous" || course.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const toggleCourseSelection = (courseId) => {
    const newSelected = new Set(selectedCourses);
    newSelected.has(courseId) ? newSelected.delete(courseId) : newSelected.add(courseId);
    setSelectedCourses(newSelected);
  };

  const handleExportCSV = () => {
    const header = ["ID", "Nom", "Domaine", "NbMicroCour", "Status"];
    const rows = filteredCourses.map((course) => [
      course._id,
      course.name,
      course.domaine,
      course.NbMicroCour,
      course.status || "N/A",
    ]);
    const csvContent =
      "data:text/csv;charset=utf-8," +
      header.join(",") +
      "\n" +
      rows.map((e) => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "courses_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const openPreview = (course) => setPreviewCourse(course);
  const closePreview = () => setPreviewCourse(null);

  return (
    <div>
      <div className="AdminCours">
      <Sidebar />
      <section className="AdminCoursSection">
        <div className="adminHeader">
          <h2>Administration des Cours</h2>
          <div className="headerButtons">
            <button
              className="newCourseBtn"
              onClick={() => {
                setShowForm(!showForm);
                setEditingCourse(null);
              }}
            >
              {showForm ? "Fermer" : "Créer un Nouveau Cours"}
            </button>
            <button className="helpBtn" onClick={() => setShowHelp(!showHelp)}>
              Aide
            </button>
          </div>
        </div>
        {successMessage && <div className="successMsg">{successMessage}</div>}
        {errorMessage && <div className="errorMsg">{errorMessage}</div>}
        {showHelp && (
          <div className="helpPanel">
            <h3>Aide et Assistance</h3>
            <ul>
              <li>Utilisez la barre de recherche pour filtrer les cours par nom.</li>
              <li>Utilisez le filtre de statut pour afficher les cours par état (Tous, En attente, Validé, Refusé).</li>
              <li>Sélectionnez plusieurs cours via les cases à cocher pour supprimer en lot.</li>
              <li>Cliquez sur "Aperçu" pour visualiser les détails d'un cours.</li>
              <li>Utilisez "Exporter CSV" pour télécharger la liste des cours filtrés.</li>
              <li>Les boutons "Valider", "Refuser" et "Modification" permettent de gérer l'état des cours.</li>
            </ul>
          </div>
        )}
        {showForm && (
          <CreeCours
            onCourseCreated={handleCourseSaved}
            initialCourse={editingCourse}
            teacherId={localStorage.getItem("teacherId")}
          />
        )}
        <div className="filters">
          <input
            type="text"
            placeholder="Rechercher un cours"
            value={searchQuery}
            onChange={handleSearch}
          />
          <select value={filterStatus} onChange={handleFilterStatus}>
            <option value="Tous">Tous</option>
            <option value="En attente">En attente</option>
            <option value="Validé">Validé</option>
            <option value="Refusé">Refusé</option>
          </select>
          <button onClick={handleExportCSV}>Exporter CSV</button>
          {selectedCourses.size > 0 && (
            <button onClick={handleBatchDelete}>
              Supprimer la sélection ({selectedCourses.size})
            </button>
          )}
        </div>
        {loading ? (
          <div className="loading">Chargement...</div>
        ) : (
          <div>
            <div className="courseGrid">
              {currentCourses.length === 0 ? (
                <div>Aucun cours trouvé.</div>
              ) : (
                currentCourses.map((course) => {
                  const imageUrl =
                    course.image && course.image.startsWith("http")
                      ? course.image
                      : `http://localhost:3000${course.image}`;
                  return (
                    <div key={course._id} className="courseCard">
                        
                      <input
                        type="checkbox"
                        checked={selectedCourses.has(course._id)}
                        onChange={() => toggleCourseSelection(course._id)}
                      />
                      <br></br>
                          <button className="actionBtn validateBtn">Valider</button>
                          <button className="actionBtn refuseBtn">Refuser</button>
                          <button className="actionBtn requestBtn">Modifier  </button>
                      <Card
                      
                        image={imageUrl}
                        title={course.name}
                        instructor={{ name: course.domaine }}
                        progress={course.NbMicroCour}
                        lesson={`${course.NbMicroCour} Micro-Cours`}
                        
                      />
                      <div className="courseActions">
                        <button
                          onClick={() => {
                            setEditingCourse(course);
                            setShowForm(true);
                          }}
                          className="actionBtn modifyBtn"
                        >
                          Modifier
                        </button>
                        <button
                          onClick={() => handleDelete(course._id)}
                          className="actionBtn deleteBtn"
                        >
                          Supprimer
                        </button>
                        <button
                          onClick={() => openPreview(course)}
                          className="actionBtn previewBtn"
                        >
                          Aperçu
                        </button>
                       
                      </div>
                    </div>
                  );
                })
              )}
            </div>
            <div className="pagination">
              <button onClick={handlePrev} disabled={currentPage === 1}>
                Précédent
              </button>
              <span>
                {currentPage} / {totalPages}
              </span>
              <button onClick={handleNext} disabled={currentPage === totalPages}>
                Suivant
              </button>
            </div>
          </div>
        )}
        <Modal
          isOpen={!!previewCourse}
          onRequestClose={closePreview}
          contentLabel="Aperçu du cours"
          className="previewModal"
          overlayClassName="previewOverlay"
        >
          {previewCourse && (
            <div className="modalContent">
              <h2>{previewCourse.name}</h2>
              <img
                src={
                  previewCourse.image && previewCourse.image.startsWith("http")
                    ? previewCourse.image
                    : `http://localhost:3000${previewCourse.image}`
                }
                alt={previewCourse.name}
                className="previewImage"
              />
              <p>Domaine: {previewCourse.domaine}</p>
              <p>Nombre de Micro-Cours: {previewCourse.NbMicroCour}</p>
              <p>Status: {previewCourse.status || "N/A"}</p>
              <button onClick={closePreview} className="closeModalBtn">
                Fermer
              </button>
            </div>
          )}
        </Modal>
      </section>
    </div>
    <AdminCoursSection2/>
    </div>
  );
}

export default AdminCourses;
