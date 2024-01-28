// LoginForm Component
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function LoginForm({ setIsLoggedIn }) {
  const navigate = useNavigate()
  const initialLoginData = {
    username: '',
    password: '',
  };

  const [loginData, setLoginData] = useState(initialLoginData);

  const handleInputChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = (event) => {
    event.preventDefault();
    axios.post('http://127.0.0.1:8000/api/auth/login/', loginData)
      .then(response => {
        if (response) {
          setIsLoggedIn(true);
          localStorage.setItem('token', response.data.key);
          setLoginData(initialLoginData); // Reset form fields to their initial state
          navigate('/about');
        } else {
          console.error('Login failed:', response.data);
        }
      })
      .catch(error => {
        console.error('Error during login:', error);
      });
  };
  
  return (
    <div className="container d-flex align-items-center justify-content-center vh-100">
      <div className="card w-75">
        <div className="card-body">
          <h2 className="text-primary text-center mb-4">Login</h2>
          <form>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={loginData.username}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={loginData.password}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <button type="button" onClick={handleLogin} className="btn btn-primary w-100 rounded-pill">Log In</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
