// routes/machineryRoute.js
const express = require('express');
const router = express.Router();
const Machinery = require("../models/Machinery");

// Define CRUD endpoints for machinery

// Create a new machinery
router.post("/create_machinery", async (req, res) => {
  try {
    const newMachinery = new Machinery(req.body);
    await newMachinery.save();
    res.status(201).json(newMachinery);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all machinery
router.get("/machinery", async (req, res) => {
  try {
    const machinery = await Machinery.find();
    res.json(machinery);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update machinery by ID
router.put("/update_machinery/:id", async (req, res) => {
  try {
    const updatedMachinery = await Machinery.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedMachinery);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete machinery by ID
router.delete("/delete_machinery/:id", async (req, res) => {
  try {
    await Machinery.findByIdAndDelete(req.params.id);
    res.json({ message: "Machinery deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
