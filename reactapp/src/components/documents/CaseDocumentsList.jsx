import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

export default function CaseDocumentsList({ pk }) {
  const [documents, setDocuments] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDocuments();
  }, [pk]);

  const loadDocuments = () => {
    Axios.get(`http://127.0.0.1:8000/api/cases/${pk}/documents/`)
      .then((response) => {
        console.log(response.data);
        setDocuments(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const handleAddingDocument = () => {
    navigate(`/cases/${pk}/documents/create`);
  };

  const handleDelete = (documentId) => {
    Axios.delete(`http://127.0.0.1:8000/api/documents/${documentId}/delete`)
      .then(() => {
        // Remove the deleted document from the state
        setDocuments(documents.filter((doc) => doc.id !== documentId));
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
      <h2>Case Documents</h2>
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              {/* <th>File Path</th> */}
              <th>Added By</th>
              <th>Updated By</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((document) => (
              <tr key={document.id}>
                <td>
                  <Link to={`/documents/${document.id}`}>
                    {document.title}
                  </Link>
                </td>
                <td>{document.description}</td>
                {/* <td>{document.file_path}</td> */}
                <td>{document.created_at}</td>
                <td>{document.updated_at}</td>
                <td>
                  <div className="d-flex">
                    <Link to={`/documents/${document.id}/update`}>
                      <button className="btn btn-warning mx-1">
                        <i className="bi bi-pencil-square"></i></button>
                    </Link>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(document.id)}
                    >
                      <i className="bi bi-trash"></i></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="text-center mt-3"> 
        <button className="btn btn-primary" onClick={handleAddingDocument} style={{ padding: '10px 20px' }}>
          Add Document
        </button>
      </div>
    </div>
  );
}