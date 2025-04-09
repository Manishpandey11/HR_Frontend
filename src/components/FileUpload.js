// import React, { useState, useRef, useEffect } from 'react';
// import '../FileUpload.css';
// import ClipLoader from 'react-spinners/ClipLoader';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {
//   faFileAlt,
//   faPaperPlane,
//   faTimes,
//   faCloudUploadAlt,
//   faFolderOpen,
//   faQuestionCircle, // Tooltip icon
// } from '@fortawesome/free-solid-svg-icons';
// import { useNavigate } from 'react-router-dom';

// function FileUpload({ setAnalysisResults }) {
//   const [selectedFiles, setSelectedFiles] = useState([]);
//   const [jobDescription, setJobDescription] = useState(
//     'Senior Software Engineer:\n\nWe are looking for a Senior Software Engineer with expertise in React, Node.js, and AWS. The ideal candidate will have 5+ years of experience and a passion for building scalable and reliable web applications.'
//   ); // Sample job description
//   const [isLoading, setIsLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');
//   const [uploadSuccess, setUploadSuccess] = useState(false);
//   const fileInputRef = useRef(null);
//   const folderInputRef = useRef(null);
//   const dragAreaRef = useRef(null);
//   const analyzeButtonRef = useRef(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (uploadSuccess) {
//       const timer = setTimeout(() => {
//         setUploadSuccess(false); // Reset after animation
//       }, 3000); // Adjust timing as needed
//       return () => clearTimeout(timer); // Cleanup on unmount
//     }
//   }, [uploadSuccess]);

//   const handleFileChange = (event) => {
//     const files = Array.from(event.target.files);
//     processFiles(files);
//   };

//   const handleFolderChange = (event) => {
//     const files = Array.from(event.target.files);
//     processFiles(files);
//   };

//   const processFiles = (files) => {
//     const allowedTypes = [
//       'application/pdf',
//       'application/msword',
//       'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
//     ];

//     const validFiles = files.filter((file) => {
//       if (allowedTypes.includes(file.type)) {
//         return true;
//       } else {
//         setErrorMessage(
//           `Invalid file type: ${file.name}. Only PDF and Word documents are allowed.`
//         );
//         return false;
//       }
//     });

//     setSelectedFiles((prevFiles) => [...prevFiles, ...validFiles]);
//   };

//   const handleJobDescriptionChange = (event) => {
//     setJobDescription(event.target.value);
//   };

//   const handleFileUpload = async () => {
//     if (!selectedFiles || selectedFiles.length === 0) {
//       setErrorMessage('Please select at least one file.');
//       return;
//     }

//     if (!jobDescription) {
//       setErrorMessage('Please enter a job description.');
//       return;
//     }

//     setIsLoading(true);
//     setErrorMessage('');

//     const formData = new FormData();
//     selectedFiles.forEach((file) => {
//       formData.append('resumes', file);
//     });
//     formData.append('jobDescription', jobDescription);

//     try {
//       const response = await fetch(`http://localhost:3000/upload`, {
//         method: 'POST',
//         body: formData,
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setAnalysisResults(data);
//         setUploadSuccess(true); // Trigger success state
//         navigate('/results');
//       } else {
//         setErrorMessage('Analysis failed.');
//       }
//     } catch (error) {
//       setErrorMessage('Analysis failed.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleRemoveFile = (index) => {
//     setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
//   };

//   const handleDragOver = (event) => {
//     event.preventDefault();
//   };

//   const handleDrop = (event) => {
//     event.preventDefault();
//     event.stopPropagation();
//     const files = Array.from(event.dataTransfer.files);
//     processFiles(files);
//   };

//   return (
//     <div className="app-container">
//       <div className="file-upload-container">
//         {/* Hero Section */}
//         <section className="hero-section">
//           <h1>Discover Talent with CoreHire.AI</h1>
//           <p>Analyze resumes effortlessly and find the perfect candidate.</p>
//         </section>

