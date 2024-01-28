import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import CaseDocumentsList from '../documents/CaseDocumentsList';

export default function CaseDetails() {
  const [caseDetails, setCaseDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const { pk } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    loadCaseDetails();
  }, [pk]);

  const loadCaseDetails = () => {
    setLoading(true); // Set loading to true when starting to fetch data
    Axios.get(`http://127.0.0.1:8000/api/cases/${pk}/`)
      .then((response) => {
        console.log(response);
        setCaseDetails(response.data);
        setLoading(false); // Set loading to false when data is loaded
      })
      .catch((err) => {
        console.log(err);
        setLoading(false); // Set loading to false even if an error occurs
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

    Axios.patch(`http://127.0.0.1:8000/api/cases/${pk}/${newStatus === 'A' ? 'caseactive' : 'caseinactive'}`)
      .then((response) => {
        console.log(response);
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

  return (
    <div className="d-flex flex-column align-items-center">
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
      </div>
    </div>
  );
}
