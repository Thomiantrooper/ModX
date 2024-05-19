import React, { useState, useEffect } from 'react';
import './profile.css'; // Import the CSS file
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../features/user/userSlice';
import { LiaUserEditSolid } from "react-icons/lia";

const profileSchema = yup.object({
  firstname: yup.string().required("Firstname is required"),
  lastname: yup.string().required("Lastname is required"),
  email: yup.string().email("Email should be valid").required("Email is required"),
  mobile: yup.string().required("Mobile is required"),
});

const Profile = () => {
  const dispatch = useDispatch();
  const userState = useSelector(state => state.auth.user);
  const [edit, setEdit] = useState(true);
  const [image, setImage] = useState(null);
  const [loginTime, setLoginTime] = useState(localStorage.getItem('loginTime') || '');
  const [logoutTime, setLogoutTime] = useState('');

  let userRole = '';

  useEffect(() => {
    const currentTime = new Date().toLocaleString();
    setLoginTime(currentTime);
    localStorage.setItem('loginTime', currentTime);

    return () => {
      handleLogout();
    };
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstname: userState?.firstname || '',
      lastname: userState?.lastname || '',
      email: userState?.email || '',
      mobile: userState?.mobile || '',
    },
    validationSchema: profileSchema,
    onSubmit: (values) => {
      dispatch(updateProfile(values));
      setEdit(true);
    },
  });

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = () => {
    const currentTime = new Date().toLocaleString();
    setLogoutTime(currentTime);
    localStorage.setItem('logoutTime', currentTime);
    localStorage.removeItem('loginTime');
    localStorage.clear();
    window.location.href = '/';
  };

  if (userState?.email === 'klassen100@gmail.com') {
    userRole = 'admin';
  } else {
    userRole = 'user';
  }

  return (
    <div className="profile-container">
      <div className="profile-content">
        <div className="profile-header">
          <h1>Update Profile</h1>
          <LiaUserEditSolid
            onClick={() => setEdit(false)}
            style={{ fontSize: '24px' }}
          />
        </div>
        <div className="profile-form">
          <form onSubmit={formik.handleSubmit}>
            <div className="profile-form-group">
              <label htmlFor="firstName" className="profile-label">First Name:</label>
              <input type="text" disabled={edit} id="firstName" name="firstname" value={formik.values.firstname} onChange={formik.handleChange} onBlur={formik.handleBlur} className="profile-input" />
              <div className='error'>{formik.touched.firstname && formik.errors.firstname}</div>
            </div>
            <div className="profile-form-group">
              <label htmlFor="lastName" className="profile-label">Last Name:</label>
              <input type="text" disabled={edit} id="lastName" name="lastname" value={formik.values.lastname} onChange={formik.handleChange} onBlur={formik.handleBlur} className="profile-input" />
              <div className='error'>{formik.touched.lastname && formik.errors.lastname}</div>
            </div>
            <div className="profile-form-group">
              <label htmlFor="email" className="profile-label">Email:</label>
              <input type="email" disabled={edit} id="email" name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} className="profile-input" />
              <div className='error'>{formik.touched.email && formik.errors.email}</div>
            </div>
            <div className="profile-form-group">
              <label htmlFor="mobile" className="profile-label">Mobile:</label>
              <input type="tel" disabled={edit} id="mobile" name="mobile" value={formik.values.mobile} onChange={formik.handleChange} onBlur={formik.handleBlur} className="profile-input" />
              <div className='error'>{formik.touched.mobile && formik.errors.mobile}</div>
            </div>
            {
              edit === false && <button type="submit" className="profile-button">Save</button>
            }
          </form>
        </div>
      </div>
      <div className="profile-sidebar">
        <div className="profile-image-uploader">
          <h2>Profile Picture</h2>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            id="imageUpload"
            style={{ display: 'none' }}
          />
          <label htmlFor="imageUpload" className="image-upload-label">
            {image ? (
              <img src={image} alt="Profile" className="profile-image" />
            ) : (
              <div className="upload-placeholder">Upload Image</div>
            )}
          </label>
          <div className="user-details-container">
            <h2>User Shopping Details</h2>
            <p>Orders: <span> <h3> "Gear up for safety and style with our premium selection of helmets!" </h3></span></p>
            <p>Rating: <span><h3>"Unlock a world of safety and rewards! Start your journey to becoming a platinum user with 
            top-notch ratings and earn exclusive rewards and points along the way."</h3></span></p>
          </div>
        </div>
        <div className="profile-role-time">
          <div className="profile-role">
            <h2>Role:</h2>
            <p>{userRole}</p>
          </div>
          <div className="profile-time">
            <h2>Login Time:</h2>
            <p>{loginTime}</p>
            {logoutTime && (
              <>
                <h2>Logout Time:</h2>
                <p>{logoutTime}</p>
              </>
            )}
          </div>
        </div>
        <button className='btn' onClick={handleLogout}>LOGOUT</button>
      </div>
    </div>
  );
};

export default Profile;
