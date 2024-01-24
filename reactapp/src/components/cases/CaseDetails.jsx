import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function CaseDetails() {
  const [caseDetails, setCaseDetails] = useState({});
  const { pk } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    loadCaseDetails();
  }, [pk]);

  const loadCaseDetails = () => {
    Axios.get(`http://127.0.0.1:8000/api/cases/${pk}/`)
      .then((response) => {
        console.log(response);
        setCaseDetails(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdate = () => {
    navigate(`/cases/${pk}/update`);
  };
  

  const handleDelete = () => {
    Axios.delete(`http://127.0.0.1:8000/api/cases/${pk}/delete`)
      .then((response) => {
        console.log(response);
        navigate('/cases');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleToggleStatus = () => {
    const newStatus = caseDetails.status === 'A' ? 'I' : 'A';

    Axios.post(`http://127.0.0.1:8000/api/cases/${pk}/${newStatus === 'A' ? 'caseactive' : 'caseinactive'}`)
      .then((response) => {
        console.log(response);
        // Refresh the case details after toggling status
        loadCaseDetails();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Handle the case when data is still being fetched
  if (!Object.keys(caseDetails).length) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div className="card mx-auto col-md-7">
        <div className="card-body">
          <h1>{caseDetails.title}</h1>
        </div>
        <div className="card-body">
          <p>Description: {caseDetails.description}</p>
          <p>Status: {caseDetails.status}</p>
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
    </div>
  );
}
