import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useParams } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

export default function ReminderDetails() {
  const [reminderDetails, setReminderDetails] = useState({});
  const { pk } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReminderDetails();
  }, [pk]);

  const loadReminderDetails = () => {
    Axios.get(`http://127.0.0.1:8000/api/reminders/${pk}/`)
      .then((response) => {
        console.log(response.data);
        setReminderDetails(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

if (loading) {
    return (
      <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">Reminder Details</h2>
          <div>
            <strong>Title:</strong> {reminderDetails.title}
          </div>
          <div>
            <strong>Description:</strong> {reminderDetails.description}
          </div>
          <div>
            <strong>Date:</strong> {new Date(reminderDetails.datetime).toLocaleString()}
          </div>
          <div>
            <strong>Created At:</strong> {new Date(reminderDetails.created_at).toLocaleString()}
          </div>
          <div>
            <strong>Updated At:</strong> {new Date(reminderDetails.updated_at).toLocaleString()}
          </div>

        </div>
      </div>
    </div>
  );
}