const express = require("express");

const router = express.Router();

const {
  createTask,
  getTasks,
  getSingleTask,
  updateTask,
  deleteTask,
} = require("../controller/taskController");

router.post("/", createTask);
router.get("/", getTasks);
router.get("/:id", getSingleTask);
router.patch("/:id", updateTask);
router.delete("/:id", deleteTask);

module.exports = router;
