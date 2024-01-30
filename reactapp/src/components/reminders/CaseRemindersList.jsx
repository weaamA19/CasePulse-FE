import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';


export default function CaseRemindersList({ pk }) {
    const [reminders, setReminders] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      loadReminders();
    }, [pk]);
  
    const loadReminders = () => {
      Axios.get(`http://127.0.0.1:8000/api/cases/${pk}/reminders/`)
        .then((response) => {

        // Get the user's browser timezone
        const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

        // Format the date/time in each reminder with the user's timezone
        const formattedReminders = response.data.map((reminder) => ({
          ...reminder,
          created_at: new Date(reminder.created_at).toLocaleString('en-US', { timeZone: userTimeZone }),
          updated_at: new Date(reminder.updated_at).toLocaleString('en-US', { timeZone: userTimeZone }),
          datetime: new Date(reminder.datetime).toLocaleString('en-US', { timeZone: userTimeZone }),
        }));
  
          setReminders(formattedReminders);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    };
    
    const handleAddingReminder = () => {
        navigate(`/cases/${pk}/reminders/create`);
      };
    
      const handleDelete = (reminderId) => {
        Axios.delete(`http://127.0.0.1:8000/api/reminders/${reminderId}/delete`)
          .then(() => {
            // Remove the deleted reminder from the state
            setReminders(reminders.filter((doc) => doc.id !== reminderId));
          })
          .catch((error) => {
            console.error(error);
            
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
        <div>
          <h2>Case Reminders</h2>
          <div className="table-responsive">
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Date</th>
                  <th>Created By</th>
                  <th>Updated By</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {reminders.map((reminder) => (
                  <tr key={reminder.id}>
                    <td>
                      <Link to={`/reminders/${reminder.id}`}>{reminder.title}</Link>
                    </td>
                    <td>{reminder.description}</td>
                    <td>{reminder.datetime}</td>
                    <td>{reminder.created_at}</td>
                    <td>{reminder.updated_at}</td>
                    <td>
                      <div className="d-flex">
                        <Link to={`/reminders/${reminder.id}/update`}>
                          <button className="btn btn-warning mx-1">
                            <i className="bi bi-pencil-square"></i>
                          </button>
                        </Link>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDelete(reminder.id)}
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="text-center mt-3">
            <button
              className="btn btn-primary"
              onClick={handleAddingReminder}
              style={{ padding: '10px 20px' }}
            >
              Add Reminder
            </button>
          </div>
        </div>
      );
    }