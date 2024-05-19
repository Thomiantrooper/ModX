import React, { useState, useEffect } from 'react';
import axios from 'axios';

const daysInMonth = {
  January: 31,
  February: 28, // Assuming non-leap year for simplicity
  March: 31,
  April: 30,
  May: 31,
  June: 30,
  July: 31,
  August: 31,
  September: 30,
  October: 31,
  November: 30,
  December: 31
};

const overtimeRate = 500; // Per hour
const leaveDeduction = 1500; // Per day

const positionSalaries = {
  employee: 50000,
  'senior manager': 80000,
  'sales executive manager': 70000,
  'inventory manager': 55000,
  'office staff': 45000,
  'quality checker': 45000
};

const SalaryCalculator = () => {
  const [daysPresent, setDaysPresent] = useState('');
  const [month, setMonth] = useState('');
  const [position, setPosition] = useState('');
  const [overtime2Hours, setOvertime2Hours] = useState('');
  const [overtime3Hours, setOvertime3Hours] = useState('');
  const [salary, setSalary] = useState('');
  const [daysAbsent, setDaysAbsent] = useState('');

  useEffect(() => {
    updateDaysAbsent();
  }, [daysPresent, month]);

  const calculateSalary = () => {
    const totalDaysInMonth = daysInMonth[month];
    const daysPresentValue = parseInt(daysPresent);
    if (isNaN(daysPresentValue) || daysPresentValue < 0 || daysPresentValue > totalDaysInMonth) {
      setDaysAbsent('');
      return;
    }
    const daysAbsentValue = totalDaysInMonth - daysPresentValue;
    setDaysAbsent(Math.max(0, daysAbsentValue));
    const baseSalary = positionSalaries[position];
    const overtimePay = (overtimeRate * 2 * overtime2Hours) + (overtimeRate * 3 * overtime3Hours);
    const finalSalary = baseSalary - (daysAbsentValue * leaveDeduction) + overtimePay;
    setSalary(finalSalary);
  };

  const handleDaysPresentChange = (event) => {
    const daysPresentValue = parseInt(event.target.value);
    setDaysPresent(daysPresentValue);
  };

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };

  const updateDaysAbsent = () => {
    const totalDaysInMonth = daysInMonth[month];
    const daysPresentValue = parseInt(daysPresent);
    if (!isNaN(daysPresentValue) && daysPresentValue >= 0 && daysPresentValue <= totalDaysInMonth) {
      const daysAbsentValue = totalDaysInMonth - daysPresentValue;
      setDaysAbsent(Math.max(0, daysAbsentValue));
    } else {
      setDaysAbsent('');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <div style={{ backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '10px', display: 'inline-block' }}>
        <h1 style={{ fontSize: '28px', marginBottom: '20px' }}>Salary Calculator</h1>
        <p style={{ fontSize: '16px', marginBottom: '20px' }}>Please enter the number of days present and select the month to calculate salary.</p>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ marginRight: '20px' }}>
            Days Present:
            <input type="number" value={daysPresent} onChange={handleDaysPresentChange} />
          </label>
          <label style={{ marginRight: '20px' }}>
            Days Absent:
            <input type="text" value={isNaN(daysAbsent) ? '' : daysAbsent} readOnly />
          </label>
          <label style={{ marginRight: '20px' }}>
            Month:
            <select value={month} onChange={handleMonthChange}>
              <option value="">Select Month</option>
              {Object.keys(daysInMonth).map(month => (
                <option key={month} value={month}>{month}</option>
              ))}
            </select>
          </label>
          <label style={{ marginRight: '20px' }}>
            Position:
            <select value={position} onChange={e => setPosition(e.target.value)}>
              <option value="">Select Position</option>
              <option value="employee">Employee</option>
              <option value="senior manager">Senior Manager</option>
              <option value="sales executive manager">Sales Executive Manager</option>
              <option value="inventory manager">Inventory Manager</option>
              <option value="office staff">Office Staff</option>
              <option value="quality checker">Quality Checker</option>
            </select>
          </label>
          <br />
          <label style={{ marginRight: '20px' }}>
            Overtime for 2 hours:
            <input type="number" value={overtime2Hours} onChange={e => setOvertime2Hours(e.target.value)} />
          </label>
          <label style={{ marginRight: '20px' }}>
            Overtime for 3 hours:
            <input type="number" value={overtime3Hours} onChange={e => setOvertime3Hours(e.target.value)} />
          </label>
          <button style={{ backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', padding: '8px 16px', fontSize: '16px', cursor: 'pointer' }} onClick={calculateSalary}>Calculate Salary</button>
        </div>
        {salary !== '' && <p style={{ fontSize: '20px' }}>Salary: Rs. {salary}</p>}
      </div>
    </div>
  );
};

export default SalaryCalculator;
