import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import RegistrationForm from './components/user/registration';
import LoginForm from './components/user/login';
import About from './components/aboutus';
import Profile from './components/user/profile';
import ChangePassword from './components/user/changepassword';
import CasesList from './components/cases/CasesList';
import CreateCases from './components/cases/CreateCases';
import CaseDetails from './components/cases/CaseDetails';
import CaseUpdate from './components/cases/CaseUpdate';
import AddDocument from './components/documents/AddDocument';
import DocumentUpdate from './components/documents/DocumentUpdate';
import DocumentDetails from './components/documents/DocumentDetails';
import Footer from './components/footer';
import Home from './components/home';
import AddReminder from './components/reminders/AddReminder';
import ReminderUpdate from './components/reminders/ReminderUpdate';
import ReminderDetails from './components/reminders/ReminderDetails';
import TodayReminders from './components/reminders/TodayReminders';

import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';
import axios from 'axios';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    // Check for the existence of a token in local storage
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      // Token exists, the user is logged in
      setIsLoggedIn(true);
    }
  }, []);

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
        <nav className="navbar navbar-dark bg-secondary">
          <div className="container-fluid">
            {/* <Link className="navbar-brand" to="/">Case Pulse</Link> */}
              {isLoggedIn ? (
                <>
                  <Link className="navbar-brand" to="/about">Case Pulse</Link>
                  <ul className="navbar-nav d-flex">
                  <div className="d-flex">
                    
                    <li className="nav-item"><Link className="nav-link text-white mx-2 font-weight-bold" to="/add-cases">Add Cases</Link></li>
                    <li className="nav-item"><Link className="nav-link text-white mx-2 font-weight-bold" to="/cases"> Cases</Link></li>
                    <li className="nav-item"><Link className="nav-link text-white mx-2 font-weight-bold" to="/todayreminders">Reminders</Link></li>
                    <li className="nav-item"><Link className="nav-link text-white mx-2 font-weight-bold" to="/profile">Profile</Link></li>
                    <li className="nav-item"><button className="btn btn-danger" onClick={handleLogout}>Logout</button></li>
                  </div>
                  </ul>
                </>
              ) : (
                <>
                <Link className="navbar-brand" to="/">Case Pulse</Link>
                <ul className="navbar-nav d-flex">
                  <div className="d-flex">
                    <li className="nav-item"><Link className="nav-link text-white mx-2 font-weight-bold" to="/">Home</Link></li>
                    <li className="nav-item"><Link className="nav-link text-white mx-2 font-weight-bold" to="/about">About Us</Link></li>     
                    <li className="nav-item"><Link className="nav-link text-white mx-2 font-weight-bold" to="/login">Login</Link></li>
                    <li className="nav-item"><Link className="nav-link text-white mx-2 font-weight-bold" to="/register">Register</Link></li>
                  </div>
                </ul>
                </>
              )}
          </div>
        </nav>
        
        <div style={{ margin: '50px'}}>
          <Routes>

            <Route path="/about" element={<About />} />
            <Route path="/login" element={<LoginForm setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/register" element={<RegistrationForm setIsRegistered={setIsRegistered} />} />
            <Route path="/" element={<Home />} /> 
            {isLoggedIn && (
              <>
            <Route path="/add-reminder" element={<About />} />
            <Route path="/add-cases" element={<CreateCases />} />
            <Route path="/cases" element={<CasesList />} />
            <Route path="/todayreminders" element={<TodayReminders />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/changepassword" element={<ChangePassword />} />
            <Route path="/cases/:pk" element={<CaseDetails />} />
            <Route path="/cases/:pk/update" element={<CaseUpdate />} />
            <Route path="/cases/:pk/documents/create" element={<AddDocument />} />
            <Route path="/documents/:pk/update" element={<DocumentUpdate />} />
            <Route path="/documents/:pk/" element={<DocumentDetails />} />

            <Route path="/cases/:pk/reminders/create" element={<AddReminder />} />
            <Route path="/reminders/:pk/update" element={<ReminderUpdate />} />
            <Route path="/reminders/:pk/" element={<ReminderDetails />} />
            </> 
            )}

          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}