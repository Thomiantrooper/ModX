// models/Machinery.js

const mongoose = require('mongoose');

const machinerySchema = new mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  capacity: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  }
});

const Machinery = mongoose.model('Machinery', machinerySchema);

module.exports = Machinery;
