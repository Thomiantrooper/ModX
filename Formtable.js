import React from "react";
import proicon from '../images/proicon.png';

import './View_employeedetails';
import { Link, useNavigate ,useLocation , useParams} from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Formtable = ({location}) => { 
  const { state: initialState } = location;
  console.log("Initial state:", initialState);
  //const location = useLocation();
  const {id} = useParams();
  //const initialState = location.state || { name:"",email:"",phone:""};

  const [formDataEdit, setFormDataEdit] = useState(initialState);

  useEffect(() => {
    if (initialState){
      setFormDataEdit(initialState);
    } else {
      // Fetch data based on the ID if no state is provided
      // You might want to implement this part if necessary
    }
  },[]);
  // [initialState]);

  const handleUpdate = async(e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`/update/${formDataEdit._id}`, formDataEdit);
      if (res.data.success) {
        alert(res.data.message);
        // Handle successful update
      }
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  const handleEditOnChange = (e)=>{
    const { value, name } = e.target;

    // Validate phone number format
    if (name === 'phone') {
      if (!/^[0-9]{0,10}$/.test(value)) {
        // Phone number should only contain digits and be exactly 10 characters long
        alert("Phone number should contain exactly 10 digits and must start with 0.(example 0xxxxxxxxx)");
        return;
      }
      // Ensure the phone number starts with '0'
      if (value.length > 0 && value[0] !== '0') {
        // If phone number doesn't start with '0', remove the last character
        return;
      }
    }

    setFormDataEdit((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  
  /*const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    id : ""
  });*/
  
 //const Formtable = ({handleUpdate,handleEditOnChange,rest}) =>{
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
        <input type="text" id="name" name="name" value={initialState.name} onChange={handleEditOnChange} />
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" value={initialState.email} onChange={handleEditOnChange}/>
        <label htmlFor="phone">Phone</label>
        <input type="number" id="phone" name="phone" value={initialState.phone} onChange={handleEditOnChange}/>
        <button className='submit'>Update</button>
      </form>
      <Link to="/View_employeedetails">
        <button className="btn" id="view" type="button">View</button>
      </Link>
    </div>
  </div>
</div>
   )
 //}
}
export default Formtable;