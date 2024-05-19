import proicon from '../images/proicon.png';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

const UpdateEmployee = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        //const response = await axios.get(`http://localhost:8080/getEmployee?id=${id}`);
        const response = await axios.get(`http://localhost:8080/getUser/`+ id);
        if (response.data.success) {
          const { name, email, phone } = response.data.data;
          setFormData({ name, email, phone });
        } else {
          console.error("Failed to fetch employee data for update");
        }
      } catch (error) {
        console.error("Error fetching employee data for update:", error);
      }
    };
    fetchData();
  }, [id]);

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:8080/update/${id}`, formData);
      if (response.data.success) {
        alert(response.data.message);
        // Optionally, navigate to another page after successful update
      } else {
        console.error("Update request failed:", response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div>
      <div className='main'></div>
      <div className="navbar">
        <ul className="nav-menu">
          <li>Home</li>
          <li>Contact</li>
          <li>Employee</li>
          <li>Cart</li>
        </ul>
        <div className="icon">
          <img src={proicon} alt="" />
        </div>
      </div>
      <div className="container">
        <button className="btn-add">Add</button>
        <div className="addContainer">
          <form onSubmit={handleUpdate}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" onChange={handleOnChange} value={formData.name} />
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" onChange={handleOnChange} value={formData.email} />
            <label htmlFor="phone">Phone</label>
            <input type="number" id="phone" name="phone" onChange={handleOnChange} value={formData.phone} />
            <button className='submit' type="submit">Update</button>
          </form>
          <Link to="/View_employeedetails">
            <button className="btn" id="view" type="button">View</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default UpdateEmployee;
