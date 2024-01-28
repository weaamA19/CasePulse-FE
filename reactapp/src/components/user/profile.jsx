import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Profile({ IsRegistered }) {
  const [updateData, setUpdateData] = useState({});

  useEffect(() => {
    // Fetch user data on component mount
    axios.get('http://127.0.0.1:8000/api/auth/user/', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "Token " + localStorage.getItem("token"),
      },
    })
      .then(response => {
        response.data.avatar = response.data.avatar.replace("/api/", "/");
        setUpdateData(response.data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  const handleInputChange = (e) => {
    if (e.target.name === 'avatar') {
      setUpdateData({
        ...updateData,
        [e.target.name]: e.target.files[0],
      });
    } else {
      setUpdateData({
        ...updateData,
        [e.target.name]: e.target.value,
      });
    }
  };
  

  const handleUpdate = () => {
    
    const formData = new FormData();
    
    if (updateData.first_name !== "") {
      formData.append('first_name', updateData.first_name);
    }
  
    if (updateData.last_name !== "") {
      formData.append('last_name', updateData.last_name);
    }
  
    if (updateData.phone_number !== "") {
      formData.append('phone_number', updateData.phone_number);
    }
  
    // Check if avatar is a File object before appending
    if (updateData.avatar instanceof File) {
      formData.append('avatar', updateData.avatar);
    }
  
    axios.patch('http://127.0.0.1:8000/api/auth/user/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': "Token " + localStorage.getItem("token"),
      },
    })
      .then(response => {
        response.data.avatar = response.data.avatar.replace("/api/", "/");
        setUpdateData(response.data);
      })
      .catch(error => {
        console.error('Error during Update:', error);
      });
  };  

  return (
    <div className="container mt-4">
    <div className="card">
      <div className="card-body">
        <div className="row">
          <div className="col-md-6">
            <div className="image-container">
              <img src={updateData.avatar} className="img-fluid rounded-circle" alt="User Avatar" />
            </div>
          </div>

          <div className="col-md-6">
            <h2 className="mb-4">Profile</h2>
            <form encType="multipart/form-data">
                <div className="mb-3">
                  <label className="form-label">Username:</label>
                  <input type="text" name="username" placeholder={updateData.username} value={updateData.username} readOnly />
                </div>

                <div className="mb-3">
                  <label className="form-label">First Name:</label>
                  <input type="text" name="first_name" placeholder="First Name" value={updateData.first_name} onChange={handleInputChange} className="rounded" />
                </div>

                <div className="mb-3">
                  <label className="form-label">Last Name:</label>
                  <input type="text" name="last_name" placeholder="Last Name" value={updateData.last_name} onChange={handleInputChange} className="rounded" />
                </div>

                <div className="mb-3">
                  <label className="form-label">Phone Number:</label>
                  <input type="text" name="phone_number" placeholder="Phone Number" value={updateData.phone_number} onChange={handleInputChange} className="rounded" />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email Address:</label>
                  <input type="text" name="email" placeholder="Email Address" value={updateData.email} readOnly className="rounded" />
                </div>

                <div className="mb-3">
                <input type="file" name="avatar" onChange={handleInputChange} />
              </div>

              <div className="mb-3">
                <button type="button" onClick={handleUpdate} className="btn btn-primary me-2">Update Profile</button>
                <Link to="/changepassword">
                  <button className="btn btn-secondary" style={{ marginLeft: '8px' }}>Change Password</button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}