//         {/* File Upload Section */}
//         <section className="file-upload-section">
//           <div
//             className="drag-drop-area"
//             onDragOver={handleDragOver}
//             onDrop={handleDrop}
//             ref={dragAreaRef}
//           >
//             <FontAwesomeIcon icon={faCloudUploadAlt} className="upload-icon" />
//             <p>Drag & Drop your resume files here</p>
//             <p>or</p>
//             <button
//               className="browse-button"
//               onClick={() => fileInputRef.current.click()}
//             >
//               Browse Files
//             </button>
//             <button
//               className="folder-button"
//               onClick={() => folderInputRef.current.click()}
//             >
//               Upload Folder <FontAwesomeIcon icon={faFolderOpen} />
//             </button>
//             <input
//               type="file"
//               id="file-input"
//               multiple
//               onChange={handleFileChange}
//               style={{ display: 'none' }}
//               ref={fileInputRef}
//             />
//             <input
//               type="file"
//               id="folder-input"
//               webkitdirectory="true"
//               multiple
//               onChange={handleFolderChange}
//               style={{ display: 'none' }}
//               ref={folderInputRef}
//             />
//           </div>

//           {/* Selected Files */}
//           {selectedFiles.length > 0 && (
//             <div className="selected-files-list">
//               {selectedFiles.map((file, index) => (
//                 <div className="file-item" key={index}>
//                   <FontAwesomeIcon icon={faFileAlt} className="file-icon" />
//                   <span>{file.name}</span>
//                   <button
//                     type="button"
//                     className="remove-file-button"
//                     onClick={() => handleRemoveFile(index)}
//                   >
//                     <FontAwesomeIcon icon={faTimes} />
//                   </button>
//                 </div>
//               ))}
//             </div>
//           )}
//         </section>

//         {/* Job Description Section */}
//         <section className="job-description-section">
//           <h2>Job Description</h2>
//           <textarea
//             id="job-description"
//             rows="6"
//             value={jobDescription}
//             onChange={handleJobDescriptionChange}
//             placeholder="Enter the job description..."
//           />
//         </section>

//         {/* Upload and Analyze Section */}
//         <div className="upload-analyze-section">
//           {errorMessage && <div className="error-message">{errorMessage}</div>}
//           <button
//             className={`analyze-button ${uploadSuccess ? 'success' : ''}`} // Add class for animation
//             onClick={handleFileUpload}
//             disabled={isLoading || !selectedFiles.length > 0 || !jobDescription}
//             ref={analyzeButtonRef} // Add ref for potential parallax effect
//           >
//             {isLoading ? (
//               <ClipLoader color="#fff" size={20} />
//             ) : (
//               <>
//                 Analyze resumes for best candidates{' '}
//                 <FontAwesomeIcon
//                   icon={faPaperPlane}
//                   style={{ transition: 'transform 0.3s ease' }}
//                   onMouseEnter={(e) =>
//                     (e.target.style.transform = 'translateX(5px)')
//                   }
//                   onMouseLeave={(e) =>
//                     (e.target.style.transform = 'translateX(0)')
//                   }
//                 />
//               </>
//             )}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default FileUpload;

import React, { useState, useRef, useEffect } from "react";
import "../FileUpload.css";
import ClipLoader from "react-spinners/ClipLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileAlt,
  faPaperPlane,
  faTimes,
  faCloudUploadAlt,
  faFolderOpen,
  faQuestionCircle, // Tooltip icon
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { backend_url } from "../config";

