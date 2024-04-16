const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8080;

// Schema
const schemaData = mongoose.Schema(
  {
    email: String,
    feedback: String,
    replies: [String], // New field to store replies
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("user", schemaData);

// Read
app.get("/", async (req, res) => {
  try {
    const data = await userModel.find({});
    res.json({ success: true, data: data });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// Create data
app.post("/create", async (req, res) => {
  try {
    const { email, feedback } = req.body;
    const data = new userModel({ email, feedback, replies: [] }); // Initialize replies field
    await data.save();
    res.send({ success: true, message: "Data saved successfully", data: data });
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// Update data
app.put("/update", async (req, res) => {
  const { _id, ...rest } = req.body;

  try {
    const feedback = await userModel.findById(_id);

    if (!feedback) {
      return res
        .status(404)
        .json({ success: false, message: "Feedback not found" });
    }

    const currentTime = new Date();
    const timeDiffMinutes = (currentTime - feedback.createdAt) / (1000 * 60);

    if (timeDiffMinutes > 1) {
      return res.status(403).json({
        success: false,
        message: "Feedback can only be edited within 1 minute of submission",
      });
    }

    await userModel.updateOne({ _id: _id }, rest);
    res.json({ success: true, message: "Feedback updated successfully" });
  } catch (error) {
    console.error("Error updating feedback:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// Delete data
app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const feedback = await userModel.findById(id);

    if (!feedback) {
      return res
        .status(404)
        .json({ success: false, message: "Feedback not found" });
    }

    const currentTime = new Date();
    const timeDiffMinutes = (currentTime - feedback.createdAt) / (1000 * 60);

    if (timeDiffMinutes <= 1) {
      await userModel.deleteOne({ _id: id });
      return res.json({
        success: true,
        message: "Feedback deleted successfully",
      });
    } else {
      return res.status(403).json({
        success: false,
        message: "Feedback can only be deleted within 1 minute of submission",
      });
    }
  } catch (error) {
    console.error("Error deleting feedback:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// Manager Route to view customer feedbacks
app.get("/manager/feedbacks", async (req, res) => {
  try {
    const feedbacks = await userModel.find({});
    res.json({ success: true, data: feedbacks });
  } catch (error) {
    console.error("Error fetching feedbacks:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

mongoose
  .connect("mongodb://localhost:27017/modx")
  .then(() => {
    console.log("Connected to DB");
    app.listen(PORT, () => console.log("Server is running"));
  })
  .catch((err) => console.error("Error connecting to DB:", err));
