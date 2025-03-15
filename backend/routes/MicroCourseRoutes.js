const express = require("express");
const MicroCourse = require("../models/MicroCourse");
const Course = require("../models/Course");
const router = express.Router();

// Route : Créer un micro-cours
router.post("/micro-courses", async (req, res) => {
  try {
    const { course, title, contentType, content } = req.body;
    if (!course || !title || !contentType || !content) {
      return res.status(400).json({ message: "Tous les champs sont obligatoires." });
    }

    const newMicroCourse = new MicroCourse({ course, title, contentType, content });
    await newMicroCourse.save();

    const parentCourse = await Course.findById(course);
    if (parentCourse) {
      parentCourse.microCourses.push(newMicroCourse._id);
      parentCourse.NbMicroCour = parentCourse.microCourses.length;
      await parentCourse.save();
    }

    res.status(201).json({ message: "Micro-cours créé avec succès !", microCourse: newMicroCourse });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
});

// Route : Obtenir tous les micro-cours
router.get("/micro-courses", async (req, res) => {
  try {
    const microCourses = await MicroCourse.find();
    res.json(microCourses);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
});

// Route : Obtenir un micro-cours par ID
router.get("/micro-courses/:id", async (req, res) => {
  try {
    const microCourse = await MicroCourse.findById(req.params.id);
    if (!microCourse) {
      return res.status(404).json({ message: "Micro-cours introuvable." });
    }
    res.json(microCourse);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
});

// Route : Modifier un micro-cours
router.put("/micro-courses/:id", async (req, res) => {
  try {
    const { title, contentType, content } = req.body;
    const microCourse = await MicroCourse.findById(req.params.id);
    if (!microCourse) {
      return res.status(404).json({ message: "Micro-cours introuvable." });
    }
    microCourse.title = title || microCourse.title;
    microCourse.contentType = contentType || microCourse.contentType;
    microCourse.content = content || microCourse.content;
    await microCourse.save();
    res.json({ message: "Micro-cours mis à jour avec succès !", microCourse });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
});

// Route : Supprimer un micro-cours
router.delete("/micro-courses/:id", async (req, res) => {
  try {
    const microCourse = await MicroCourse.findById(req.params.id);
    if (!microCourse) {
      return res.status(404).json({ message: "Micro-cours introuvable." });
    }
    await MicroCourse.findByIdAndDelete(req.params.id);
    res.json({ message: "Micro-cours supprimé avec succès !" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
});

module.exports = router;
