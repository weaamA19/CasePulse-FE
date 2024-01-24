import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import RegistrationForm from './components/user/registration';
import LoginForm from './components/user/login';
import About from './components/aboutus';
// import Home from './components/home'; 
// import AddReminderCases from './components/addReminderCases'; 
// import AddCases from './components/addCases'; 
// import Reminders from './components/reminders'; 
// import Profile from './components/profile'; 
import './App.css';
import axios from 'axios';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  const handleLogout = () => {
    axios.post('http://127.0.0.1:8000/api/auth/logout/', null, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "Token " + localStorage.getItem("token"),
      },
    })
    .then(response => {
      setIsLoggedIn(false);
      localStorage.removeItem('token');
    })
    .catch(error => {
      console.error('Error during logout:', error);
    });
  };

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/about">About</Link>
            </li>
            {isLoggedIn ? (
              <>
                <li><Link to="/home">Home</Link></li>
                <li><Link to="/add-reminder-cases">Add Reminder Cases</Link></li>
                <li><Link to="/add-cases">Add Cases</Link></li>
                <li><Link to="/reminders">Reminders</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                <li><button onClick={handleLogout}>Logout</button></li>
              </>
            ) : (
              <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
              </>
            )}
          </ul>
        </nav>

        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<LoginForm setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/register" element={<RegistrationForm setIsRegistered={setIsRegistered} />} />
          <Route path="/home" element={<About />} /> 
          <Route path="/add-reminder-cases" element={<About />} />
          <Route path="/add-cases" element={<About />} />
          <Route path="/reminders" element={<About />} />
          <Route path="/profile" element={<About />} />


                    {/* <Route path="/about" element={<About />} />
          <Route path="/login" element={<LoginForm setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/home" element={<Home />} /> 
          <Route path="/add-reminder-cases" element={<AddReminderCases />} />
          <Route path="/add-cases" element={<AddCases />} />
          <Route path="/reminders" element={<Reminders />} />
          <Route path="/profile" element={<Profile />} /> */}
        </Routes>
      </div>
    </Router>
  );
}