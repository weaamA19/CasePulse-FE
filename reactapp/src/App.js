import React, { useState } from 'react';
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


import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
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
      <nav className="navbar navbar-dark bg-secondary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Case Pulse</Link>
          {/* <Link to="/">
            <img
              src="http://127.0.0.1:8000/static/uploads/logo.jpg"
              alt="Case Pulse Logo"
              style={{ width: '150px', height: 'auto' }}
            />
          </Link> */}
          <ul className="navbar-nav d-flex">
            {isLoggedIn ? (
              <>
                <div className="d-flex">
                  <li className="nav-item"><Link className="nav-link text-white mx-2 font-weight-bold" to="/add-reminder">Add Reminder </Link></li>
                  <li className="nav-item"><Link className="nav-link text-white mx-2 font-weight-bold" to="/add-cases">Add Cases</Link></li>
                  <li className="nav-item"><Link className="nav-link text-white mx-2 font-weight-bold" to="/cases"> Cases</Link></li>
                  <li className="nav-item"><Link className="nav-link text-white mx-2 font-weight-bold" to="/reminders">Reminders</Link></li>
                  <li className="nav-item"><Link className="nav-link text-white mx-2 font-weight-bold" to="/profile">Profile</Link></li>
                  <li className="nav-item"><button className="btn btn-danger" onClick={handleLogout}>Logout</button></li>
                </div>

              </>
            ) : (
              <div className="d-flex">
                <li className="nav-item"><Link className="nav-link text-white mx-2 font-weight-bold" to="/">Home</Link></li>
                <li className="nav-item"><Link className="nav-link text-white mx-2 font-weight-bold" to="/about">About Us</Link></li>     
                <li className="nav-item"><Link className="nav-link text-white mx-2 font-weight-bold" to="/login">Login</Link></li>
                <li className="nav-item"><Link className="nav-link text-white mx-2 font-weight-bold" to="/register">Register</Link></li>
              </div>
            )}
          </ul>
        </div>
      </nav>



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
        <Route path="/reminders" element={<About />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/changepassword" element={<ChangePassword />} />
        <Route path="/cases/:pk" element={<CaseDetails />} />
        <Route path="/cases/:pk/update" element={<CaseUpdate />} />
        <Route path="/cases/:pk/documents/create" element={<AddDocument />} />
        <Route path="/documents/:pk/update" element={<DocumentUpdate />} />
        <Route path="/documents/:pk/" element={<DocumentDetails />} />
        
        </> 
        )}

      </Routes>
      <Footer />
      </div>
    </Router>
  );
}