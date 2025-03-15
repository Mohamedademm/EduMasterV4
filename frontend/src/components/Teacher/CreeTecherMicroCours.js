import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../Css/Teacher/CreeTecherMicroCours.css";

const CreeTecherMicroCours = () => {
  const [microCourses, setMicroCourses] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [selectedType, setSelectedType] = useState("text");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);  
  const courseId = localStorage.getItem("courseId");

  // Charger les micro-cours associés au courseId
  useEffect(() => {
    if (courseId) {
      axios
        .get("http://localhost:3000/api/micro-courses")
        .then((response) => {
          const filteredCourses = response.data.filter(mc => mc.course === courseId);
          setMicroCourses(filteredCourses);
          if (filteredCourses.length > 0) {
            setSelectedCourse(filteredCourses[0]);  // Afficher le premier micro-cours par défaut
          }
        })
        .catch((error) => console.error("Erreur de récupération :", error));
    }
  }, [courseId]);

  // Gérer le changement de fichier
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Fonction pour ajouter un micro-cours
  const handleAddMicroCourse = async () => {
    try {
      let uploadedContent = content;

      // Si ce n'est pas du texte et qu'il y a un fichier, on l'upload
      if (selectedType !== "text" && file) {
        const formData = new FormData();
        formData.append("file", file);

        // Envoie du fichier au serveur
        const uploadResponse = await axios.post("http://localhost:3000/api/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        // Récupérer l'URL du fichier téléchargé
        if (uploadResponse.data && uploadResponse.data.url) {
          uploadedContent = uploadResponse.data.url;
        } else {
          console.error("Erreur de téléchargement du fichier");
          return;
        }
      }

      // Créer le micro-cours
      const newMicroCourse = {
        course: courseId,
        title: newTitle,
        contentType: selectedType,
        content: uploadedContent,
      };

      // Envoi de la requête pour créer le micro-cours
      const response = await axios.post("http://localhost:3000/api/micro-courses", newMicroCourse);

      // Ajouter le nouveau micro-cours à la liste
      setMicroCourses([...microCourses, response.data.microCourse]);

      // Réinitialiser les champs du formulaire
      setNewTitle("");
      setSelectedType("text");
      setContent("");
      setFile(null);
    } catch (error) {
      console.error("Erreur lors de l'ajout du micro-cours :", error);
    }
  };

  // Sélectionner un micro-cours et afficher son contenu
  const handleSelectMicroCourse = (course) => {
    setSelectedCourse(course);
  };

  return (
    <div className="creeMicroCours">
      <div className="sidebar">
        <h3>Liste des Micro-Cours</h3>
        {microCourses.length > 0 ? (
          microCourses.map((course) => (
            <div
              key={course._id}
              className={`microCourseItem ${selectedCourse && selectedCourse._id === course._id ? "selected" : ""}`}
              onClick={() => handleSelectMicroCourse(course)}
            >
              {course.title}
            </div>
          ))
        ) : (
          <p>Aucun micro-cours ajouté.</p>
        )}
      </div>

      <div className="microCourseContent">
        {selectedCourse ? (
          <>
            <h3>{selectedCourse.title}</h3>
            <p><strong>Type :</strong> {selectedCourse.contentType}</p>
            {selectedCourse.contentType === "text" ? (
              <p>{selectedCourse.content}</p>
            ) : (
              selectedCourse.content ? (
                <a href={selectedCourse.content} target="_blank" rel="noopener noreferrer">Voir le fichier</a>
              ) : (
                <p>Aucun fichier disponible.</p>
              )
            )}
          </>
        ) : (
          <p>Sélectionnez un micro-cours pour voir le contenu.</p>
        )}
      </div>

      <div className="newMicroCourse">
        <h3>Ajouter un nouveau Micro-Cours</h3>
        <div className="formGroup">
          <label>Titre du Micro-Cours</label>
          <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
        </div>

        <div className="formGroup">
          <label>Type de contenu</label>
          <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
            <option value="text">Texte</option>
            <option value="pdf">PDF</option>
            <option value="video">Vidéo</option>
            <option value="image">Image</option>
          </select>
        </div>

        {selectedType === "text" ? (
          <div className="formGroup">
            <label>Contenu (Texte)</label>
            <textarea value={content} onChange={(e) => setContent(e.target.value)} />
          </div>
        ) : (
          <div className="formGroup">
            <label>Ajouter un fichier</label>
            <input type="file" onChange={handleFileChange} />
          </div>
        )}

        <button onClick={handleAddMicroCourse}>Ajouter</button>
      </div>
    </div>
  );
};

export default CreeTecherMicroCours;
