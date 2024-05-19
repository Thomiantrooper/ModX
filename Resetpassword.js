import React, { useState } from 'react';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './ForgotPassword.css';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from "formik";
import * as yup from 'yup';
import { resetPassword } from '../features/user/userSlice';


const passwordSchema = yup.object({
  
  password: yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
      'Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, and one number'
    )
});


const ResetPassword = () => {

  const location = useLocation()
  const getToken = location.pathname.split("/")[2]

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const formik = useFormik({
    initialValues: {
      
      password: ''
    },
    validationSchema: passwordSchema,
    onSubmit: values => {
      dispatch(resetPassword({token:getToken,password:values.password}));

      navigate('/login')
    },
  });



  const [password, email /*setEmail*/] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  /*const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('/api/resetpassword', { email, newPassword });
      setMessage(response.data.message); // Assuming the server responds with a message
      setEmailSent(true);
    } catch (error) {
      console.error('Password reset request failed', error);
      setMessage('Password reset request failed. Please try again later.');
    }
  };*/

  return (
    <div className="center_wrapper">
      <div className="forgot-password-container">
        <h2>Reset Password</h2>
        {emailSent ? (
          <div>
            <p>An email has been sent to {email}. Please check your inbox for further instructions.</p>
            <p>If you don't receive an email within a few minutes, please check your spam folder.</p>
            <button className="login-button"><Link to="/login">Login</Link></button>
          </div>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            
            <div className="input-group">
              <label>password:</label>
              <input type="password" value={formik.values.password} onChange={formik.handleChange("password")} onBlur={formik.handleBlur("password")} />
            </div>
            <div className="error text-center">
            {formik.touched.password && formik.errors.password}
            </div>
            
            <button type="submit" className="reset-password-button">OK</button>
          </form>
        )}
        <p>{message}</p>
        
      </div>
    </div>
  );
};

export default ResetPassword;
