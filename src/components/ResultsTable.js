// import React from "react";
// import "../ResultsTable.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faEnvelope,
//   faFileAlt,
//   faStar,
// } from "@fortawesome/free-solid-svg-icons";

// function ResultsTable({ analysisResults }) {
//   // Sort the results by similarity score (descending)
//   const sortedResults = [...analysisResults].sort(
//     (a, b) => b.similarityScore - a.similarityScore
//   );

//   return (
//     <div className="results-table-container">
//       <h2>
//         <FontAwesomeIcon icon={faFileAlt} className="table-icon" /> Analysis
//         Results
//       </h2>
//       <table>
//         <thead>
//           <tr>
//             {/* <th>
//               <FontAwesomeIcon icon={faFileAlt} className="header-icon" />{" "}
//               Filename
//             </th> */}
//             <th>
//               <FontAwesomeIcon icon={faStar} className="header-icon" /> Name
//             </th>
//             <th>
//               <FontAwesomeIcon icon={faEnvelope} className="header-icon" />{" "}
//               Email
//             </th>
//             <th>
//               <FontAwesomeIcon icon={faStar} className="header-icon" />{" "}
//               Similarity Score
//             </th>
//             <th>
//               <FontAwesomeIcon icon={faFileAlt} className="header-icon" />{" "}
//               Resume Summary
//             </th>
//           </tr>
//         </thead>
//         <tbody>
//           {sortedResults.map((result, index) => (
//             <tr key={index}>
//               {/* <td>{result.filename}</td> */}
//               <td>{result.name}</td>
//               <td>{result.email}</td>
//               <td>{result.similarityScore}</td>
//               <td>{result.resumeSummary}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default ResultsTable;

// frontend/src/components/ResultsTable.js

// import React from "react";
// import "../ResultsTable.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faEnvelope,
//   faFileAlt,
//   faStar,
// } from "@fortawesome/free-solid-svg-icons";

// function ResultsTable({ analysisResults }) {
//   // Sort the results by similarity score (descending)
//   const sortedResults = [...analysisResults].sort(
//     (a, b) => b.similarityScore - a.similarityScore
//   );

//   const highlightThreshold = 55; // Set the highlight threshold

