import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useParams } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

export default function DocumentDetails() {
  const [documentDetails, setDocumentDetails] = useState({});
  const { pk } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDocumentDetails();
  }, [pk]);

  const loadDocumentDetails = () => {
    Axios.get(`http://127.0.0.1:8000/api/documents/${pk}/`)
      .then((response) => {
        console.log(response.data);
        response.data.file_path = response.data.file_path.replace("/api/", "/");
        setDocumentDetails(response.data);
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
          <h2 className="card-title">Document Details</h2>
          <div>
            <strong>Title:</strong> {documentDetails.title}
          </div>
          <div>
            <strong>Description:</strong> {documentDetails.description}
          </div>
          <div>
            <strong>Created At:</strong> {new Date(documentDetails.created_at).toLocaleString()}
          </div>
          <div>
            <strong>Updated At:</strong> {new Date(documentDetails.updated_at).toLocaleString()}
          </div>
          <div>
            <strong>File Path:</strong>{' '}
            {documentDetails.file_path && (
              <a href={`${documentDetails.file_path}`} target="_blank" rel="noopener noreferrer">
                View Document
              </a>
            )}
          </div>
          <div>
            <strong>File Preview:</strong>
            {documentDetails.file_path && (
              <iframe
                title="Document Preview"
                src={`${documentDetails.file_path}`}
                width="100%"
                height="400"
                className="mt-2"
              ></iframe>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}