const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Course = require("../models/Course");

const router = express.Router();

// Assurez-vous que le dossier "uploads" existe
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configuration de Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  },
});

const fileFilter = (req, file, cb) => {
  const isImage = file.mimetype.startsWith("image/"); // Checks if the file is an image
  if (isImage) {
    cb(null, true);
  } else {
    cb(new Error("Seuls les fichiers images sont autorisés !"), false);
  }
};


const upload = multer({ 
  storage, 
  limits: { fileSize: 5 * 1024 * 1024 }, // Limite à 5 Mo
  fileFilter,
});

// Route pour créer un cours avec image
router.post("/courses", upload.single("image"), async (req, res) => {
  console.log("Fichier reçu :", req.file);
    try {
    const { name, domaine, NbMicroCour, teacher } = req.body;
    if (!name || !domaine || NbMicroCour === undefined || !teacher) {
      return res.status(400).json({ message: "Tous les champs sont obligatoires." });
    }

    const imagePath = req.file ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}` : null;

    const newCourse = new Course({ name, domaine, image: imagePath, NbMicroCour, teacher });
    await newCourse.save();

    res.status(201).json({ message: "Cours créé avec succès !", course: newCourse });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
});

// Route pour obtenir tous les cours
router.get("/courses", async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
});

// Route pour obtenir un cours par ID
router.get("/courses/:id", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Cours introuvable." });
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
});

// Route pour modifier un cours
router.put("/courses/:id", upload.single("image"), async (req, res) => {
  try {
    const { name, domaine, NbMicroCour } = req.body;
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Cours introuvable." });
    }

    if (req.file) {
      if (course.image) {
        const oldImagePath = path.join(__dirname, "..", "uploads", path.basename(course.image));
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      course.image = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    }

    course.name = name || course.name;
    course.domaine = domaine || course.domaine;
    course.NbMicroCour = NbMicroCour !== undefined ? NbMicroCour : course.NbMicroCour;

    await course.save();
    res.json({ message: "Cours mis à jour avec succès !", course });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
});

// Route pour supprimer un cours
router.delete("/courses/:id", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Cours introuvable." });
    }

    if (course.image) {
      const imagePath = path.join(__dirname, "..", "uploads", path.basename(course.image));
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: "Cours supprimé avec succès !" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
});

module.exports = router;