//   return (
//     <div className="app-container">
//       <div className="results-table-container">
//         <h2>
//           <FontAwesomeIcon icon={faFileAlt} className="table-icon" /> Analysis
//           Results
//         </h2>
//         <table>
//           <thead>
//             <tr>
//               {/* <th>
//                 <FontAwesomeIcon icon={faFileAlt} className="header-icon" />{" "}
//                 Filename
//               </th> */}
//               <th>
//                 <FontAwesomeIcon icon={faStar} className="header-icon" /> Name
//               </th>
//               <th>
//                 <FontAwesomeIcon icon={faEnvelope} className="header-icon" />{" "}
//                 Email
//               </th>
//               <th>
//                 <FontAwesomeIcon icon={faStar} className="header-icon" />{" "}
//                 Similarity Score
//               </th>
//               <th>
//                 <FontAwesomeIcon icon={faFileAlt} className="header-icon" />{" "}
//                 Resume Summary
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {sortedResults.map((result, index) => (
//               <tr
//                 key={index}
//                 className={
//                   result.similarityScore > highlightThreshold
//                     ? "highlighted-row"
//                     : ""
//                 } // Apply the highlighted class
//               >
//                 {/* <td>{result.filename}</td> */}
//                 <td>{result.name}</td>
//                 <td>{result.email}</td>
//                 <td>{result.similarityScore}</td>
//                 <td>{result.resumeSummary}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default ResultsTable;

// frontend/src/components/ResultsTable.js
// import React from "react";
// import "../ResultsTable.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faEnvelope,
//   faFileAlt,
//   faStar,
//   faDownload, // New Icon
// } from "@fortawesome/free-solid-svg-icons";

// function ResultsTable({ analysisResults }) {
//   const sortedResults = [...analysisResults].sort(
//     (a, b) => b.similarityScore - a.similarityScore
//   );

//   const highlightThreshold = 55;

//   // Function to generate a download link for the resume summary
//   const getDownloadLink = (summary) => {
//     const blob = new Blob([summary], { type: "text/plain" });
//     return URL.createObjectURL(blob);
//   };

//   return (
//     <div className="app-container">
//       <div className="results-table-container">
//         <h2>
//           <FontAwesomeIcon icon={faFileAlt} className="table-icon" /> Analysis
//           Results
//         </h2>
//         <table>
//           <thead>
//             <tr>
//               {/* <th>
//                 <FontAwesomeIcon icon={faFileAlt} className="header-icon" />{" "}
//                 Filename
//               </th> */}
//               <th>
//                 <FontAwesomeIcon icon={faStar} className="header-icon" /> Name
//               </th>
//               <th>
//                 <FontAwesomeIcon icon={faEnvelope} className="header-icon" />{" "}
//                 Email
//               </th>
//               <th>
//                 <FontAwesomeIcon icon={faStar} className="header-icon" /> Score
//               </th>
//               <th>
//                 <FontAwesomeIcon icon={faFileAlt} className="header-icon" />{" "}
//                 Resume Summary
//               </th>
//               <th>Actions</th> {/* New Actions Column */}
//             </tr>
//           </thead>
//           <tbody>
//             {sortedResults.map((result, index) => (
//               <tr
//                 key={index}
//                 className={
//                   result.similarityScore > highlightThreshold
//                     ? "highlighted-row"
//                     : ""
//                 }
//               >
//                 {/* <td>{result.filename}</td> */}
//                 <td className="name">{result.name}</td>
//                 <td>{result.email}</td>
//                 <td className="score">{result.similarityScore}</td>
//                 <td>{result.resumeSummary}</td>
//                 <td>
//                   {/* New Actions Column Content */}
//                   <a
//                     href={getDownloadLink(result.resumeSummary)}
//                     download={`${result.filename}-summary.txt`}
//                     className="download-button"
//                   >
//                     <FontAwesomeIcon icon={faDownload} /> Download Summary
//                   </a>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default ResultsTable;

// import React from "react";
// import "../ResultsTable.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faEnvelope,
//   faFileAlt,
//   faStar,
//   faPaperPlane,
//   faCalendarAlt,
// } from "@fortawesome/free-solid-svg-icons";

// function ResultsTable({ analysisResults }) {
//   const sortedResults = [...analysisResults].sort(
//     (a, b) => b.similarityScore - a.similarityScore
//   );

//   const highlightThreshold = 55;

//   // const generateMailLink = (email, result, similarityScore) => {
//   //   const subject = encodeURIComponent("Resume Analysis - Google Form");
//   //   const googleFormUrl =
//   //     "https://docs.google.com/forms/d/e/YOUR_GOOGLE_FORM_ID/viewform";
//   //   const formLink = `${googleFormUrl}?entry_NAME=${encodeURIComponent(
//   //     result.name
//   //   )}&entry_EMAIL=${encodeURIComponent(
//   //     result.email
//   //   )}&entry_SCORE=${encodeURIComponent(result.similarityScore)}`;
//   //   const body = encodeURIComponent(
//   //     `Please fill out the following form:\n\n${formLink}`
//   //   );
//   //   console.log("Mail send initiated");
    
//   //   return `mailto:${email}?subject=${subject}&body=${body}`;
//   // };

// const generateMailLink = (email, result, similarityScore) => {
//   const subject = encodeURIComponent("Resume Analysis - Google Form");
//   const googleFormUrl =
//     "https://docs.google.com/forms/d/e/YOUR_GOOGLE_FORM_ID/viewform";

//   const formLink = `${googleFormUrl}?entry_NAME=${encodeURIComponent(
//     result.name
//   )}&entry_EMAIL=${encodeURIComponent(
//     result.email
//   )}&entry_SCORE=${encodeURIComponent(result.similarityScore)}`;

//   const body = encodeURIComponent(
//     `Hi ${result.name},\n\nPlease fill out the following form:\n${formLink}\n\nBest,\nTeam CoreHire`
//   );

//   const outlookLink = `https://outlook.office.com/mail/deeplink/compose?to=${email}&subject=${subject}&body=${body}`;

//   console.log("Outlook Web mail link generated");

//   return outlookLink;
// };


//   const openMeetInOutlook = (email, name, similarityScore) => {
//     const subject = `Meeting Invitation - Resume Review for ${name}`;
//     const body = `Hi ${name},\n\nPlease join the meeting to discuss your job roles and some other points related to your resume.\n\nThanks.`;

//     // Outlook Web URL for creating a new calendar event
//     const outlookCalendarLink =
//       `https://outlook.office.com/calendar/0/deeplink/compose` +
//       `?path=/calendar/action/compose` +
//       `&to=${encodeURIComponent(email)}` +
//       `&subject=${encodeURIComponent(subject)}` +
//       `&body=${encodeURIComponent(body)}`;
//     console.log("Mail send initiated");
//     window.open(outlookCalendarLink, "_blank");
//   };

//   return (
//     <div className="app-container">
//       <div className="results-table-container">
//         <h2>
//           <FontAwesomeIcon icon={faFileAlt} className="table-icon" /> Analysis
//           Results
//         </h2>
//         <table>
//           <thead>
//             <tr>
//               <th>
//                 <FontAwesomeIcon icon={faStar} className="header-icon" /> Name
//               </th>
//               <th>
//                 <FontAwesomeIcon icon={faEnvelope} className="header-icon" />{" "}
//                 Email
//               </th>
//               <th>
//                 <FontAwesomeIcon icon={faStar} className="header-icon" /> Score
//               </th>
//               <th>
//                 <FontAwesomeIcon icon={faFileAlt} className="header-icon" />{" "}
//                 Resume Summary
//               </th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {sortedResults.map((result, index) => (
//               <tr
//                 key={index}
//                 className={
//                   result.similarityScore > highlightThreshold
//                     ? "highlighted-row"
//                     : ""
//                 }
//               >
//                 <td className="name">{result.name}</td>
//                 <td>{result.email}</td>
//                 <td className="score">{result.similarityScore}</td>
//                 <td>{result.resumeSummary}</td>
//                 <td>
//                   <button
//                     href={generateMailLink(result.email, result, result.similarityScore)}
//                     className="email-button"
//                   >
//                     <FontAwesomeIcon icon={faPaperPlane} /> Send an Email
//                   </button>
//                   <button
//                     className="email-button"
//                     style={{ marginLeft: "10px" }}
//                     onClick={() =>
//                       openMeetInOutlook(
//                         result.email,
//                         result.name,
//                         result.similarityScore
//                       )
//                     }
//                   >
//                     <FontAwesomeIcon icon={faCalendarAlt} /> Send Event mail
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default ResultsTable;

import React from "react";
import "../ResultsTable.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faFileAlt,
  faStar,
  faPaperPlane,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";

function ResultsTable({ analysisResults }) {
  const sortedResults = [...analysisResults].sort(
    (a, b) => b.similarityScore - a.similarityScore
  );

  const highlightThreshold = 55;

  const generateMailLink = (email, result) => {
    const subject = encodeURIComponent("Resume Analysis - Google Form");

    // Replace these with your actual form field entry IDs
    const googleFormBaseUrl =
      "https://docs.google.com/forms/d/e/YOUR_GOOGLE_FORM_ID/viewform";
    const formLink = `${googleFormBaseUrl}?entry.123456=${encodeURIComponent(result.name)}&entry.654321=${encodeURIComponent(result.email)}&entry.111222=${encodeURIComponent(result.similarityScore)}`;

    const body = encodeURIComponent(
      `Hi ${result.name},\n\nThank you for submitting your resume.\nPlease fill out this short form:\n\n${formLink}\n\nBest regards,\nTeam CoreHire\n`
    );

    const outlookLink = `https://outlook.office.com/mail/deeplink/compose?to=${email}&subject=${subject}&body=${body}`;

    // ✅ Open in a new window (centered popup style)
    window.open(outlookLink);
  };

  const openMeetInOutlook = (email, name, similarityScore) => {
    const subject = `Meeting Invitation - Resume Review for ${name}`;
    const bodyHTML = `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <h2 style="color: #5e42a6;">Hi ${name},</h2>
      <p>Please join the meeting to discuss your job roles and some important points related to your resume.</p>
      <p>Looking forward to our conversation!</p>
      <p style="margin-top: 30px;">Thanks,<br><strong>Team CoreHire</strong></p>
      <br />
    </div>
  `;

    const outlookCalendarLink =
      `https://outlook.office.com/calendar/0/deeplink/compose` +
      `?path=/calendar/action/compose` +
      `&to=${encodeURIComponent(email)}` +
      `&subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(bodyHTML)}`;

    console.log("Mail send initiated");
    window.open(outlookCalendarLink, "_blank");
  };

  return (
    <div className="app-container">
      <div className="results-table-container">
        <h2>
          <FontAwesomeIcon icon={faFileAlt} className="table-icon" /> Analysis
          Results
        </h2>
        <table>
          <thead>
            <tr>
              <th>
                <FontAwesomeIcon icon={faStar} className="header-icon" /> Name
              </th>
              <th>
                <FontAwesomeIcon icon={faEnvelope} className="header-icon" />{" "}
                Email
              </th>
              <th>
                <FontAwesomeIcon icon={faStar} className="header-icon" /> Score
              </th>
              <th>
                <FontAwesomeIcon icon={faFileAlt} className="header-icon" />{" "}
                Resume Summary
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedResults.map((result, index) => (
              <tr
                key={index}
                className={
                  result.similarityScore > highlightThreshold
                    ? "highlighted-row"
                    : ""
                }
              >
                <td className="name">{result.name}</td>
                <td>{result.email}</td>
                <td className="score">{result.similarityScore}</td>
                <td>{result.resumeSummary}</td>
                <td>
                  <button
                    // href={generateMailLink(result.email, result)}
                    // className="email-button"
                    className="email-button"
                    style={{ marginLeft: "10px" }}
                    onClick={() => generateMailLink(result.email, result.name)}
                  >
                    <FontAwesomeIcon icon={faPaperPlane} /> Send Form Link
                  </button>
                  <br />
                  <br />
                  <br />
                  <button
                    className="email-button"
                    style={{ marginLeft: "10px" }}
                    onClick={() =>
                      openMeetInOutlook(
                        result.email,
                        result.name,
                        result.similarityScore
                      )
                    }
                  >
                    <FontAwesomeIcon icon={faCalendarAlt} /> Send Event Link
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ResultsTable;
