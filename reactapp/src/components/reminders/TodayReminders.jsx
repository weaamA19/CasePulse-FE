import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

export default function TodayReminders() {
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    Axios.get('http://127.0.0.1:8000/api/reminders/today', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + localStorage.getItem('token'),
      },
    })
      .then((response) => {
        console.log(response.data)
        setReminders(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const isTimePassed = (datetime) => {
    const currentDatetime = new Date();
    const reminderDatetime = new Date(datetime);
    return currentDatetime > reminderDatetime;
  };

  const getCardColor = (datetime) => {
    return isTimePassed(datetime) ? 'bg-danger-light' : 'bg-success-light';
  };

  const getStatusText = (datetime) => {
    return isTimePassed(datetime) ? 'Time Out!' : 'In Progress';
  };

  return (
    <div className="container mt-4">
      <div className="row">
        {reminders.map((reminder) => (
          <div key={reminder.id} className="col-md-4 mb-4">
            <div className={`card ${getCardColor(reminder.datetime)}`}>
              <div className="card-body">
                <h5 className="card-title text-muted">{getStatusText(reminder.datetime)}</h5>
                <hr />
                <p className="card-text">{reminder.title}</p>
                <p className="card-text">{reminder.description}</p>
                <p className="card-text">
                  Date: {new Date(reminder.datetime).toLocaleDateString()}
                </p>
                <p className="card-text">
                  Time: {new Date(reminder.datetime).toLocaleTimeString()}
                </p>
                <Link to={`/cases/${reminder.case_id}`} className="btn btn-dark">
                  View Case Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}