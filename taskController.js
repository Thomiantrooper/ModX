const mongoose = require("mongoose");
const taskModel = require("../models/TaskModel");

// To create a Task - POST
const createTask = async (req, res) => {
  const { Model, MaterialsInspection, Testing, QualityControlChecks, DocumentationandTraceability, EmployeeTraining, Finalstatus, ImpactResistance, ImpactStandard, ImpactResult, PenetrationResistance, PenetrationStandard, PenetrationResult, RetentionSystem, RetentionStandard, RetentionResult, FieldOfVision, FieldOfVisionStandard, FieldOfVisionResult, LinerMaterial, VisorMaterial, Visorattachment, Strapstrength, Shellintegrity, date } = req.body;

  try {
    const task = await taskModel.create({ Model, MaterialsInspection, Testing, QualityControlChecks, DocumentationandTraceability, EmployeeTraining, Finalstatus, ImpactResistance, ImpactStandard, ImpactResult, PenetrationResistance, PenetrationStandard, PenetrationResult, RetentionSystem, RetentionStandard, RetentionResult, FieldOfVision, FieldOfVisionStandard, FieldOfVisionResult, LinerMaterial, VisorMaterial, Visorattachment, Strapstrength, Shellintegrity, date });
    res.status(200).json(task);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

// To get all Taks - GET
const getTasks = async (req, res) => {
  try {
    const tasks = await taskModel.find({});
    res.status(200).json(tasks);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

// To get a single Task - GET
const getSingleTask = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Task Not Found" });
  }
  try {
    const singleTask = await taskModel.findById(id);
    res.status(200).json(singleTask);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

// To update a task - PATCH

const updateTask = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Task Not Found" });
  }

  try {
    const task = await taskModel.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        ...req.body,
      }
    );
    res.status(200).json(task);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

// Delete task - DELETE

const deleteTask = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Task Not Found" });
  }

  try {
    const task = await taskModel.findByIdAndDelete(id);
    res.status(200).json(task);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

module.exports = {
  createTask,
  getTasks,
  getSingleTask,
  updateTask,
  deleteTask,
};
