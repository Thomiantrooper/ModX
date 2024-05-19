import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MachineryForm = () => {
  const [machineryList, setMachineryList] = useState([]);
  const [newMachinery, setNewMachinery] = useState({
    type: '',
    capacity: 0,
    status: '',
    location: ''
  });

  useEffect(() => {
    // Fetch machinery data from the backend
    axios.get('http://localhost:5000/machinery')
      .then(response => {
        setMachineryList(response.data);
      })
      .catch(error => {
        console.error('Error fetching machinery data:', error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewMachinery(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send new machinery data to the backend
    axios.post('http://localhost:5000/create_machinery', newMachinery)
      .then(response => {
        console.log('New machinery added:', response.data);
        // Show toast notification
        toast.success('Machinery added successfully!', { position: toast.POSITION.TOP_RIGHT });
        setMachineryList([...machineryList, response.data]);
        setNewMachinery({
          type: '',
          capacity: 0,
          status: '',
          location: ''
        });
      })
      .catch(error => {
        console.error('Error adding new machinery:', error);
      });
  };

  const handleToggle = (id) => {
    // Send toggle status to backend
    const updatedMachineryList = machineryList.map(machinery => {
      if (machinery._id === id) {
        const newStatus = machinery.status === 'free' ? 'busy' : 'free';
        axios.put(`http://localhost:5000/update_machinery/${id}`, { status: newStatus })
          .then(response => {
            console.log('Machinery status updated:', response.data);
          })
          .catch(error => {
            console.error('Error updating machinery status:', error);
          });
        return { ...machinery, status: newStatus };
      }
      return machinery;
    });
    setMachineryList(updatedMachineryList);
  };

  const handleDelete = (id) => {
    // Send delete request to backend
    axios.delete(`http://localhost:5000/delete_machinery/${id}`)
      .then(response => {
        console.log('Machinery deleted:', response.data);
        // Remove deleted item from the list
        setMachineryList(machineryList.filter(machinery => machinery._id !== id));
      })
      .catch(error => {
        console.error('Error deleting machinery:', error);
      });
  };

  // Count the number of free machinery
  const freeMachineryCount = machineryList.filter(machinery => machinery.status === 'free').length;

  return (
    <div style={{ maxWidth: '800px', margin: 'auto' }}>
      <ToastContainer />
      <div style={{ marginBottom: '20px' }}>
        <h2>Add New Machinery</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label htmlFor="type">Type:</label>
            {/* Select input for machinery type */}
            <label htmlFor="type">Type:</label>
            <select id="type" name="type" value={newMachinery.type} onChange={handleChange}>
              <option value="">Select Type</option>
              <option value="vielding">Vielding</option>
              <option value="whitening">Whitening</option>
              <option value="vapouring">Vapouring</option>
              <option value="molting">Molting</option>
            </select>

            <label htmlFor="capacity">Capacity:</label>
            {/* Input for machinery capacity */}
            <input type="number" id="capacity" name="capacity" value={newMachinery.capacity} onChange={handleChange} />

            <label htmlFor="status">Status:</label>
            {/* Select input for machinery status */}
            <select id="status" name="status" value={newMachinery.status} onChange={handleChange}>
              <option value="">Select Status</option>
              <option value="free">Free</option>
              <option value="busy">Busy</option>
            </select>

            <label htmlFor="location" style={{ marginBottom: '10px' }}>Location:</label>
            {/* Input for machinery location */}
            <input type="text" id="location" name="location" value={newMachinery.location} onChange={handleChange} />

            <button type="submit" style={{ fontSize: '14px', padding: '5px 10px' }}>Add Machinery</button>
          </div>
        </form>
      </div>

      {/* Display number of available free machinery */}
      <div style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: 'lightgreen', padding: '5px 10px', borderRadius: '5px' }}>
        Free Machinery Available: {freeMachineryCount}
      </div>

      <h2>Machinery List</h2>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {/* Table header */}
              <th style={{ padding: '10px', borderBottom: '1px solid #ddd', backgroundColor: '#f2f2f2', textAlign: 'left' }}>Type</th>
              <th style={{ padding: '10px', borderBottom: '1px solid #ddd', backgroundColor: '#f2f2f2', textAlign: 'left' }}>Capacity</th>
              <th style={{ padding: '10px', borderBottom: '1px solid #ddd', backgroundColor: '#f2f2f2', textAlign: 'left' }}>Status</th>
              <th style={{ padding: '10px', borderBottom: '1px solid #ddd', backgroundColor: '#f2f2f2', textAlign: 'left' }}>Location</th>
              <th style={{ padding: '10px', borderBottom: '1px solid #ddd', backgroundColor: '#f2f2f2', textAlign: 'left' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* Mapping through machinery list to display each machinery */}
            {machineryList.map(machinery => (
              <tr key={machinery._id}>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{machinery.type}</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{machinery.capacity}</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                  {/* Displaying machinery status */}
                  <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: machinery.status === 'free' ? 'green' : 'red', display: 'inline-block', marginRight: '5px' }}></div>
                  {machinery.status}
                </td>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{machinery.location}</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                  {/* Button to toggle machinery status */}
                  <button onClick={() => handleToggle(machinery._id)}>Toggle</button>
                  {/* Button to delete machinery */}
                  <button onClick={() => handleDelete(machinery._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MachineryForm;
