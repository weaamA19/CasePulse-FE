import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

export default function CasesList() {
  const [casesList, setCasesList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCasesList();
  }, []);

  const loadCasesList = () => {
    Axios.get("http://127.0.0.1:8000/api/usercases/", {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + localStorage.getItem('token'),
      },
    })
      .then((response) => {
        setCasesList(response.data);
        setLoading(false); // Set loading to false when data is loaded
      })
      .catch((err) => {
        console.log(err);
        setLoading(false); // Set loading to false even if an error occurs
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

  if (casesList.length === 0) {
    return (
      <div className="container mt-4">
        <div className="card">
          <div className="card-body">
            <h2 className="card-title">Cases List</h2>
            <p>You still don't have any case(s) registered.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">Cases List</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Status</th>
                <th>Client CPR</th>
                <th>Client Email</th>
                <th>Start Date</th>
                <th>End Date</th>
              </tr>
            </thead>
            <tbody>
              {casesList.map((caseItem, index) => (
                <tr key={index}>
                  <td>
                    <Link to={`/cases/${caseItem.id}/`}>
                      <h3>{caseItem.title}</h3>
                    </Link>
                  </td>
                  <td>{caseItem.description}</td>
                  <td> {caseItem.status === 'A' ? 'Active' : 'Inactive'}</td>
                  <td>{caseItem.clientCPR}</td>
                  <td>{caseItem.clientEmail}</td>
                  <td>{new Date(caseItem.case_start_date).toLocaleString()}</td>
                  <td>{caseItem.case_end_date ? new Date(caseItem.case_end_date).toLocaleString() : 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}