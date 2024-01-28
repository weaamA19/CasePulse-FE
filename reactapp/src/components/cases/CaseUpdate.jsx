import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function CaseUpdate() {
  const [caseDetails, setCaseDetails] = useState({});
  const [formData, setFormData] = useState({});
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
        setFormData({
          title: response.data.title,
          description: response.data.description,
          clientCPR: response.data.clientCPR,
          clientEmail: response.data.clientEmail,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleInputChange = (e) => {
    console.log(e);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(e);

    Axios.patch(`http://127.0.0.1:8000/api/cases/${pk}/update`, formData)
      .then((response) => {
        console.log(response);
        navigate(`/cases/${pk}`);
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
          <h1>Update Case: {caseDetails.title}</h1>
        </div>
        <div className="card-body">
          <form onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label>Title:</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Description:</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="form-control"
              ></textarea>
            </div>

            <div className="form-group">
                <label>Client CPR:</label>
                <input
                    type="text"
                    name="clientCPR"
                    value={formData.clientCPR}
                    onChange={handleInputChange}
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <label>Client Email:</label>
                <input
                    type="text"
                    name="clientEmail"
                    value={formData.clientEmail}
                    onChange={handleInputChange}
                    className="form-control"
                />
            </div>
            <button type="submit" className="btn btn-primary">
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}