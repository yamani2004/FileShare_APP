import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [previewLink, setPreviewLink] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage('');
    setPreviewLink('');
  };

  const handleUpload = async () => {
    if (!file) return setMessage("❗ Please select a file.");

    const formData = new FormData();
    formData.append('file', file);

    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('/api/files/upload', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setMessage("✅ File uploaded successfully!");
      setPreviewLink(res.data.createdFile.cloudinaryUrl);
    } catch (err) {
      console.error("UPLOAD ERROR:", err);
      setMessage(err.response?.data?.message || "❌ Upload failed.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-5" style={{ background: '#f0f8ff', borderRadius: '1rem' }}>
        <h2 className="text-center mb-4 text-primary fw-bold">📤 Upload a File</h2>

        <div className="mb-3">
          <input
            type="file"
            className="form-control"
            onChange={handleFileChange}
          />
        </div>

        {file && (
          <div className="mb-3 text-center text-secondary">
            Selected: <strong>{file.name}</strong>
          </div>
        )}

        <button
          className="btn btn-success w-100 fw-semibold"
          onClick={handleUpload}
        >
          🚀 Upload
        </button>

        {message && (
          <div className="alert alert-info text-center mt-4 fw-medium">
            {message}
          </div>
        )}

        {previewLink && (
          <div className="text-center mt-3">
            <a
              href={previewLink}
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline-primary"
            >
              📎 View Uploaded File
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
