import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link } from 'react-router-dom';
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
        console.log(response)
        console.log("response.data.avatar", response.data.avatar)
        response.data.avatar = response.data.avatar.replace("/api/","/")
        console.log("response.data.avatar", response.data.avatar)
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
    console.log("updateData", updateData)
    formData.append('first_name', updateData.first_name);
    formData.append('last_name', updateData.last_name);
    formData.append('phone_number', updateData.phone_number);
    formData.append('avatar', updateData.avatar);

    axios.patch('http://127.0.0.1:8000/api/auth/user/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': "Token " + localStorage.getItem("token"),
      },
    })
      .then(response => {
        console.log('response - updated data', response);
        if (response) {
          // Assuming the server response contains the updated user data
            console.log("response.data.avatar", response.data.avatar)
          response.data.avatar = response.data.avatar.replace("/api/","/")
          console.log("response.data.avatar", response.data.avatar)

          setUpdateData(response.data);
        } else {
          console.error('Update failed:', response.data);
        }
      })
      .catch(error => {
        console.error('Error during Update:', error);
      });
  };

  return (
    <div>
      <h2>Profile</h2>
      <form encType="multipart/form-data">
        <label >Username:</label>
        <input type="text" name="username" placeholder={updateData.username} value={updateData.username} readOnly />

        <label >First Name:</label>
        <input type="text" name="first_name" placeholder="First Name" value={updateData.first_name} onChange={handleInputChange} />
        
        <label >Last Name:</label>
        <input type="text" name="last_name" placeholder="Last Name" value={updateData.last_name} onChange={handleInputChange} />
        
        <label >Phone Number:</label>
        <input type="text" name="phone_number" placeholder="Phone Number" value={updateData.phone_number} onChange={handleInputChange} />
        
        <label >Email Address:</label>
        <input type="text" name="email" placeholder="Email Address" value={updateData.email} readOnly />
        
        <label >Profile Picture:</label>
        <img src={updateData.avatar} style={{ width: '100px', height: '100px' }} alt="User Avatar" />
        <input type="file" name="avatar" onChange={handleInputChange} />

        <button type="button" onClick={handleUpdate}>
          Update Profile
        </button>   
      </form>
      
      <Link to="/changepassword"><button> Change Password</button> </Link>

    </div>
  );
}