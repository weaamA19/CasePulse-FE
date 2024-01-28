import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Home ()  {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = "http://127.0.0.1:8000/static/uploads/welcome.jpg";

    img.onload = () => {
      setImageLoaded(true);
    };
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Left Container */}
        <div className="col-md-6 bg-light p-5 d-flex flex-column justify-content-center align-items-center mt-4 mb-4">
          <h1 className="display-2 fw-bold text-black" style={{ fontSize: '4rem' }}>Case Pulse</h1>
          <p className="text-black">Tech-Driven Legal Excellence Ignited</p>
          <div className="mt-4">
            <Link to="/about" className="btn btn-primary me-2">
              About Us
            </Link>
            <Link to="/register" className="btn btn-dark">
              Sign up Now!
            </Link>
          </div>
        </div>

        {/* Right Container */}
        <div className="col-md-6 p-0">
          {imageLoaded && (
            <img
              src="http://127.0.0.1:8000/static/uploads/welcome.jpg"
              alt="Background"
              className="img-fluid"
              style={{ objectFit: 'cover', height: '100%', width: '100%' }}
            />
          )}
        </div>
      </div>
    </div>
  );
};
