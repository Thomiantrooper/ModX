// routes/salaryRoutes.js
const express = require('express');
const router = express.Router();
const SalaryCtrl = require('../controller/SalaryCtrl');

router.post('/calculate-salary', SalaryCtrl.calculateSalary);

module.exports = router;
