const express = require("express");
const path = require("path");
const cors = require("cors");
const helmet = require("helmet"); // For security headers
const morgan = require("morgan"); // For logging HTTP requests
require("dotenv").config();
const mongoose = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const userRoutes = require("./routes/userRoutes");
const scrapedRoutes = require("./routes/scraped-data");
const courseRoutes = require("./routes/courseRoutes");
const MicroCourseRoutes = require("./routes/MicroCourseRoutes"); 
const uploadRoutes = require("./routes/uploadRoutes");
const geminiRoutes = require("./routes/geminiRoutes");  

const multer = require("multer");

// Configure file storage for uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ **Déplace `cors()` ici, avant `express.json()`**
app.use(cors({
  origin: "*", // ⚠️ Permet toutes les origines (à restreindre si besoin)
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// ✅ **Ajoute un middleware pour Cross-Origin-Resource-Policy**
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Resource-Policy", "cross-origin"); 
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups"); 
  res.setHeader("Access-Control-Allow-Origin", "*"); 
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));


app.use(express.json());
app.use(helmet());
app.use(morgan('combined'));


// Register routes
app.use("/api/auth", authRoutes);
app.use("/api", dashboardRoutes);
app.use("/api/users", userRoutes);
app.use("/api", scrapedRoutes);
app.use("/api", courseRoutes);
app.use("/api", MicroCourseRoutes);
app.use("/api", geminiRoutes);
app.use("/api/upload", uploadRoutes);

app.get("/", (req, res) => {
  res.send("API EduMaster is running...");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);

  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: "Validation Error", details: err.errors });
  }

  res.status(500).json({ error: "Internal Server Error" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
