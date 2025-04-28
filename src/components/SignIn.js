import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Auth.css';
import HRMSImage from '../assets/hrms.jpg';
import logo from '../assets/coreopsai.png';
import { backend_url } from '../config';

function SignIn({ setIsLoggedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const response = await axios.post(`${backend_url}/login`, {
        email,
        password,
      });

      if (response.status === 200) {
        setIsLoggedIn(true);
        navigate('/upload');
      } else {
        setError(
          response.data.message || 'Invalid credentials. Please try again.'
        );
      }
    } catch (err) {
      console.error('SignIn Error:', err);
      setError('Invalid credentials or server error. Please try again.');
    }
  };

  return (
    <div className="signin-page-container">
      <div className="image-container">
        <img src={HRMSImage} alt="HRMS" className="hrms-image" />
      </div>
      <div className="auth-container">
        <img src={logo} alt="corehr" className="corehr-image" />
        <h2>CoreHire.AI - Making recruiting easy and 2x faster</h2>
        <h2>Sign In</h2>
        {error && <div className="error">{error}</div>}
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
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="checkbox">
              <input
                type="checkbox"
                id="showPassword"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
              <label htmlFor="showPassword">Show Password</label>
            </div>
          </div>
          <button type="submit">Login</button>
          <p>
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
          <p>
            <Link to="/forgotpassword">Forgot Password?</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
