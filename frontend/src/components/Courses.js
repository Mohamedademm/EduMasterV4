// Courses.js
import React, { useState, useEffect } from "react";
import Card from "./Card";
import CreeCours from "./Teacher/CreeCours";
import "../Css/Courses.css";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [editingCourse, setEditingCourse] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 6;

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

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const filteredCourses = courses.filter((course) =>
    course.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

  const handleConsult = (course) => {
    localStorage.setItem("courseId", course._id);
    window.location.href = "/CreeTecherMicroCours";
  };

  return (
    <section className="courseSectionCS">
      <div className="headerCS">
        <h2 className="titleCS">Welcome back, ready for your next lesson?</h2>
        <button
          className="newCours"
          onClick={() => {
            setShowForm(!showForm);
            setEditingCourse(null);
          }}
        >
          {showForm ? "Fermer" : "Créer un Nouveau Cours"}
        </button>
      </div>

      {successMessage && <div className="success">{successMessage}</div>}
      {errorMessage && <div className="error">{errorMessage}</div>}

      {showForm && (
        <CreeCours
          onCourseCreated={handleCourseSaved}
          initialCourse={editingCourse}
          teacherId={localStorage.getItem("teacherId")}
        />
      )}

      <div className="searchContainer">
        <input
          type="text"
          placeholder="Rechercher un cours"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      {loading ? (
        <div className="loading">Chargement...</div>
      ) : (
        <div>
          <div
            className="courseListCS"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "1rem",
            }}
          >
            {currentCourses.length === 0 ? (
              <div>Aucun cours trouvé.</div>
            ) : (
              currentCourses.map((course) => {
                const imageUrl =
                  course.image && course.image.startsWith("http")
                    ? course.image
                    : `http://localhost:3000${course.image}`;
                return (
                  <div key={course._id} className="courseCardCourse">
                    <Card
                      image={imageUrl}
                      title={course.name}
                      instructor={{ name: course.domaine }}
                      progress={course.NbMicroCour}
                      lesson={`${course.NbMicroCour} Micro-Cours`}
                    />
                    <div className="boutonCRUD">
                    <button
                      onClick={() => {
                        setEditingCourse(course);
                        setShowForm(true);
                      }}
                    >
                      Modifier
                    </button>
                    <button onClick={() => handleDelete(course._id)}>
                      Supprimer
                    </button>
                    <button onClick={() => handleConsult(course)}>
                      Consulter
                    </button>
                    </div>
                    
                  </div>
                );
              })
            )}
          </div>
      

          <div class="button-container">
            <button onClick={handlePrev} disabled={currentPage === 1} class="button-3d">
              <div class="button-top">
                <span class="material-icons">❮</span>
              </div>
              <div class="button-bottom"></div>
              <div class="button-base"></div>
            </button>
            <span>
              {currentPage} / {totalPages}
            </span>
            <button onClick={handleNext} disabled={currentPage === totalPages} class="button-3d">
              <div class="button-top">
                <span  class="material-icons">❯</span>
              </div>
              <div class="button-bottom"></div>
              <div class="button-base"></div>
            </button>
          </div>

        </div>

      )}
    </section>
  );
}

export default Courses;
