import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';
import { useFormik } from "formik";
import * as yup from 'yup';
import { useDispatch } from 'react-redux'; // Import useDispatch
import { registerUser } from '../features/user/userSlice';
import { toast } from 'react-toastify'; // Import toast notification library

// Custom validation function for password strength
const passwordStrength = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

const signupSchema = yup.object({
  firstname: yup.string().required("First name should be provided"),
  lastname: yup.string().required("Last name should be provided"),
  email: yup.string().email("should be valid").required("Email is required"),
  mobile: yup.string().required("Mobile number is required").length(10, "Mobile number should be exactly 10 digits"),
  password: yup.string()
    .required("Password is required")
    .matches(passwordStrength, 'Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, and one number')
});

const Signup = () => {
  const dispatch = useDispatch(); // Get dispatch function
  const navigate = useNavigate();
  
  const formik = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      email: '',
      mobile: '',
      password: ''
    },
    validationSchema: signupSchema,
    onSubmit: async values => {
      try {
        await dispatch(registerUser(values)); // Dispatch action with form values
        toast.success('User registered successfully'); // Show success toast
        navigate('/login'); // Navigate to login page after toast is displayed
      } catch (error) {
        console.error('Error registering user:', error);
      }
    },
  });

  return (
    <div className="center-wrapper">
      <div className="signup-container">
        <h2>Signup</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="input-group">
            <label>First Name:</label>
            <input type="text" name="firstname" value={formik.values.firstname} onChange={formik.handleChange} onBlur={formik.handleBlur} />
          </div>
          <div className='error'>
            {formik.touched.firstname && formik.errors.firstname}
          </div>
          <div className="input-group">
            <label>Last Name:</label>
            <input type="text" name="lastname" value={formik.values.lastname} onChange={formik.handleChange} onBlur={formik.handleBlur} />
          </div>
          <div className='error'>
            {formik.touched.lastname && formik.errors.lastname}
          </div>
          <div className="input-group">
            <label>Email:</label>
            <input type="email" name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
          </div>
          <div className='error'>
            {formik.touched.email && formik.errors.email}
          </div>
          <div className="input-group">
            <label>Mobile:</label>
            <input type="text" name="mobile" value={formik.values.mobile} onChange={formik.handleChange} onBlur={formik.handleBlur} />
          </div>
          <div className='error'>
            {formik.touched.mobile && formik.errors.mobile}
          </div>
          <div className="input-group">
            <label>Password:</label>
            <input type="password" name="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
          </div>
          <div className='error'>
            {formik.touched.password && formik.errors.password}
          </div>
          <button type="submit" className="signup-button">Signup</button>
        </form>
        <div className="additional-info">
          <p>If you already have an account? <button className="login-button" onClick={() => navigate('/login')}>Login</button>.</p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
