const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['user', 'teacher', 'admin'], // Rôles possibles
    default: 'user' // Valeur par défaut
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
