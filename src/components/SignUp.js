// // frontend/src/components/SignUp.js
// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import "../Auth.css";
// import logo from "../assets/coreopsai.jpg";
// import HRMSImage from "../assets/hrms.jpg";

// const API_URL = "http://192.168.10.178/api"

// function SignUp() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setError("");
//     try {
//       const response = await axios.post(`${API_URL}/register`, {
//         name,
//         email,
//         password,
//       });

//       if (response.status === 201) {
//         navigate("/signin"); // Redirect to sign-in after successful registration
//       } else {
//         setError("Registration failed. Please try again.");
//       }
//     } catch (err) {
//       setError("Registration failed. Please check your details.");
//     }
//   };

//   return (
//     <div className="signin-page-container">
//       {/* <div className="signin-background"> */}
//       <img src={logo} alt="corehr" className="corehr-image"></img>
//       <div className="image-container">
//         <img src={HRMSImage} alt="HRMS" className="hrms-image" />
//       </div>
//       <div className="auth-container">
//         <h2>Sign Up</h2>
//         {error && <div className="error">{error}</div>}
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label htmlFor="name">Name</label>
//             <input
//               type="text"
//               id="name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="email">Email</label>
//             <input
//               type="email"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="password">Password</label>
//             <input
//               type="password"
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
//           <button type="submit">Register</button>
//           <p>
//             Already have an account? <Link to="/signin">Sign in</Link>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default SignUp; // This is the important part - default export

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../Auth.css";
import logo from "../assets/coreopsai.jpg";
import HRMSImage from "../assets/hrms.jpg";
import { backend_url } from "../config";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      const response = await axios.post(`${backend_url}/register`, {
        name,
        email,
        password,
      });

      if (response.status === 201) {
        setMessage("Registration Successful. Please verify your email.");
        navigate("/signin"); // Redirect to sign-in after successful registration
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch (err) {  
      setError("Registration failed. Please check your details.");
    }
  };

  return (
    <div className="signin-page-container">
      {/* <div className="signin-background"> */}
      <img src={logo} alt="corehr" className="corehr-image"></img>
      <div className="image-container">
        <img src={HRMSImage} alt="HRMS" className="hrms-image" />
      </div>
      <div className="auth-container">
        <h2>Sign Up</h2>
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
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
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Register</button>
          <p>
            Already have an account? <Link to="/signin">Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
