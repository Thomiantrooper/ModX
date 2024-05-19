import React from 'react';
import { useNavigate } from 'react-router-dom';

const EmployeeHome = () => {
  const navigate = useNavigate();

  const handleEmployeeProfileClick = () => {
    navigate('/SalaryCalculator');
  };

  const handleEmployeeLeaveClick = () => {
    navigate('/EmployeeLeave');
  };

  const handleEmployeeFeedbackClick = () => {
    navigate('/enquiries')
  };

  const handleEmployeeRegistrationFormClick = () => {
    navigate('/EmployeeRegistrationForm');
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <button style={{ width: '350px', height: '250px', borderRadius: '50%', backgroundColor: '#ffcc00', marginRight: '20px' }} onClick={handleEmployeeProfileClick}>Employee Salary</button>
      <button style={{ width: '350px', height: '250px', borderRadius: '50%', backgroundColor: '#ff6699', marginRight: '20px' }} onClick={handleEmployeeLeaveClick}>Employee Leave Request</button>
      <button style={{ width: '350px', height: '250px', borderRadius: '50%', backgroundColor: '#66ccff' }} onClick={handleEmployeeFeedbackClick}>Employee Feedback</button>
      <button style={{ width: '350px', height: '250px', borderRadius: '50%', backgroundColor: '#66ccff' }} onClick={handleEmployeeRegistrationFormClick}>Employee Registration Form</button>
    </div>
  );
}

export default EmployeeHome;
