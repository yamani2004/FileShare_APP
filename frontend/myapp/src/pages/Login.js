import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post('/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/upload');
    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow-lg p-4 col-md-6" style={{ backgroundColor: '#ffffff', borderRadius: '12px' }}>
        <h2 className="text-center mb-4 text-primary fw-bold">🔐 Login to FileShare</h2>
        
        {message && (
          <div className="alert alert-danger text-center">{message}</div>
        )}

        <input
          type="email"
          className="form-control mb-3"
          placeholder="📧 Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="form-control mb-3"
          placeholder="🔒 Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button className="btn btn-primary w-100 fw-semibold" onClick={handleLogin}>
          🚀 Login
        </button>

        <div className="text-center mt-3">
          <small>Don't have an account? <a href="/register">Register</a></small>
        </div>
      </div>
    </div>
  );
};

export default Login;
