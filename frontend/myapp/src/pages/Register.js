import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await axios.post('/api/auth/register', { name, email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/upload');
    } catch (err) {
      setMessage(err.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow-lg p-4 col-md-6" style={{ backgroundColor: '#ffffff', borderRadius: '12px' }}>
        <h2 className="text-center mb-4 text-success fw-bold">📝 Register for FileShare</h2>

        {message && (
          <div className="alert alert-danger text-center">{message}</div>
        )}

        <input
          type="text"
          className="form-control mb-3"
          placeholder="👤 Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
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
        <button className="btn btn-success w-100 fw-semibold" onClick={handleRegister}>
          ✅ Register
        </button>

        <div className="text-center mt-3">
          <small>Already have an account? <a href="/login">Login</a></small>
        </div>
      </div>
    </div>
  );
};

export default Register;
