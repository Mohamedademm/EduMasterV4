import React, { useState, useEffect } from 'react';
import '../../Css/Teacher/CoursTeacher.css';

// Fake data for courses
const initialCourses = [
  { id: 1, name: "Mathematics", description: "Advanced mathematics course", schedule: "Monday & Wednesday, 10:00 AM", content: [], quiz: [], comments: [] },
  { id: 2, name: "Science", description: "Basic science course", schedule: "Tuesday & Thursday, 12:00 PM", content: [], quiz: [], comments: [] },
];

const CoursTeacher = () => {
  const [courses, setCourses] = useState(initialCourses);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [newCourse, setNewCourse] = useState({
    name: '',
    description: '',
    schedule: '',
  });
  const [file, setFile] = useState(null);
  const [newQuiz, setNewQuiz] = useState('');
  const [newComment, setNewComment] = useState('');

  // Open modal for adding/editing course
  const handleModalOpen = (course = null) => {
    setSelectedCourse(course);
    setNewCourse(course ? course : { name: '', description: '', schedule: '' });
    setIsModalOpen(true);
  };

  // Close modal
  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedCourse(null);
  };

  // Handle course form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedCourse) {
      // Update course
      const updatedCourses = courses.map(course => 
        course.id === selectedCourse.id ? { ...selectedCourse, ...newCourse, content: selectedCourse.content, quiz: selectedCourse.quiz, comments: selectedCourse.comments } : course
      );
      setCourses(updatedCourses);
    } else {
      // Add new course
      const newCourseWithId = { ...newCourse, id: courses.length + 1, content: [], quiz: [], comments: [] };
      setCourses([...courses, newCourseWithId]);
    }
    handleModalClose();
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCourse({ ...newCourse, [name]: value });
  };

  // Handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
    }
  };

  // Handle quiz addition
  const handleQuizChange = (e) => {
    setNewQuiz(e.target.value);
  };

  const handleAddQuiz = () => {
    if (newQuiz) {
      const updatedCourses = courses.map(course => 
        course.id === selectedCourse.id ? { ...course, quiz: [...course.quiz, newQuiz] } : course
      );
      setCourses(updatedCourses);
      setNewQuiz('');
    }
  };

  // Handle comment addition
  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleAddComment = () => {
    if (newComment) {
      const updatedCourses = courses.map(course => 
        course.id === selectedCourse.id ? { ...course, comments: [...course.comments, newComment] } : course
      );
      setCourses(updatedCourses);
      setNewComment('');
    }
  };

  // Handle course deletion
  const handleDeleteCourse = (id) => {
    setCourses(courses.filter(course => course.id !== id));
  };


  // État pour suivre les étudiants
const [students, setStudents] = useState([
    { id: 1, name: "Ali", completedModules: [1, 2], messages: [] },
    { id: 2, name: "Sara", completedModules: [1], messages: [] }
  ]);
  
  // Fonction pour envoyer un message à un étudiant
  const handleSendMessage = (studentId, message) => {
    setStudents(students.map(student => 
      student.id === studentId ? { ...student, messages: [...student.messages, message] } : student
    ));
  };
  
  // Fonction pour marquer un module comme complété par un étudiant
  const handleModuleCompletion = (studentId, moduleId) => {
    setStudents(students.map(student => 
      student.id === studentId && !student.completedModules.includes(moduleId) 
        ? { ...student, completedModules: [...student.completedModules, moduleId] } 
        : student
    ));
  };
  

  // État pour les recommandations d'IA et les badges
const [recommendations, setRecommendations] = useState([]);
const [badges, setBadges] = useState([]);

// Fonction pour générer des recommandations d'IA
const generateRecommendations = (courseId) => {
  // Simuler des recommandations basées sur les cours suivis
  setRecommendations([
    "Lire le chapitre 3 pour approfondir les concepts",
    "Visionner la vidéo sur les applications pratiques"
  ]);
};

// Fonction pour ajouter un badge à un étudiant
const addBadgeToStudent = (studentId, badge) => {
  setBadges([...badges, { studentId, badge }]);
};


// État pour les évaluations des étudiants
const [ratings, setRatings] = useState([]);
const [feedbacks, setFeedbacks] = useState([]);

