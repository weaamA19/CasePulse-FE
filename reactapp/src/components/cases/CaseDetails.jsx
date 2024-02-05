import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import CaseDocumentsList from '../documents/CaseDocumentsList';
import CaseRemindersList from '../reminders/CaseRemindersList';

export default function CaseDetails() {
  const [caseDetails, setCaseDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const { pk } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    loadCaseDetails();
  }, [pk]);

  const loadCaseDetails = () => {
    setLoading(true);
    Axios.get(`http://127.0.0.1:8000/api/cases/${pk}/`)
      .then((response) => {
        setCaseDetails(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const handleUpdate = () => {
    navigate(`/cases/${pk}/update`);
  };

  const handleDelete = () => {
    Axios.delete(`http://127.0.0.1:8000/api/cases/${pk}/delete`)
      .then(() => {
        navigate('/cases');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleToggleStatus = () => {
    const newStatus = caseDetails.status === 'A' ? 'I' : 'A';

    Axios.patch(`http://127.0.0.1:8000/api/cases/${pk}/${newStatus === 'A' ? 'caseactive' : 'caseinactive'}`)
      .then(() => {
        loadCaseDetails();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (loading) {
    return (
      <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

// ... (previous code)

return (
  <div className="d-flex justify-content-center">
    <div className="card col-md-5 m-2 p-2">
      <div className="card-body">
        <h1>{caseDetails.title}</h1>
      </div>
      <div className="card-body">
        <p>Description: {caseDetails.description}</p>
        <p>Status: {caseDetails.status === 'A' ? 'Active' : 'Inactive'}</p>
        <p>Client CPR: {caseDetails.clientCPR}</p>
        <p>Client Email: {caseDetails.clientEmail}</p>
        <p>Start Date: {new Date(caseDetails.case_start_date).toLocaleString()}</p>
        <p>End Date: {caseDetails.case_end_date ? new Date(caseDetails.case_end_date).toLocaleString() : 'N/A'}</p>
      </div>
      <div className="card-footer">
        <button className="btn btn-primary" onClick={handleUpdate}>Update</button>
        <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
        <button className="btn btn-warning" onClick={handleToggleStatus}>
          {caseDetails.status === 'A' ? 'Inactivate' : 'Activate'}
        </button>
      </div>
    </div>

    <div className="card col-md-5 m-2 p-2">
      <CaseDocumentsList pk={pk} />
      <hr style={{ margin: '20px 0' }} />
      <CaseRemindersList pk={pk} />
    </div>
  </div>
);
}
