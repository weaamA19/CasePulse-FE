import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function DocumentUpdate() {  // Corrected 'fucntion' to 'function'
  const { pk } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({});
  
  const [originalFile, setOriginalFile] = useState(null);

  useEffect(() => {
    // Fetch existing document data for pre-filling the form
    Axios.get(`http://127.0.0.1:8000/api/documents/${pk}/`)
      .then((response) => {
        setFormData(response.data);
        setOriginalFile(response.data.file_path); // Save the original file data
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

    // Check if the file has changed, if not, use the original file
    if (formData.file_path && formData.file_path !== originalFile) {
      data.append('file_path', formData.file_path);
    }

    Axios.patch(`http://127.0.0.1:8000/api/documents/${pk}/update`, data)
      .then((response) => {
        console.log(response.data);
        navigate(`/cases`);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  if (!formData.title) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container d-flex justify-content-center align-items-center">
      <div className="card mx-auto" style={{ maxWidth: "1000px", margin: "0" }}>
        <div className="card-body">
          <h2 className="card-title text-center">Update Document</h2>
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
