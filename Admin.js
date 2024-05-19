import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Admin = () => {
  

 
 

  const executeCommand = (command) => {
    // Implement logic to execute commands based on voice input
    // Example: Navigate to a specific page or perform an action
    if (command.includes('customer')) {
      // Code to navigate to the customer page
      console.log('Navigating to customer page...');
      // Perform navigation or any other action here
    } else if (command.includes('orders')) {
      // Code to navigate to the orders page
      console.log('Navigating to orders page...');
      // Perform navigation or any other action here
    } else if (command.includes('logout')) {
      // Code to log out the admin
      console.log('Logging out...');
      // Perform logout action here
    } else {
      // Command not recognized
      console.log('Command not recognized.');
      // Optionally, you can display a message to the user indicating that the command was not recognized
    }
  };

  

  const sidebarStyle = {
    width: '200px',
    height: '100vh', // Adjust height to fill the entire viewport
    backgroundColor: '#f0f0f0',
    padding: '20px', // Add padding for better spacing
  };

  const contentStyle = {
    flex: '1', // Make content area fill remaining space
    padding: '20px', // Add padding for better spacing
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const listItemStyle = {
    padding: '10px',
  };

  const linkStyle = {
    textDecoration: 'none',
    color: '#333',
  };

  const featureCardContainerStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    maxWidth: '1200px', // Limit the maximum width of the feature card container
  };

  const featureCardStyle = {
    width: '250px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '20px',
    margin: '20px',
    textAlign: 'center',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease',
    cursor: 'pointer',
  };

  const onFeatureHover = (event) => {
    event.target.style.transform = 'scale(1.05)';
  };

  const onFeatureLeave = (event) => {
    event.target.style.transform = 'scale(1)';
  };

  return (
    <div style={{ display: 'flex' }}>
      <div style={sidebarStyle}>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li style={listItemStyle}><Link to="/cartadmin" style={linkStyle}>Admin</Link></li>
          <li style={listItemStyle}><Link to="/customer" style={linkStyle}>Customers</Link></li>
          <li style={listItemStyle}><Link to="/order" style={linkStyle}>Orders</Link></li>
          <li style={listItemStyle}><Link to="/productadmin" style={linkStyle}>Products</Link></li>
          <li style={listItemStyle}><Link to="/blogadmin" style={linkStyle}>Blogs</Link></li>
          <li style={listItemStyle}><Link to="/enqadmin" style={linkStyle}>Enquiries</Link></li>
          <li style={listItemStyle}><Link to="/machinery" style={linkStyle}>Machinery</Link></li>
        </ul>
      </div>
      <div style={contentStyle}>
        <h1>Welcome to the Admin Panel</h1>
        <p>Here you can manage various aspects of your application.</p>
        <div style={featureCardContainerStyle}>
          <div style={featureCardStyle} onMouseEnter={onFeatureHover} onMouseLeave={onFeatureLeave}>
            <h2>Customer Management</h2>
            <p>View, add, or edit customer details.</p>
          </div>
          <div style={featureCardStyle} onMouseEnter={onFeatureHover} onMouseLeave={onFeatureLeave}>
            <h2>Order Tracking</h2>
            <p>Track orders, manage shipments, and update order status.</p>
          </div>
          <div style={featureCardStyle} onMouseEnter={onFeatureHover} onMouseLeave={onFeatureLeave}>
            <h2>Product Inventory</h2>
            <p>Manage your product inventory, add new products, or update existing ones.</p>
          </div>
          <div style={featureCardStyle} onMouseEnter={onFeatureHover} onMouseLeave={onFeatureLeave}>
            <h2>Blog Management</h2>
            <p>Create, edit, or delete blog posts and manage user comments.</p>
          </div>
          <div style={featureCardStyle} onMouseEnter={onFeatureHover} onMouseLeave={onFeatureLeave}>
            <h2>Enquiry Handling</h2>
            <p>Respond to customer enquiries, track communications, and manage support tickets.</p>
          </div>
          <div style={featureCardStyle} onMouseEnter={onFeatureHover} onMouseLeave={onFeatureLeave}>
            <h2>Machinery Control</h2>
            <p>Monitor and manage machinery operations, maintenance schedules, and performance metrics.</p>
          </div>
          <div style={featureCardStyle} onMouseEnter={onFeatureHover} onMouseLeave={onFeatureLeave}>
            <h2>Analytics Dashboard</h2>
            <p>Visualize key performance indicators and track trends using interactive charts and graphs.</p>
          </div>
          <div style={featureCardStyle} onMouseEnter={onFeatureHover} onMouseLeave={onFeatureLeave}>
            <h2>Task Scheduler</h2>
            <p>Schedule and assign tasks to team members, set deadlines, and track progress.</p>
          </div>
          <div style={featureCardStyle} onMouseEnter={onFeatureHover} onMouseLeave={onFeatureLeave}>
            <h2>Document Repository</h2>
            <p>Store and organize important documents, manuals, and reports securely.</p>
          </div>
          <div style={featureCardStyle} onMouseEnter={onFeatureHover} onMouseLeave={onFeatureLeave}>
            <h2>Live Chat Support</h2>
            <p>Provide immediate assistance to users with live chat support.</p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Admin;
