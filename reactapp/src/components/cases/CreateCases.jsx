import React, { useState } from 'react';
import axios from 'axios';

export default function CreateCases() {
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
    <div>
      <h2>Create Case</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input type="text" name="title" value={formData.title} onChange={handleChange} required />

        <label htmlFor="description">Description:</label>
        <textarea name="description" value={formData.description} onChange={handleChange} required />

        <label htmlFor="clientCPR">Client CPR:</label>
        <input type="text" name="clientCPR" value={formData.clientCPR} onChange={handleChange} required />

        <label htmlFor="clientEmail">Client Email:</label>
        <input type="email" name="clientEmail" value={formData.clientEmail} onChange={handleChange} required />

        <button type="submit">Create Case</button>
      </form>
    </div>
  );
}
