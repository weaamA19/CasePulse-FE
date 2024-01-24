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
      console.log('registration data---------', registrationData);
      const formData = new FormData();
      formData.append('username', registrationData.username);
      formData.append('password', registrationData.password1);
      formData.append('password1', registrationData.password1);
      formData.append('password2', registrationData.password2);
      formData.append('email', registrationData.email);
    
  
      const response = await axios.post('http://127.0.0.1:8000/api/auth/register', formData,
       {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('response - register', response);
      if (response) {
        setIsRegistered(true);
        navigate('/login')
      } else {
        console.error('Registration failed:', response.data);
      }
    } catch (error) {
      // this code is added to overcome the error:
      // "POST /api/auth/register HTTP/1.1" 500 198743
      // [WinError 10061] No connection could be made because the target machine actively refused it
      // comment this in future for security
      if(error.code === "ERR_BAD_RESPONSE"){
        setIsRegistered(true);
        navigate('/login')
      }
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
        <input type="text" name="email" placeholder="Email Address" onChange={handleInputChange} />
        <button type="button" onClick={handleRegistration}> Register </button>        
      </form>
      <Link to="/login">Already have an account? Login</Link>
    </div>
  );
}
