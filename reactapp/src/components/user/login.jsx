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
  console.log("loginData", loginData)
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
    <div>
      <h2>Login</h2>
      <form>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={loginData.username}
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={loginData.password}
          onChange={handleInputChange}
        />

        <button type="button" onClick={handleLogin}>
          Log In
        </button>
      </form>
    </div>
  );
}
