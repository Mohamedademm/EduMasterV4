import React, { useState, useEffect } from "react";
import "../../Css/Teacher/CreeCours.css";

const CreeCours = ({ onCourseCreated, initialCourse, teacherId }) => {
  const [courseName, setCourseName] = useState("");
  const [courseImage, setCourseImage] = useState(null);
  const [courseDescription, setCourseDescription] = useState("");
  const [courseNbMicroCour, setCourseNbMicroCour] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (initialCourse) {
      setCourseName(initialCourse.name);
      setCourseDescription(initialCourse.domaine);
      setCourseNbMicroCour(initialCourse.NbMicroCour);
      setImagePreview(initialCourse.image);
    }
  }, [initialCourse]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setCourseImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !courseName ||
      !courseDescription ||
      (!courseImage && !initialCourse) ||
      courseNbMicroCour === ""
    ) {
      alert("Veuillez remplir tous les champs avant de soumettre le cours.");
      return;
    }

    if (!teacherId) {
      alert("ID du professeur manquant.");
      return;
    }

    const formData = new FormData();
    if (courseImage) {
      formData.append("image", courseImage);
    }
    formData.append("name", courseName);
    formData.append("domaine", courseDescription);
    formData.append("NbMicroCour", Number(courseNbMicroCour));
    formData.append("teacher", teacherId);

    try {
      let url = "http://localhost:3000/api/courses";
      let method = "POST";
      if (initialCourse) {
        url = `http://localhost:3000/api/courses/${initialCourse._id}`;
        method = "PUT";
      }

      const response = await fetch(url, {
        method,
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        onCourseCreated(data);
        alert(initialCourse ? "Cours modifié avec succès !" : "Cours créé avec succès !");
      } else {
        console.error("Erreur backend:", data);
        alert("Erreur lors de la soumission du cours. Veuillez réessayer.");
      }
    } catch (error) {
      console.error("Erreur lors de la requête:", error);
      alert("Une erreur est survenue. Veuillez vérifier votre connexion.");
    }
  };

  const handleReset = () => {
    setCourseName("");
    setCourseDescription("");
    setCourseImage(null);
    setImagePreview(null);
    setCourseNbMicroCour("");
  };

  const handleSaveDraft = () => {
    localStorage.setItem(
      "draftCourse",
      JSON.stringify({
        courseName,
        courseDescription,
        courseImage: imagePreview,
        courseNbMicroCour,
      })
    );
    alert("Brouillon enregistré !");
  };

  return (
    <div className="create-course-containerCreeC">
      <h1>{initialCourse ? "Modifier le Cours" : "Créer un Nouveau Cours"}</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-groupCreeC">
          <label>Nom du Cours</label>
          <input
            type="text"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            required
          />
        </div>

        <div className="input-groupCreeC">
          <label>Image du Cours</label>
          <input
            type="file"
            name="image"
            onChange={handleImageUpload}
            required={!initialCourse}
          />
          {imagePreview && (
            <img src={imagePreview} alt="Aperçu" className="imagePreview" />
          )}
        </div>

        <div className="input-groupCreeC">
          <label>Description du Cours</label>
          <input
            type="text"
            value={courseDescription}
            onChange={(e) => setCourseDescription(e.target.value)}
            required
          />
        </div>

        <div className="input-groupCreeC">
          <label>Nombre de Micro-Cours</label>
          <input
            type="number"
            value={courseNbMicroCour}
            onChange={(e) => setCourseNbMicroCour(e.target.value)}
            required
          />
        </div>

        <button type="submit">
          {initialCourse ? "Modifier le Cours" : "Créer le Cours"}
        </button>
        <button type="button" onClick={handleReset}>
          Réinitialiser
        </button>
        <button type="button" onClick={handleSaveDraft}>
          Sauvegarder comme Brouillon
        </button>
      </form>
    </div>
  );
};

export default CreeCours;