// Fonction pour ajouter un avis
const handleAddRating = (courseId, rating) => {
  setRatings([...ratings, { courseId, rating }]);
};

// Fonction pour ajouter un commentaire sur le cours
const handleAddFeedback = (courseId, feedback) => {
  setFeedbacks([...feedbacks, { courseId, feedback }]);
};


return (
  <div className="cours-teacher-container-CoursTeacher">
    <header>
      <h1>Gestion des Cours</h1>
      <button onClick={() => handleModalOpen()} className="btn-add-course-CoursTeacher">
        Ajouter un Cours
      </button>
    </header>

    <section className="course-list-CoursTeacher">
      {courses.map(course => (
        <div key={course.id} className="course-card-CoursTeacher">
          <h3>{course.name}</h3>
          <p>{course.description}</p>
          <p>
            <strong>Planning:</strong> {course.schedule}
          </p>

          {/* Affichage du contenu téléchargé */}
          <div className="course-content-CoursTeacher">
            <h4>Contenu :</h4>
            {course.content.length > 0 ? (
              course.content.map((file, index) => <div key={index}>{file.name}</div>)
            ) : (
              <p>Aucun contenu disponible.</p>
            )}
          </div>

          {/* Affichage des quiz */}
          <div className="course-quiz-CoursTeacher">
            <h4>Quiz :</h4>
            {course.quiz.length > 0 ? (
              course.quiz.map((quiz, index) => <div key={index}>{quiz}</div>)
            ) : (
              <p>Aucun quiz disponible.</p>
            )}
          </div>

          {/* Affichage des commentaires */}
          <div className="course-comments-CoursTeacher">
            <h4>Commentaires :</h4>
            {course.comments.length > 0 ? (
              course.comments.map((comment, index) => <div key={index}>{comment}</div>)
            ) : (
              <p>Aucun commentaire.</p>
            )}
          </div>

          <div className="course-actions-CoursTeacher">
            <button onClick={() => handleModalOpen(course)} className="btn-edit-CoursTeacher">
              Modifier
            </button>
            <button onClick={() => handleDeleteCourse(course.id)} className="btn-delete-CoursTeacher">
              Supprimer
            </button>
          </div>
        </div>
      ))}
    </section>

    {isModalOpen && (
      <div className="modal-CoursTeacher">
        <div className="modal-content-CoursTeacher">
          <h2>{selectedCourse ? "Modifier le Cours" : "Ajouter un Cours"}</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-groupT-CoursTeacher">
              <label htmlFor="name">Nom du Cours</label>
              <input
                type="text"
                id="name"
                name="name"
                value={newCourse.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-groupT-CoursTeacher">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={newCourse.description}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-groupT-CoursTeacher">
              <label htmlFor="schedule">Emploi du Temps</label>
              <input
                type="text"
                id="schedule"
                name="schedule"
                value={newCourse.schedule}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Téléchargement d'un fichier */}
            <div className="form-groupT-CoursTeacher">
              <label htmlFor="file">Télécharger un fichier</label>
              <input type="file" id="file" onChange={handleFileChange} />
            </div>

            {/* Section Quiz */}
            <div className="form-groupT-CoursTeacher">
              <label htmlFor="quiz">Ajouter un Quiz</label>
              <input
                type="text"
                id="quiz"
                value={newQuiz}
                onChange={handleQuizChange}
              />
              <button type="button" onClick={handleAddQuiz}>
                Ajouter Quiz
              </button>
            </div>

            {/* Section Commentaire */}
            <div className="form-groupT-CoursTeacher">
              <label htmlFor="comment">Ajouter un Commentaire</label>
              <textarea
                id="comment"
                value={newComment}
                onChange={handleCommentChange}
              />
              <button type="button" onClick={handleAddComment}>
                Ajouter Commentaire
              </button>
            </div>

            <div className="modal-actions-CoursTeacher">
              <button type="submit" className="btn-submit-CoursTeacher">
                {selectedCourse ? "Mettre à jour" : "Ajouter"}
              </button>
              <button type="button" onClick={handleModalClose} className="btn-cancel-CoursTeacher">
                Annuler
              </button>
            </div>
          </form>
        </div>
      </div>
    )}
  </div>
);

};

export default CoursTeacher;
