import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "../Auth.css";
import logo from "../assets/coreopsai.jpg";
import { backend_url } from "../config";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [id, setid] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get("id");
    const token = searchParams.get("token");
    setToken(token);
    setid(id);
    if (!id || !token) {
      setError("Invalid or missing reset link parameter");
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        `${backend_url}/reset-password?id=${id}&token=${token}`, // Pass id and token
        { password }, // Send new password in the request body
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setMessage(response.data.message);
      // Redirect to login after successful password reset
      setTimeout(() => navigate("/signin"), 2000);
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("Failed to reset password. Please try again.");
      }
    }
  };

  return (
    <div className="signin-page-container">
      <div className="auth-container">
        <img src={logo} alt="corehr" className="corehr-image"></img>
        <h2>Reset Password</h2>
        {error && <div className="error">{error}</div>}
        {message && <div className="success">{message}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="password">New Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm New Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Reset Password</button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
