const express = require("express");
const path = require("path");
const multer = require("multer");

const router = express.Router();

// Configurer le stockage des fichiers téléchargés
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Route pour gérer l'upload d'image
router.post("/", upload.single("image"), (req, res) => {
  console.log("Fichier reçu:", req.file);
  if (!req.file) {
    return res.status(400).json({ message: "Aucun fichier uploadé" });
  }
  res.status(200).json({ path: `/uploads/${req.file.filename}` });
});

module.exports = router;
