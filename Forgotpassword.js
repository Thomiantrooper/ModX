import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './ForgotPassword.css';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPasswordToken, loginUser } from '../features/user/userSlice';

const emailSchema = yup.object({
  
  email: yup.string().email("Email should be valid").required("Email is required"),
  
});




const ForgotPassword = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const userState = useSelector(state => state.auth.user); 
  const [message, setMessage] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const navigate = useNavigate()


  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      
      email: userState?.email || '',
    },
    validationSchema: emailSchema,
    onSubmit: (values) => {
      dispatch(forgotPasswordToken(values));
      
      
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/forgotpassword', { email });
      setMessage(response.data.message); // Assuming the server responds with a message
      setEmailSent(true);
      // Show popup message
      alert('An email has been sent to ' + email + '. Please check your inbox for further instructions.');
    } catch (error) {
      console.error('Password reset request failed', error);
      setMessage('Password reset request failed. Please try again later.');
    }
  };

  const handleCancel = () => {
    // Redirect to home page
    window.location.href = '/login';
  };

  return (
    <div className="center_wrapper">
      <div className="forgot-password-container">
        <h2>Forgot Password</h2>
        {emailSent ? (
          <div>
            <p>An email has been sent to {email}. Please check your inbox for further instructions.</p>
            <p>If you don't receive an email within a few minutes, please check your spam folder.</p>
          </div>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <div className="input-group">
              <label>Email:</label>
              <input type="email" value={formik.values.email} onChange={formik.handleChange("email")} onBlur={formik.handleBlur("email")} />
            </div>
            <div className="error text-center">
            {formik.touched.email && formik.errors.email}
            </div>
            
            <button type="submit" className="reset-password-button">Submit</button>
            <button type="button" className="reset-password-button" onClick={handleCancel}>Cancel</button>
          </form>
        )}
        <p>{message}</p>
        <div className="additional-info">
          <p>If you haven't signed up yet, click <Link to="/signup">here</Link> to sign up.</p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
