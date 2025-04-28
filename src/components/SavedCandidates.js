// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import '../ResultsTable.css'; // Reuse existing styles
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {
//   faFileAlt,
//   faUserTie,
//   faEnvelope,
//   faStar,
//   faCloudUploadAlt,
//   faTrash,
//   faSpinner,
//   faExclamationTriangle,
//   faSearch,
//   faSort,
//   faSortUp,
//   faSortDown,
// } from '@fortawesome/free-solid-svg-icons';
// import { backend_url } from '../config';

// function SavedCandidates() {
//   const [candidates, setCandidates] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [sortConfig, setSortConfig] = useState({
//     key: 'similarityScore',
//     direction: 'descending',
//   });
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchCandidates();
//   }, []);

//   const fetchCandidates = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch(`${backend_url}/candidates`);

//       if (!response.ok) {
//         throw new Error(`Failed to fetch candidates: ${response.status}`);
//       }

//       const data = await response.json();
//       setCandidates(data);
//       setError(null);
//     } catch (err) {
//       console.error('Error fetching candidates:', err);
//       setError('Failed to load candidates. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeleteCandidate = async (candidateId) => {
//     if (!window.confirm('Are you sure you want to delete this candidate?')) {
//       return;
//     }

//     try {
//       const response = await fetch(`${backend_url}/candidates/${candidateId}`, {
//         method: 'DELETE',
//       });

//       if (!response.ok) {
//         throw new Error('Failed to delete candidate');
//       }

//       // Update the UI by removing the deleted candidate
//       setCandidates(
//         candidates.filter((candidate) => candidate._id !== candidateId)
//       );
//     } catch (err) {
//       console.error('Error deleting candidate:', err);
//       setError('Failed to delete candidate. Please try again.');
//     }
//   };

//   const handleSort = (key) => {
//     let direction = 'ascending';
//     if (sortConfig.key === key && sortConfig.direction === 'ascending') {
//       direction = 'descending';
//     }
//     setSortConfig({ key, direction });
//   };

//   const sortedCandidates = [...candidates].sort((a, b) => {
//     if (a[sortConfig.key] < b[sortConfig.key]) {
//       return sortConfig.direction === 'ascending' ? -1 : 1;
//     }
//     if (a[sortConfig.key] > b[sortConfig.key]) {
//       return sortConfig.direction === 'ascending' ? 1 : -1;
//     }
//     return 0;
//   });

//   const filteredCandidates = sortedCandidates.filter((candidate) => {
//     return (
//       candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       (candidate.resumeSummary &&
//         candidate.resumeSummary
//           .toLowerCase()
//           .includes(searchTerm.toLowerCase()))
//     );
//   });

//   const getSortIcon = (name) => {
//     if (sortConfig.key === name) {
//       return sortConfig.direction === 'ascending' ? faSortUp : faSortDown;
//     }
//     return faSort;
//   };

//   return (
//     <div className="app-container">
//       <div className="full-page-container">
//         <div className="results-table-container">
//           <div className="saved-candidates-header">
//             <h2>
//               <FontAwesomeIcon icon={faUserTie} className="table-icon" /> Saved
//               Candidates
//             </h2>
//             <Link to="/upload" className="upload-button">
//               <FontAwesomeIcon icon={faCloudUploadAlt} /> Upload New Resumes
//             </Link>
//           </div>

//           {/* Search & Filter */}
//           <div className="search-container">
//             <div className="search-input-container">
//               <FontAwesomeIcon icon={faSearch} className="search-icon" />
//               <input
//                 type="text"
//                 placeholder="Search candidates..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="search-input"
//               />
//             </div>
//             <div className="candidate-count">
//               {filteredCandidates.length} candidates found
//             </div>
//           </div>

//           {loading ? (
//             <div className="loading-container">
//               <FontAwesomeIcon icon={faSpinner} spin className="loading-icon" />
//               <p>Loading candidates...</p>
//             </div>
//           ) : error ? (
//             <div className="error-container">
//               <FontAwesomeIcon
//                 icon={faExclamationTriangle}
//                 className="error-icon"
//               />
//               <p>{error}</p>
//               <button className="retry-button" onClick={fetchCandidates}>
//                 Retry
//               </button>
//             </div>
//           ) : filteredCandidates.length === 0 ? (
//             <div className="empty-container">
//               <FontAwesomeIcon icon={faFileAlt} className="empty-icon" />
//               <p>No candidates found.</p>
//               {searchTerm ? (
//                 <button
//                   className="clear-button"
//                   onClick={() => setSearchTerm('')}
//                 >
//                   Clear Search
//                 </button>
//               ) : (
//                 <Link to="/upload" className="upload-button">
//                   <FontAwesomeIcon icon={faCloudUploadAlt} /> Upload Resumes
//                 </Link>
//               )}
//             </div>
//           ) : (
//             <table>
//               <thead>
//                 <tr>
//                   <th
//                     onClick={() => handleSort('name')}
//                     className="sortable-header"
//                   >
//                     <FontAwesomeIcon icon={faUserTie} className="header-icon" />
//                     Name
//                     <FontAwesomeIcon
//                       icon={getSortIcon('name')}
//                       className="sort-icon"
//                     />
//                   </th>
//                   <th
//                     onClick={() => handleSort('email')}
//                     className="sortable-header"
//                   >
//                     <FontAwesomeIcon
//                       icon={faEnvelope}
//                       className="header-icon"
//                     />
//                     Email
//                     <FontAwesomeIcon
//                       icon={getSortIcon('email')}
//                       className="sort-icon"
//                     />
//                   </th>
//                   <th
//                     onClick={() => handleSort('similarityScore')}
//                     className="sortable-header"
//                   >
//                     <FontAwesomeIcon icon={faStar} className="header-icon" />
//                     Score
//                     <FontAwesomeIcon
//                       icon={getSortIcon('similarityScore')}
//                       className="sort-icon"
//                     />
//                   </th>
//                   <th>
//                     <FontAwesomeIcon icon={faFileAlt} className="header-icon" />
//                     Summary
//                   </th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredCandidates.map((candidate) => (
//                   <tr key={candidate._id}>
//                     <td className="name">{candidate.name}</td>
//                     <td>{candidate.email}</td>
//                     <td className="score">{candidate.similarityScore}</td>
//                     <td className="summary">{candidate.resumeSummary}</td>
//                     <td>
//                       <button
//                         className="delete-button"
//                         onClick={() => handleDeleteCandidate(candidate._id)}
//                         title="Delete Candidate"
//                       >
//                         <FontAwesomeIcon icon={faTrash} />
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SavedCandidates;

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFileAlt,
  faUserTie,
  faEnvelope,
  faStar,
  faCloudUploadAlt,
  faTrash,
  faSpinner,
  faExclamationTriangle,
  faSearch,
  faSort,
  faSortUp,
  faSortDown,
  faCalendarAlt,
  faChartBar,
  faListAlt,
  faEdit,
  faSave,
  faTimes,
  faClipboardList,
  faFilter,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { backend_url } from '../config';
import '../SavedCandidates.css';

function SavedCandidates() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const stageFilter = queryParams.get('stage');

  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({
    key: 'similarityScore',
    direction: 'descending',
  });
  const [editingCandidate, setEditingCandidate] = useState(null);
  const [interviewStatus, setInterviewStatus] = useState('');
  const [interviewNote, setInterviewNote] = useState('');
  const [nextInterviewDate, setNextInterviewDate] = useState('');
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [currentCandidateNotes, setCurrentCandidateNotes] = useState([]);
  const [currentCandidateName, setCurrentCandidateName] = useState('');
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [statusFilter, setStatusFilter] = useState(stageFilter || 'All');

  // Interview stage colors for visual representation
  const stageColors = {
    'Not Started': '#808080',
    'Resume Screening': '#a5d6a7',
    'Phone Interview': '#81c784',
    'Technical Assessment': '#66bb6a',
    'On-site Interview': '#4caf50',
    'Reference Check': '#43a047',
    'Offer Extended': '#2e7d32',
    Hired: '#1b5e20',
    Rejected: '#d32f2f',
  };

  // Available interview stages
  const interviewStages = [
    'Not Started',
    'Resume Screening',
    'Phone Interview',
    'Technical Assessment',
    'On-site Interview',
    'Reference Check',
    'Offer Extended',
    'Hired',
    'Rejected',
  ];

  useEffect(() => {
    fetchCandidates();
  }, [stageFilter]);

  useEffect(() => {
    if (stageFilter) {
      setStatusFilter(stageFilter);
      setShowFilterOptions(true);
    }
  }, [stageFilter]);

  const fetchCandidates = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${backend_url}/candidates`);

      if (!response.ok) {
        throw new Error(`Failed to fetch candidates: ${response.status}`);
      }

      const data = await response.json();
      setCandidates(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching candidates:', err);
      setError('Failed to load candidates. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCandidate = async (candidateId) => {
    if (!window.confirm('Are you sure you want to delete this candidate?')) {
      return;
    }

    try {
      const response = await fetch(`${backend_url}/candidates/${candidateId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete candidate');
      }

      // Update the UI by removing the deleted candidate
      setCandidates(
        candidates.filter((candidate) => candidate._id !== candidateId)
      );
    } catch (err) {
      console.error('Error deleting candidate:', err);
      setError('Failed to delete candidate. Please try again.');
    }
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const startEditingCandidate = (candidate) => {
    setEditingCandidate(candidate._id);
    setInterviewStatus(candidate.interviewStatus || 'Not Started');
    setInterviewNote('');
    setNextInterviewDate(
      candidate.nextInterviewDate
        ? new Date(candidate.nextInterviewDate).toISOString().split('T')[0]
        : ''
    );
  };

  const cancelEditing = () => {
    setEditingCandidate(null);
    setInterviewStatus('');
    setInterviewNote('');
    setNextInterviewDate('');
  };

  const saveInterviewStatus = async (candidateId) => {
    try {
      const response = await fetch(
        `${backend_url}/candidates/${candidateId}/interview-status`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            interviewStatus,
            note: interviewNote,
            nextInterviewDate: nextInterviewDate || null,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update interview status');
      }

      const updatedCandidate = await response.json();

      // Update the candidates array with the updated candidate
      setCandidates(
        candidates.map((candidate) =>
          candidate._id === candidateId ? updatedCandidate.candidate : candidate
        )
      );

      // Reset editing state
      cancelEditing();
    } catch (err) {
      console.error('Error updating interview status:', err);
      setError('Failed to update interview status. Please try again.');
    }
  };

  const viewCandidateNotes = (candidate) => {
    setCurrentCandidateNotes(candidate.interviewNotes || []);
    setCurrentCandidateName(candidate.name);
    setShowNotesModal(true);
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'Not scheduled';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const sortedCandidates = [...candidates].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  // First filter by status if selected
  const statusFilteredCandidates =
    statusFilter === 'All'
      ? sortedCandidates
      : sortedCandidates.filter(
          (candidate) =>
            candidate.interviewStatus === statusFilter ||
            (!candidate.interviewStatus && statusFilter === 'Not Started')
        );

  // Then apply search filter
  const filteredCandidates = statusFilteredCandidates.filter((candidate) => {
    return (
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (candidate.resumeSummary &&
        candidate.resumeSummary
          .toLowerCase()
          .includes(searchTerm.toLowerCase()))
    );
  });

  const getSortIcon = (name) => {
    if (sortConfig.key === name) {
      return sortConfig.direction === 'ascending' ? faSortUp : faSortDown;
    }
    return faSort;
  };

  return (
    <div className="candidates-container">
      <div className="candidates-header">
        <h2 className="candidates-title">
          <FontAwesomeIcon icon={faUserTie} /> Saved Candidates
        </h2>
        <div className="header-buttons">
          <Link to="/interview-tracking" className="tracking-button">
            <FontAwesomeIcon icon={faChartBar} /> Interview Tracking
          </Link>
          <Link to="/upload" className="upload-button">
            <FontAwesomeIcon icon={faCloudUploadAlt} /> Upload New Resumes
          </Link>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="search-filter-row">
        <div className="search-container">
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          <input
            type="text"
            placeholder="Search candidates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-container">
          <button
            className={`filter-button ${
              statusFilter !== 'All' ? 'active' : ''
            }`}
            onClick={() => setShowFilterOptions(!showFilterOptions)}
          >
            <FontAwesomeIcon icon={faFilter} />
            {statusFilter !== 'All' ? ` ${statusFilter}` : ' Filter by Status'}
          </button>
          <div className="candidate-count">
            {filteredCandidates.length} candidates found
          </div>
        </div>
      </div>

      {/* Filter options */}
      <div
        className="filter-options"
        style={{ display: showFilterOptions ? 'flex' : 'none' }}
      >
        <div
          className={`filter-pill ${statusFilter === 'All' ? 'active' : ''}`}
          onClick={() => setStatusFilter('All')}
        >
          All
        </div>
        {interviewStages.map((stage) => (
          <div
            key={stage}
            className={`filter-pill ${statusFilter === stage ? 'active' : ''}`}
            onClick={() => setStatusFilter(stage)}
          >
            {stage}
          </div>
        ))}
      </div>

      {loading ? (
        <div className="loading-container">
          <FontAwesomeIcon icon={faSpinner} spin className="loading-icon" />
          <p>Loading candidates...</p>
        </div>
      ) : error ? (
        <div className="error-container">
          <FontAwesomeIcon
            icon={faExclamationTriangle}
            className="error-icon"
          />
          <p>{error}</p>
          <button className="action-button" onClick={fetchCandidates}>
            Retry
          </button>
        </div>
      ) : filteredCandidates.length === 0 ? (
        <div className="empty-container">
          <FontAwesomeIcon icon={faFileAlt} className="empty-icon" />
          <p>No candidates found.</p>
          {searchTerm || statusFilter !== 'All' ? (
            <button
              className="action-button"
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('All');
              }}
            >
              Clear Filters
            </button>
          ) : (
            <Link to="/upload" className="upload-button">
              <FontAwesomeIcon icon={faCloudUploadAlt} /> Upload Resumes
            </Link>
          )}
        </div>
      ) : (
        <table className="candidates-table">
          <thead>
            <tr>
              <th onClick={() => handleSort('name')}>
                <FontAwesomeIcon icon={faUserTie} />
                Name
                <FontAwesomeIcon
                  icon={getSortIcon('name')}
                  className="sort-icon"
                />
              </th>
              <th onClick={() => handleSort('email')}>
                <FontAwesomeIcon icon={faEnvelope} />
                Email
                <FontAwesomeIcon
                  icon={getSortIcon('email')}
                  className="sort-icon"
                />
              </th>
              <th onClick={() => handleSort('similarityScore')}>
                <FontAwesomeIcon icon={faStar} />
                Score
                <FontAwesomeIcon
                  icon={getSortIcon('similarityScore')}
                  className="sort-icon"
                />
              </th>
              <th onClick={() => handleSort('interviewStatus')}>
                <FontAwesomeIcon icon={faListAlt} />
                Status
                <FontAwesomeIcon
                  icon={getSortIcon('interviewStatus')}
                  className="sort-icon"
                />
              </th>
              <th>
                <FontAwesomeIcon icon={faCalendarAlt} />
                Next Interview
              </th>
              <th>
                <FontAwesomeIcon icon={faFileAlt} />
                Summary
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCandidates.map((candidate) => (
              <React.Fragment key={candidate._id}>
                <tr>
                  <td>{candidate.name}</td>
                  <td>{candidate.email}</td>
                  <td>{candidate.similarityScore}</td>
                  <td>
                    <div className="status-cell">
                      <span
                        className="status-pill"
                        style={{
                          backgroundColor:
                            stageColors[
                              candidate.interviewStatus || 'Not Started'
                            ],
                        }}
                      >
                        {candidate.interviewStatus || 'Not Started'}
                      </span>
                    </div>
                  </td>
                  <td>{formatDate(candidate.nextInterviewDate)}</td>
                  <td className="summary-cell">{candidate.resumeSummary}</td>
                  <td className="action-buttons">
                    <Link
                      to={`/candidates/${candidate._id}`}
                      className="profile-button"
                      title="View Profile"
                    >
                      <FontAwesomeIcon icon={faUser} />
                    </Link>
                    <button
                      className="edit-button"
                      onClick={() => startEditingCandidate(candidate)}
                      title="Update Status"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    {candidate.interviewNotes &&
                      candidate.interviewNotes.length > 0 && (
                        <button
                          className="notes-button"
                          onClick={() => viewCandidateNotes(candidate)}
                          title="View Notes"
                        >
                          <FontAwesomeIcon icon={faClipboardList} />
                        </button>
                      )}
                    <button
                      className="delete-button"
                      onClick={() => handleDeleteCandidate(candidate._id)}
                      title="Delete Candidate"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
                {editingCandidate === candidate._id && (
                  <tr>
                    <td colSpan="7">
                      <div className="edit-row">
                        <div className="form-group">
                          <label className="form-label">
                            Interview Status:
                          </label>
                          <select
                            value={interviewStatus}
                            onChange={(e) => setInterviewStatus(e.target.value)}
                            className="form-select"
                          >
                            {interviewStages.map((stage) => (
                              <option key={stage} value={stage}>
                                {stage}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="form-group">
                          <label className="form-label">Add Note:</label>
                          <textarea
                            value={interviewNote}
                            onChange={(e) => setInterviewNote(e.target.value)}
                            placeholder="Enter notes about this interview stage..."
                            className="form-textarea"
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">
                            Next Interview Date:
                          </label>
                          <input
                            type="datetime-local"
                            value={nextInterviewDate}
                            onChange={(e) =>
                              setNextInterviewDate(e.target.value)
                            }
                            className="form-input"
                          />
                        </div>
                        <div className="button-group">
                          <button
                            className="cancel-button"
                            onClick={cancelEditing}
                          >
                            <FontAwesomeIcon icon={faTimes} /> Cancel
                          </button>
                          <button
                            className="save-button"
                            onClick={() => saveInterviewStatus(candidate._id)}
                          >
                            <FontAwesomeIcon icon={faSave} /> Save
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      )}

      {/* Notes Modal */}
      {showNotesModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-title">
                Notes for {currentCandidateName}
              </div>
              <button
                className="modal-close-button"
                onClick={() => setShowNotesModal(false)}
              >
                &times;
              </button>
            </div>
            <div>
              {currentCandidateNotes.length > 0 ? (
                currentCandidateNotes.map((note, index) => (
                  <div key={index} className="note-item">
                    <div className="note-header">
                      <span className="note-stage">{note.stage}</span>
                      <span className="note-date">
                        {formatDate(note.createdAt)}
                      </span>
                    </div>
                    <div>{note.note}</div>
                  </div>
                ))
              ) : (
                <p>No notes available.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SavedCandidates;
