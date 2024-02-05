import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function RegistrationForm({ setIsRegistered }) {
  const [registrationData, setRegistrationData] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (e) => {
      setRegistrationData({
        ...registrationData,
        [e.target.name]: e.target.value,
      });
  };

  const handleRegistration = async () => {
    try {
      const formData = new FormData();
      formData.append('username', registrationData.username);
      formData.append('password', registrationData.password1);
      formData.append('password1', registrationData.password1);
      formData.append('password2', registrationData.password2);
      formData.append('email', registrationData.email);

      const response = await axios.post('http://127.0.0.1:8000/api/auth/register', formData );

      if (response) {
        setIsRegistered(true);
        navigate('/login');
      } else {
        console.error('Registration failed:', response.data);
      }
    } catch (error) {
      console.log(error)
      if (error.code === 'ERR_BAD_RESPONSE') {
        setIsRegistered(true);
        navigate('/login');
      }
      console.error('Error during registration:', error);
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center vh-100">
      <div className="card w-75">
        <div className="card-body">
          <h1 className="text-primary text-center mb-4 mt-3">Create New Account</h1>
          <form onSubmit={handleRegistration} >
            <div className="row mb-2">
              <div className="col-md-6">
                <label className="form-label">Username</label>
                <input type="text" name="username" placeholder="Username" onChange={handleInputChange} className="form-control" />
              </div>
              <div className="col-md-6">
                <label className="form-label">Email Address</label>
                <input type="text" name="email" placeholder="Email Address" onChange={handleInputChange} className="form-control" />
              </div>
            </div>

            <div className="row mb-2">
              <div className="col-md-6">
                <label className="form-label">Password</label>
                <input type="password" name="password1" placeholder="Password" onChange={handleInputChange} className="form-control" />
              </div>
              <div className="col-md-6">
                <label className="form-label">Re-Confirm Password</label>
                <input type="password" name="password2" placeholder="Re-Confirm Password" onChange={handleInputChange} className="form-control" />
              </div>
            </div>

            <div className="mb-3">
              <button type="button" onClick={handleRegistration} className="btn btn-primary w-100 rounded-pill">Register</button>
            </div>
            <div>
              <p className="text-primary text-center mb-3">Already Registered? <Link to="/login">Login</Link></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
