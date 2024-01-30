import React, { useState } from 'react';
import Axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function AddReminder() {
  const { pk } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'datetime' ? value : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);

    // Convert the datetime to UTC before sending to the server
    const localDatetime = new Date(formData.datetime);
    data.append('datetime', localDatetime.toISOString());

    Axios.post(`http://127.0.0.1:8000/api/cases/${pk}/reminders/create/`, data)
      .then((response) => {
        console.log(response.data);
        navigate(`/cases/${pk}`);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center">
      <div className="card mx-auto" style={{ maxWidth: "1000px", margin: "0" }}>
        <div className="card-body">
          <h2 className="card-title text-center">Add Reminder</h2>
          <form onSubmit={handleSubmit} className="needs-validation">
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title:
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={formData.title || ''}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description:
              </label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                value={formData.description || ''}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="mb-3">
              <label htmlFor="datetime" className="form-label">
                Select a Date:
              </label>

              <input
                type="datetime-local"
                id="datetime"
                name="datetime"
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="text-center">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
