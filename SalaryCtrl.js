// controllers/SalaryController.js
const Salary = require('../models/salaryModel');

const calculateSalary = async (req, res) => {
  try {
    const { daysPresent, position } = req.body;
    const monthDays = 30; // Change this based on the month

    let salary;
    switch (position) {
      case 'employee':
        salary = daysPresent * 100;
        break;
      case 'senior manager':
        salary = daysPresent * 200;
        break;
      case 'sales executive manager':
        salary = daysPresent * 150;
        break;
      case 'inventory manager':
        salary = daysPresent * 180;
        break;
      case 'office staff':
        salary = daysPresent * 120;
        break;
      case 'quality checker':
        salary = daysPresent * 130;
        break;
      default:
        salary = 0;
    }

    const daysAbsent = monthDays - daysPresent;
    const employee = new Salary({ daysPresent, daysAbsent, position, salary });
    await employee.save();
    res.json({ salary });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { calculateSalary };
