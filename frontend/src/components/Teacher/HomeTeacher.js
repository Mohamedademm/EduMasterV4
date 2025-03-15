import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../Css/Teacher/HomeTeacher.css";
import { FaChalkboardTeacher, FaBook, FaCalendarAlt, FaBell, FaUserGraduate, FaTools } from "react-icons/fa";

const HomeTeacher = () => {
  const [courses, setCourses] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [stats, setStats] = useState({ students: 0, exams: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    // Récupération des cours depuis l'API
    fetch("http://localhost:3000/api/courses")
      .then((response) => response.json())
      .then((data) => setCourses(data))
      .catch((error) => console.error("Erreur lors du chargement des cours :", error));

    // Notifications et stats simulées
    setNotifications([
      "Nouvel examen prévu pour la semaine prochaine",
      "Correction des copies terminée pour le cours de Math",
    ]);
    setStats({ students: 120, exams: 5 });
  }, []);

  return (
    <div className="home-teacher">
      <header className="header">
        <h1>Bienvenue, Professeur !</h1>
        <p>Gérez vos cours, évaluations et étudiants facilement.</p>
      </header>

      <section className="evaluations">
        <div className="card">
          <FaUserGraduate className="icon" />
          <h2>Étudiants</h2>
          <p>{stats.students} inscrits</p>
        </div>
        <div className="card">
          <FaCalendarAlt className="icon" />
          <h2>Évaluations</h2>
          <p>{stats.exams} à venir</p>
        </div>
      </section>

      <section className="courses">
        <h2>Vos Cours</h2>
        <div className="course-list">
          {courses.length === 0 ? (
            <p>Aucun cours disponible.</p>
          ) : (
            courses.map((course) => (
              <div key={course._id} className="course-cardHomeTeacher">
                <FaBook className="course-icon" />
                <h3>{course.name}</h3>
                <p>Progression : {course.NbMicroCour}%</p>
                <div className="progress-bar">
                  <div className="progress" style={{ width: `${course.NbMicroCour}%` }}></div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <section className="notificationsHomeTeacher">
        <h2>Notifications</h2>
        <ul>
          {notifications.map((notif, index) => (
            <li key={index}>
              <FaBell className="notif-icon" /> {notif}
            </li>
          ))}
        </ul>
      </section>

      <section className="quick-access">
        <h2>Accès Rapide</h2>
        <div className="buttons">
          <button className="btnHomeTeacher" onClick={() => navigate("/courses")}>
            <FaChalkboardTeacher /> Gérer Cours
          </button>
          <button className="btnHomeTeacher">
            <FaCalendarAlt /> Planifier Évaluations
          </button>
          <button className="btnHomeTeacher">
            <FaTools /> Support Technique
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomeTeacher;
