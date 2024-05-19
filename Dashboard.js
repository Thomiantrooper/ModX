import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const buttonStyle = {
    fontSize: '20px', // Larger font size
    margin: '10px', // Space between buttons
    padding: '15px 30px', // Padding around the text inside the button
  };

  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      <div>
        {/* Use Link component to navigate to Adminlog */}
        <Link to="/adminlog" style={{ textDecoration: 'none' }}>
          <button style={buttonStyle}>
            {/* Use an icon for admin */}
            <i className="fas fa-user-cog"></i> Admin
          </button>
        </Link>
        {/* Assuming similar setup for other buttons */}
        <Link to="/qa" style={{ textDecoration: 'none' }}>
        <button style={buttonStyle}>
          {/* Use an icon for quality assurance */}
          <i className="fas fa-check-circle"></i> Quality Assurance
        </button>
        </Link>
        <Link to="/EmployeeHome" style={{ textDecoration: 'none' }}>
        <button style={buttonStyle}>
          {/* Use an icon for employee */}
          <i className="fas fa-user"></i> Employee
        </button>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
