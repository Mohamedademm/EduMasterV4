const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/dashboard", authMiddleware, (req, res) => {
  // Vérifie que l'utilisateur a le rôle "admin"
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Accès interdit." });
  }
  // Renvoie un message et les informations de l'utilisateur
  res.json({ message: "Bienvenue sur le Dashboard Admin !", user: req.user });
});

module.exports = router;
