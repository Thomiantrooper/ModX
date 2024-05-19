const Leave = require("../models/leaveModel");
const asyncHandler = require("express-async-handler");



const getEmployeeInfo = async (req, res) => {
  try {
    const data = await Leave.find({});
    res.json({ success: true, data: data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const createEmployee = async (req, res) => {
  try {
    const newEmployee = await Leave.create(req.body);
    res.json({ success: true, message: "Data saved successfully", data: newEmployee });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const updateEmployee = async (req, res) => {
  const id = req.params.id;
  const { name, email, reason, start, end } = req.body;
  try {
    const updatedEmployee = await Leave.findByIdAndUpdate(id, { name, email, reason, start, end }, { new: true });
    res.json({ success: true, message: "Data updated successfully", data: updatedEmployee });
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).json({ success: false, message: "Failed to update data" });
  }
};

const deleteEmployee = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedEmployee = await Leave.deleteOne({ _id: id });
    res.json({ success: true, message: "Data deleted successfully", data: deletedEmployee });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = {
  getEmployeeInfo,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
