const mongoose = require("mongoose");

const MicroCourseSchema = new mongoose.Schema({
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true }, // Référence au cours
  title: { type: String, required: true },
  contentType: { 
    type: String, 
    enum: ["text", "pdf", "video", "image", "form"], 
    required: true 
  },
  content: { type: String, required: true } // Stockage du contenu (texte ou URL)
});

module.exports = mongoose.models.MicroCourse || mongoose.model("MicroCourse", MicroCourseSchema);
