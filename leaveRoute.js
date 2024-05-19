const express = require("express");
const router = express.Router();
const {
  getEmployeeInfo,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} = require("../controller/leaveCtrl");

router.get("/info", getEmployeeInfo);
router.post("/create", createEmployee);
router.put("/updated/:id", updateEmployee);
router.delete("/deleted/:id", deleteEmployee);

module.exports = router;
