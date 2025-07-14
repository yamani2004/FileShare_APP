import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark px-4"
      style={{
        background: 'linear-gradient(90deg, #0d47a1, #1976d2)',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      }}
    >
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold text-white fs-4" to="/">
          🗂️ FileShare
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {!token ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-white fw-semibold" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white fw-semibold" to="/register">
                    Register
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-white fw-semibold" to="/upload">
                    Upload
                  </Link>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-sm btn-outline-light ms-2"
                    onClick={handleLogout}
                    style={{ fontWeight: '600', borderRadius: '8px' }}
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
