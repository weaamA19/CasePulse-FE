import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function ReminderUpdate() {
  const { pk } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Axios.get(`http://127.0.0.1:8000/api/reminders/${pk}/`)
      .then((response) => {
        // Get the user's browser timezone
        const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  
        // Format the datetime string manually to match "yyyy-MM-ddThh:mm" format
        const datetime = new Date(response.data.datetime);
        const formattedDatetime = `${datetime.getFullYear()}-${(datetime.getMonth() + 1)
          .toString()
          .padStart(2, '0')}-${datetime.getDate().toString().padStart(2, '0')}T${datetime
          .getHours()
          .toString()
          .padStart(2, '0')}:${datetime.getMinutes().toString().padStart(2, '0')}`;
  
        setFormData({
          ...response.data,
          datetime: formattedDatetime,
        });
  
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [pk]);  


  const handleChange = (e) => {
    const { name, value } = e.target;
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
  
    // Convert the datetime back to UTC before sending to the server
    const localDatetime = new Date(formData.datetime);
    data.append('datetime', localDatetime.toISOString());
  
    Axios.patch(`http://127.0.0.1:8000/api/reminders/${pk}/update`, data)
      .then((response) => {
        console.log(response.data);
        navigate(`/cases`);
      })
      .catch((error) => {
        console.error(error);
      });
  };  

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // Get the user's browser timezone
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return (
    <div className="container d-flex justify-content-center align-items-center">
      <div className="card mx-auto" style={{ maxWidth: "1000px", margin: "0" }}>
        <div className="card-body">
          <h2 className="card-title text-center">Update Reminder</h2>
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
                Select a Date and Time:
              </label>

              <input
                type="datetime-local"
                id="datetime"
                name="datetime"
                value={formData.datetime || ''}
                onChange={handleChange}
                className="form-control"
                // Setting the timezone attribute to the user's browser timezone
                timeZone={userTimeZone}
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