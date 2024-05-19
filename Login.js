import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser } from "../features/user/userSlice";
import { useFormik } from "formik";
import * as yup from 'yup';
import { toast } from 'react-toastify';
import './Login.css';

const loginSchema = yup.object({
  email: yup.string().email("Email should be valid").required("Email is required"),
  password: yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
      'Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, and one number'
    )
});

const Login = () => {
  const authState = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (authState.isSuccess) {
      navigate('/home');
    }
    if (authState.error) {
      toast.error(authState.error); // Display error toast if login failed
    }
  }, [authState.isSuccess, authState.error, navigate]);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: loginSchema,
    onSubmit: values => {
      dispatch(loginUser(values));
    },
  });

  const { handleSubmit, handleChange, handleBlur, values, touched, errors } = formik;

  return (
    <div className="center_wrapper">
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email:</label>
            <input
              type="text"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.email && errors.email && (
              <div className='error'>{errors.email}</div>
            )}
          </div>
          <div className="input-group">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.password && errors.password && (
              <div className='error'>{errors.password}</div>
            )}
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
        <div className="additional-info">
          <p>If you haven't signed up yet, click <button className="signup-button"><Link to="/signup">Sign Up</Link></button>.</p>
          <p>If you can't remember your password <Link to="/forgotpassword"> click here</Link>.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
