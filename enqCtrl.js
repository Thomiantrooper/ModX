const Enquiry = require("../models/enqModel");
const asyncHandler = require("express-async-handler");

const createEnquiry = asyncHandler(async (req, res) => {
  try {
    const newEnquiry = await Enquiry.create(req.body);
    res.json(newEnquiry);
  } catch (error) {
    res.status(500).json({ message: "Failed to create enquiry", error: error.message });
  }
});

const updateEnquiry = asyncHandler(async (req, res) => {
  try {
    const updatedEnquiry = await Enquiry.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedEnquiry);
  } catch (error) {
    res.status(500).json({ message: "Failed to update enquiry", error: error.message });
  }
});

const deleteEnquiry = asyncHandler(async (req, res) => {
  try {
    const deletedEnquiry = await Enquiry.findByIdAndDelete(req.params.id);
    res.json(deletedEnquiry);
  } catch (error) {
    res.status(500).json({ message: "Failed to delete enquiry", error: error.message });
  }
});

const getEnquiry = asyncHandler(async (req, res) => {
  try {
    const getaEnquiry = await Enquiry.findById(req.params.id);
    res.json(getaEnquiry);
  } catch (error) {
    res.status(500).json({ message: "Failed to get enquiry", error: error.message });
  }
});

const getallEnquiry = asyncHandler(async (req, res) => {
  try {
    const getallEnquiry = await Enquiry.find();
    res.json(getallEnquiry);
  } catch (error) {
    res.status(500).json({ message: "Failed to get all enquiries", error: error.message });
  }
});

const replyToEnquiry = asyncHandler(async (req, res) => {
  try {
    const { enquiryId } = req.params;
    const { managerReply } = req.body;

    const enquiry = await Enquiry.findById(enquiryId);

    if (!enquiry) {
      return res.status(404).json({ message: "Enquiry not found" });
    }

    enquiry.managerReply = managerReply;
    enquiry.status = "Resolved"; // Update status as per your requirement

    const updatedEnquiry = await enquiry.save();

    res.json(updatedEnquiry);
  } catch (error) {
    res.status(500).json({ message: "Failed to reply to enquiry", error: error.message });
  }
});

module.exports = {
  createEnquiry,
  updateEnquiry,
  deleteEnquiry,
  getEnquiry,
  getallEnquiry,
  replyToEnquiry,
};
