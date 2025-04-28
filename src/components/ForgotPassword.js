import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import '../Auth.css';
import logo from '../assets/coreopsai.png';
import { backend_url } from '../config';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Use useNavigate hook

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setMessage('');

    try {
      const response = await axios.post(
        `${backend_url}/request-password-reset`,
        {
          email,
        }
      );
      setMessage(response.data.message);
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="signin-page-container">
      <div className="auth-container">
        <img src={logo} alt="corehr" className="corehr-image" />
        <h2>Forgot Password</h2>
        {error && <div className="error">{error}</div>}
        {message && <div className="success">{message}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit">Send Reset Link</button>
          {/* Link to Sign In page */}
          <p>
            Back to <Link to="/signin">Sign In</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
