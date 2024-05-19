import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

/*axios.defaults.baseURL = "http://localhost:8080/";*/

const EmployeeLeave = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    start: "",
    end: "",
    reason: "",
  });
  const [dataList, setDataList] = useState([]);
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const start = new Date(formData.start);
    const end = new Date(formData.end);
    const updatedFormData = { ...formData, start, end };
    try {
      const { data } = await axios.post("/create", updatedFormData);
      if (data.success) {
        alert(data.message);
        setFormData({
          name: "",
          email: "",
          start: "",
          end: "",
          reason: ""
        });
        fetchData();
      }
    } catch (error) {
      console.error("Error creating leave request:", error);
      alert("Failed to create leave request");
    }
  };

  const fetchData = async () => {
    try {
      const { data } = await axios.get("/info");
      if (data.success) {
        setDataList(data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Failed to fetch data");
    }
  };

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(`/deleted/${id}`);
      if (data.success) {
        alert(data.message);
        fetchData();
      }
    } catch (error) {
      console.error("Error deleting leave request:", error);
      alert("Failed to delete leave request");
    }
  };

  const handleUpdate = async (id) => {
    try {
      const { data } = await axios.put(`/updated/${id}`);
      if (data.success) {
        alert(data.message);
        fetchData();
      }
    } catch (error) {
      console.error("Error updating leave request:", error);
      alert("Failed to update leave request");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="container">
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', maxWidth: '300px', margin: '0 auto' }}>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" onChange={handleOnChange} value={formData.name} required />
          
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" onChange={handleOnChange} value={formData.email} required />
          
          <label htmlFor="start">Absence From</label>
          <input type="date" id="start" name="start" onChange={handleOnChange} value={formData.start} required />
          
          <label htmlFor="end">Absence Through</label>
          <input type="date" id="end" name="end" onChange={handleOnChange} value={formData.end} required />
          
          <label htmlFor="reason">Reason</label>
          <textarea id="reason" name="reason" onChange={handleOnChange} value={formData.reason} required />
          
          <button type="submit">Submit</button>
        </form>
      </div>

      <div>
        <Link to="/View_employeedetails">
          <button className="btn" id="view" type="button">View</button>
        </Link>
        {/* Additional UI components can be added here */}
      </div>
    </div>
  );
}

export default EmployeeLeave;
