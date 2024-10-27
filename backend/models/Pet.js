// server/models/Pet.js
const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  breed: String,
  age: Number,
  weight: String,
  nextFeeding: String,
  nextGrooming: String,
  medicalInfo: {
    allergies: [String],
    conditions: [String],
    lastCheckup: Date
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Pet', petSchema);
