// models/Salary.js
const mongoose = require('mongoose');

const SalarySchema = new mongoose.Schema({
  daysPresent: {
    type: Number,
    required: true
  },
  daysAbsent: {
    type: Number,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  salary: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Salary', SalarySchema);
