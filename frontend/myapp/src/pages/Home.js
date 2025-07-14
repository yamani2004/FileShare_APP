import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <div
      className="min-vh-100 d-flex justify-content-center align-items-center"
      style={{
        background: 'linear-gradient(135deg, #e0f7fa, #f1f8e9)',
        padding: '20px',
      }}
    >
      <div
        className="card p-5 shadow-lg text-center"
        style={{ maxWidth: '600px', borderRadius: '20px', backgroundColor: '#ffffff' }}
      >
        <h1 className="display-4 fw-bold text-primary">📁 Welcome to FileShare</h1>
        <p className="lead mt-3 text-secondary">
          Securely upload, store, and share files with anyone — in just a few clicks.
        </p>

        <div className="mt-4">
          <Link
            to={isLoggedIn ? "/upload" : "/login"}
            className="btn btn-lg"
            style={{
              backgroundColor: '#007bff',
              color: '#fff',
              fontWeight: '600',
              padding: '10px 30px',
              borderRadius: '8px',
            }}
          >
            {isLoggedIn ? "🚀 Go to Uploads" : "✨ Get Started"}
          </Link>
        </div>

        <img
          src="https://cdn-icons-png.flaticon.com/512/2989/2989836.png"
          alt="File sharing"
          className="img-fluid mt-4"
          style={{ maxWidth: "180px" }}
        />
      </div>
    </div>
  );
};

export default Home;
