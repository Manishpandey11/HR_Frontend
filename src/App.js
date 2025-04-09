// // frontend/src/App.js
// import React from 'react';
// import {
//   BrowserRouter as Router,
//   Route,
//   Routes,
//   Navigate,
// } from 'react-router-dom';
// import SignUp from './components/SignUp';
// import SignIn from './components/SignIn';
// import FileUpload from './components/FileUpload'; // Default import
// import ResultsTable from './components/ResultsTable';
// import { useState } from 'react';

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [analysisResults, setAnalysisResults] = useState([]);

//   return (
//     <Router>
//       <Routes>
//         <Route path="/signup" element={<SignUp />} />
//         <Route
//           path="/signin"
//           element={<SignIn setIsLoggedIn={setIsLoggedIn} />}
//         />
//         <Route
//           path="/upload"
//           element={
//             isLoggedIn ? (
//               <FileUpload setAnalysisResults={setAnalysisResults} />
//             ) : (
//               <Navigate to="/signin" replace />
//             )
//           }
//         />
//         <Route
//           path="/results"
//           element={
//             isLoggedIn ? (
//               <ResultsTable analysisResults={analysisResults} />
//             ) : (
//               <Navigate to="/signin" replace />
//             )
//           }
//         />
//         <Route path="/" element={<Navigate to="/signin" />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import FileUpload from "./components/FileUpload";
import ResultsTable from "./components/ResultsTable";
import { useState } from "react";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [analysisResults, setAnalysisResults] = useState([]);

  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/signin"
          element={<SignIn setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route
          path="/upload"
          element={
            isLoggedIn ? (
              <FileUpload setAnalysisResults={setAnalysisResults} />
            ) : (
              <Navigate to="/signin" replace />
            )
          }
        />
        <Route
          path="/results"
          element={
            isLoggedIn ? (
              <ResultsTable analysisResults={analysisResults} />
            ) : (
              <Navigate to="/signin" replace />
            )
          }
        />
        <Route path="/" element={<Navigate to="/signin" />} />
      </Routes>
    </Router>
  );
}

export default App;
