import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function AddDocument() {
  const { pk } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({});
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    Axios.get(`http://127.0.0.1:8000/api/cases/${pk}/documents/`)
      .then((response) => {
        setDocuments(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [pk]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'file_path' ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('file_path', formData.file_path);

    Axios.post(`http://127.0.0.1:8000/api/cases/${pk}/documents/create/`, data)
      .then((response) => {
        console.log(response.data);
        navigate(`/cases/${pk}`);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  

  return (
    <div className="container d-flex justify-content-center align-items-center">
    <div className="card mx-auto" style={{ maxWidth: "1000px", margin: "0" }}>
      <div className="card-body">
        <h2 className="card-title text-center">Add Document</h2>
          <form onSubmit={handleSubmit} className="needs-validation">
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title:
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={formData.title || ''}
                onChange={handleChange}
                required
              />
            </div>
  
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description:
              </label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                value={formData.description || ''}
                onChange={handleChange}
              ></textarea>
            </div>
  
            <div className="mb-3">
              <label htmlFor="file_path" className="form-label">
                File:
              </label>
              <input
                type="file"
                className="form-control"
                id="file_path"
                name="file_path"
                onChange={handleChange}
              />
            </div>
  
            <div className="text-center">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );  
}