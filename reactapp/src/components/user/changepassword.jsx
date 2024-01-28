import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ReactModal from 'react-modal';
import './modalstyles.css';

export default function ChangePassword() {
  const [passwords, setPasswords] = useState({
    old_password: '',
    new_password1: '',
    new_password2: '',
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState({ type: '', message: '' });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setPasswords({
      ...passwords,
      [e.target.name]: e.target.value,
    });
  };

  const handleModalClose = () => {
    setModalVisible(false);
    if (modalContent.type === 'success') {
      navigate('/profile');
    } else {
      console.error('Error occurred:', modalContent.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwords.new_password1 !== passwords.new_password2) {
      setModalContent({ type: 'error', message: "New passwords don't match" });
      setModalVisible(true);
      return;
    }

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/auth/password/change/',
        passwords,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + localStorage.getItem('token'),
          },
        }
      );
      setModalContent({ type: 'success', message: 'Password changed successfully' });
      setModalVisible(true);
    } catch (error) {
      setModalContent({ type: 'error', message: `Error changing password: ${error.response.data}` });
      setModalVisible(true);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">Change Password</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="old_password" className="form-label">Old Password:</label>
              <input
                type="password"
                name="old_password"
                value={passwords.old_password}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="new_password1" className="form-label">New Password:</label>
              <input
                type="password"
                name="new_password1"
                value={passwords.new_password1}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="new_password2" className="form-label">Confirm New Password:</label>
              <input
                type="password"
                name="new_password2"
                value={passwords.new_password2}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary">Change Password</button>
          </form>

          {/* ReactModal */}
          <ReactModal
            isOpen={modalVisible}
            onRequestClose={handleModalClose}
            className={`custom-modal ${modalContent.type}`}
            overlayClassName="custom-overlay"
            contentLabel="Modal"
          >
            <span className="close" onClick={handleModalClose}>&times;</span>
            <p>{modalContent.message}</p>
          </ReactModal>
        </div>
      </div>
    </div>
  );
}
