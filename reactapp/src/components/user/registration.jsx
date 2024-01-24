import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate} from 'react-router-dom';

export default function RegistrationForm({ setIsRegistered }) {
  const [registrationData, setRegistrationData] = useState({ });
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    if (e.target.name === 'avatar') {
      // If the input is the avatar field, update the file object
      setRegistrationData({
        ...registrationData,
        [e.target.name]: e.target.files[0],
      });
    } else {
      console.log(e.target.name, e.target.value);
      // For other fields, update as usual
      setRegistrationData({
        ...registrationData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleRegistration = async () => {
    try {
      console.log('registration data', registrationData);
      const formData = new FormData();
      formData.append('username', registrationData.username);
      formData.append('password1', registrationData.password);
      formData.append('password2', registrationData.password);
      formData.append('first_name', registrationData.first_name);
      formData.append('last_name', registrationData.last_name);
      formData.append('phone_number', registrationData.phone_number);
      formData.append('email_address', registrationData.email_address);
      formData.append('avatar', registrationData.avatar);
  
      const response = await axios.post('http://127.0.0.1:8000/api/auth/register', formData,
       {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('response - register', response);
      if (response.status === 204) {
        setIsRegistered(true);
        navigate('/about')
      } else {
        console.error('Registration failed:', response.data);
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };  

  return (
    <div>
      <h2>Register</h2>
      <form encType="multipart/form-data">
        <input type="text" name="username" placeholder="Username" onChange={handleInputChange} />
        <input type="password" name="password1" placeholder="Password" onChange={handleInputChange} />
        <input type="password" name="password2" placeholder="Re-Confirm Password" onChange={handleInputChange} />
        <input type="text" name="first_name" placeholder="First Name" onChange={handleInputChange} />
        <input type="text" name="last_name" placeholder="Last Name" onChange={handleInputChange} />
        <input type="text" name="phone_number" placeholder="Phone Number" onChange={handleInputChange} />
        <input type="text" name="email" placeholder="Email Address" onChange={handleInputChange} />
        <input type="file" name="avatar" onChange={handleInputChange} accept="image/*" />
        <button type="button" onClick={handleRegistration}>
            Register
        </button>        
      </form>
      <Link to="/login">Already have an account? Login</Link>
    </div>
  );
}
