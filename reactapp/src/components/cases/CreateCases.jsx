import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function CreateCases() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    clientCPR: '',
    clientEmail: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/cases/create/',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + localStorage.getItem('token'),
          },
        }
      );

      console.log('Case created successfully:', response.data);

      setFormData({
        title: '',
        description: '',
        clientCPR: '',
        clientEmail: '',
      });

    } catch (error) {
      console.error('Error creating case:', error.response.data);
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">Create Case</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Title:</label>
              <input type="text" name="title" value={formData.title} onChange={handleChange} className="form-control" required />
            </div>

            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description:</label>
              <textarea name="description" value={formData.description} onChange={handleChange} className="form-control" required />
            </div>

            <div className="mb-3">
              <label htmlFor="clientCPR" className="form-label">Client CPR:</label>
              <input type="text" name="clientCPR" value={formData.clientCPR} onChange={handleChange} className="form-control" required />
            </div>

            <div className="mb-3">
              <label htmlFor="clientEmail" className="form-label">Client Email:</label>
              <input type="email" name="clientEmail" value={formData.clientEmail} onChange={handleChange} className="form-control" required />
            </div>

            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <button type="submit" className="btn btn-primary me-md-2">Create Case</button>
              <button type="button" className="btn btn-secondary" onClick={() => navigate('/cases')}>
                View Cases
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
