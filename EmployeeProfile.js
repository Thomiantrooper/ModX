import React, { useState } from 'react';

const EmployeeProfile = () => {
  const [formData, setFormData] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    phone: '1234567890',
    profileImage: null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    const image = e.target.files[0];
    setFormData({
      ...formData,
      profileImage: URL.createObjectURL(image)
    });
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '20px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Employee Profile</h2>
        <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="profileImage" style={{ cursor: 'pointer' }}>
              <div style={{ width: '100px', height: '100px', borderRadius: '50%', overflow: 'hidden', border: '1px solid #ccc', marginBottom: '10px' }}>
                {formData.profileImage && <img src={formData.profileImage} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
              </div>
              <input type="file" id="profileImage" name="profileImage" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
            </label>
          </div>
          <div style={{ marginBottom: '15px', width: '100%' }}>
            <label htmlFor="name" style={{ width: '100px', textAlign: 'right', marginRight: '10px' }}>Name:</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} style={{ flex: '1', marginLeft: '10px', padding: '5px', borderRadius: '5px' }} />
          </div>
          <div style={{ marginBottom: '15px', width: '100%' }}>
            <label htmlFor="email" style={{ width: '100px', textAlign: 'right', marginRight: '10px' }}>Email:</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} style={{ flex: '1', marginLeft: '10px', padding: '5px', borderRadius: '5px' }} />
          </div>
          <div style={{ marginBottom: '15px', width: '100%' }}>
            <label htmlFor="phone" style={{ width: '100px', textAlign: 'right', marginRight: '10px' }}>Phone:</label>
            <input type="number" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} style={{ flex: '1', marginLeft: '10px', padding: '5px', borderRadius: '5px' }} />
          </div>
          <div>
            <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EmployeeProfile;