function FileUpload({ setAnalysisResults }) {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [jobDescription, setJobDescription] = useState(
    "Senior Software Engineer:\n\nWe are looking for a Senior Software Engineer with expertise in React, Node.js, and AWS. The ideal candidate will have 5+ years of experience and a passion for building scalable and reliable web applications."
  ); // Sample job description
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef(null);
  const folderInputRef = useRef(null);
  const dragAreaRef = useRef(null);
  const analyzeButtonRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (uploadSuccess) {
      const timer = setTimeout(() => {
        setUploadSuccess(false); // Reset after animation
      }, 3000); // Adjust timing as needed
      return () => clearTimeout(timer); // Cleanup on unmount
    }
  }, [uploadSuccess]);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    processFiles(files);
  };

  const handleFolderChange = (event) => {
    const files = Array.from(event.target.files);
    processFiles(files);
  };

  const processFiles = (files) => {
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    const validFiles = files.filter((file) => {
      if (allowedTypes.includes(file.type)) {
        return true;
      } else {
        setErrorMessage(
          `Invalid file type: ${file.name}. Only PDF and Word documents are allowed.`
        );
        return false;
      }
    });

    setSelectedFiles((prevFiles) => [...prevFiles, ...validFiles]);
  };

  const handleJobDescriptionChange = (event) => {
    setJobDescription(event.target.value);
  };

  const handleFileUpload = async () => {
    if (!selectedFiles || selectedFiles.length === 0) {
      setErrorMessage("Please select at least one file.");
      return;
    }

    if (!jobDescription) {
      setErrorMessage("Please enter a job description.");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append("resumes", file);
    });
    formData.append("jobDescription", jobDescription);

    try {
      const response = await fetch(`${backend_url}/upload`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setAnalysisResults(data);
        setUploadSuccess(true); // Trigger success state
        navigate("/results");
      } else {
        setErrorMessage("Analysis failed.");
      }
    } catch (error) {
      setErrorMessage("Analysis failed.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveFile = (index) => {
    setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const files = Array.from(event.dataTransfer.files);
    processFiles(files);
  };

  return (
    <div className="app-container">
      <div className="file-upload-container">
        {/* Hero Section */}
        <section className="hero-section">
          <h1>Discover Talent with CoreHire.AI</h1>
          <p>Analyze resumes effortlessly and find the perfect candidate.</p>
        </section>

        {/* File Upload Section */}
        <section className="file-upload-section">
          <div
            className="drag-drop-area"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            ref={dragAreaRef}
          >
            <FontAwesomeIcon icon={faCloudUploadAlt} className="upload-icon" />
            <p>Drag & Drop your resume files here</p>
            <p>or</p>
            <button
              className="browse-button"
              onClick={() => fileInputRef.current.click()}
            >
              Browse Files
            </button>
            <button
              className="folder-button"
              onClick={() => folderInputRef.current.click()}
            >
              Upload Folder <FontAwesomeIcon icon={faFolderOpen} />
            </button>
            <input
              type="file"
              id="file-input"
              multiple
              onChange={handleFileChange}
              style={{ display: "none" }}
              ref={fileInputRef}
            />
            <input
              type="file"
              id="folder-input"
              webkitdirectory="true"
              multiple
              onChange={handleFolderChange}
              style={{ display: "none" }}
              ref={folderInputRef}
            />
          </div>

          {/* Selected Files */}
          {selectedFiles.length > 0 && (
            <div className="selected-files-list">
              {selectedFiles.map((file, index) => (
                <div className="file-item" key={index}>
                  <FontAwesomeIcon icon={faFileAlt} className="file-icon" />
                  <span>{file.name}</span>
                  <button
                    type="button"
                    className="remove-file-button"
                    onClick={() => handleRemoveFile(index)}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Job Description Section */}
        <section className="job-description-section">
          <h2>Job Description</h2>
          <textarea
            id="job-description"
            rows="6"
            value={jobDescription}
            onChange={handleJobDescriptionChange}
            placeholder="Enter the job description..."
          />
        </section>

        {/* Upload and Analyze Section */}
        <div className="upload-analyze-section">
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <button
            className={`analyze-button ${uploadSuccess ? "success" : ""}`} // Add class for animation
            onClick={handleFileUpload}
            disabled={isLoading || !selectedFiles.length > 0 || !jobDescription}
            ref={analyzeButtonRef} // Add ref for potential parallax effect
          >
            {isLoading ? (
              <ClipLoader color="#fff" size={20} />
            ) : (
              <>
                Analyze resumes for best candidates{" "}
                <FontAwesomeIcon
                  icon={faPaperPlane}
                  style={{ transition: "transform 0.3s ease" }}
                  onMouseEnter={(e) =>
                    (e.target.style.transform = "translateX(5px)")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.transform = "translateX(0)")
                  }
                />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default FileUpload;
