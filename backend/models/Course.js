const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  domaine: { type: String, required: true }, 
  image: { type: String, required: true },
  NbMicroCour: { type: Number, required: true, default: 0 }, 
  createdAt: { type: Date, default: Date.now },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Référence au teacher
  microCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "MicroCourse" }] // Référence aux micro-cours
});

module.exports = mongoose.model("Course", CourseSchema);
