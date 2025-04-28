import React, { useState } from 'react';
import '../ResultsTable.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faFileAlt,
  faStar,
  faPaperPlane,
  faCalendarAlt,
  faUserTie,
  faFilter,
  faSave,
  faCheckCircle,
  faExclamationTriangle,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import { backend_url } from '../config'; // Import backend_url from config

function ResultsTable({ analysisResults }) {
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [scoreThreshold, setScoreThreshold] = useState(55);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState(null);

  const sortedResults = [...analysisResults].sort(
    (a, b) => b.similarityScore - a.similarityScore
  );

  // Filter results based on threshold (for highlighting purposes only)
  const highlightedResults = sortedResults.filter(
    (result) => result.similarityScore >= scoreThreshold
  );

  // Use all sorted results regardless of threshold
  const filteredResults = sortedResults;

  const toggleCandidateSelection = (email) => {
    setSelectedCandidates((prevSelected) =>
      prevSelected.includes(email)
        ? prevSelected.filter((e) => e !== email)
        : [...prevSelected, email]
    );
  };

  const generateMailLink = (email, result) => {
    const subject = encodeURIComponent('Resume Analysis - Google Form');
    const googleFormBaseUrl =
      'https://docs.google.com/forms/d/e/YOUR_GOOGLE_FORM_ID/viewform';

    const formLink = `${googleFormBaseUrl}?entry.123456=${encodeURIComponent(
      result.name
    )}&entry.654321=${encodeURIComponent(
      result.email
    )}&entry.111222=${encodeURIComponent(result.similarityScore)}`;

    const body = encodeURIComponent(
      `Hi ${result.name},\n\nThank you for submitting your resume.\nPlease fill out this short form:\n\n${formLink}\n\nBest regards,\nTeam CoreHire\n`
    );

    const outlookLink = `https://outlook.office.com/mail/deeplink/compose?to=${email}&subject=${subject}&body=${body}`;
    window.open(outlookLink);
  };

  const generateBulkMailLinkPerPerson = (candidates) => {
    candidates.forEach((current) => {
      const bccList = candidates
        .filter((c) => c.email !== current.email)
        .map((c) => c.email)
        .join(';');

      const googleFormBaseUrl =
        'https://docs.google.com/forms/d/e/YOUR_GOOGLE_FORM_ID/viewform';
      const formLink = `${googleFormBaseUrl}?entry.123456=${encodeURIComponent(
        current.name
      )}&entry.654321=${encodeURIComponent(
        current.email
      )}&entry.111222=${encodeURIComponent(current.similarityScore)}`;

      const subject = encodeURIComponent('Resume Analysis - Google Form');
      const body = encodeURIComponent(
        `Hi ${current.name},\n\nThank you for submitting your resume.\nPlease fill out this short form:\n\n${formLink}\n\nBest regards,\nTeam CoreHire\n`
      );

      const outlookLink =
        `https://outlook.office.com/mail/deeplink/compose?to=${current.email}` +
        (bccList ? `&bcc=${encodeURIComponent(bccList)}` : '') +
        `&subject=${subject}&body=${body}`;

      window.open(outlookLink, '_blank');
    });
  };

  const generateBulkCalendarInvitePerPerson = (candidates) => {
    candidates.forEach((current) => {
      const bccList = candidates
        .filter((c) => c.email !== current.email)
        .map((c) => c.email)
        .join(';');

      const subject = `Meeting Invitation - Resume Review for ${current.name}`;
      const bodyHTML = `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2 style="color: #5e42a6;">Hi ${current.name},</h2>
          <p>Please join the meeting to discuss your job roles and some important points related to your resume.</p>
          <p>Looking forward to our conversation!</p>
          <p style="margin-top: 30px;">Thanks,<br><strong>Team CoreHire</strong></p>
        </div>
      `;

      const outlookCalendarLink =
        `https://outlook.office.com/calendar/0/deeplink/compose` +
        `?path=/calendar/action/compose` +
        `&to=${encodeURIComponent(current.email)}` +
        (bccList ? `&bcc=${encodeURIComponent(bccList)}` : '') +
        `&subject=${encodeURIComponent(subject)}` +
        `&body=${encodeURIComponent(bodyHTML)}`;

      window.open(outlookCalendarLink, '_blank');
    });
  };

  const selectAllCandidates = () => {
    const allFilteredEmails = filteredResults.map((result) => result.email);
    setSelectedCandidates(allFilteredEmails);
  };

  const clearAllSelections = () => {
    setSelectedCandidates([]);
  };

  const saveSelectedCandidates = async () => {
    if (selectedCandidates.length === 0) {
      return;
    }

    try {
      setIsSaving(true);
      setSaveSuccess(false);
      setSaveError(null);

      // Get the full data for selected candidates
      const candidatesToSave = sortedResults
        .filter((candidate) => selectedCandidates.includes(candidate.email))
        .map((candidate) => ({
          name: candidate.name,
          email: candidate.email,
          resumeSummary: candidate.resumeSummary,
          similarityScore: candidate.similarityScore,
        }));

      // Make API call to save candidates using the backend_url from config
      const response = await fetch(`${backend_url}/candidates`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ candidates: candidatesToSave }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save candidates');
      }

      const data = await response.json();
      console.log('Save successful:', data);
      setSaveSuccess(true);

      // Auto-hide success message after 3 seconds
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error('Error saving candidates:', error);
      setSaveError(error.message || 'Failed to save candidates');

      // Auto-hide error message after 5 seconds
      setTimeout(() => setSaveError(null), 5000);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="app-container">
      <div className="full-page-container">
        <div className="results-table-container">
          <h2>
            <FontAwesomeIcon icon={faFileAlt} className="table-icon" /> Analysis
            Results
          </h2>

          {/* Filter Section */}
          <div className="filter-section" style={{ marginBottom: '15px' }}>
            <button
              className="email-button"
              style={{ marginRight: '10px', backgroundColor: '#673ab7' }}
              onClick={() => setShowFilterOptions(!showFilterOptions)}
            >
              <FontAwesomeIcon icon={faFilter} /> Filters
            </button>

            {showFilterOptions && (
              <div
                style={{
                  marginTop: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <label htmlFor="scoreFilter" style={{ fontSize: '0.9em' }}>
                  Minimum Score:
                </label>
                <input
                  type="range"
                  id="scoreFilter"
                  min="0"
                  max="100"
                  value={scoreThreshold}
                  onChange={(e) => setScoreThreshold(parseInt(e.target.value))}
                  style={{ width: '150px' }}
                />
                <span style={{ fontSize: '0.9em' }}>{scoreThreshold}</span>
              </div>
            )}
          </div>

          {/* Results Summary */}
          <div
            style={{ marginBottom: '15px', fontSize: '0.9em', color: '#555' }}
          >
            Showing all {sortedResults.length} candidates
            {scoreThreshold > 0
              ? ` (highlighting ${highlightedResults.length} candidates with score ≥ ${scoreThreshold})`
              : ''}
          </div>

          {/* Bulk Actions */}
          {filteredResults.length > 0 && (
            <div className="bulk-actions-container">
              <div className="selected-count">
                {selectedCandidates.length > 0
                  ? `${selectedCandidates.length} candidates selected`
                  : 'No candidates selected'}
              </div>

              <button
                className="email-button"
                onClick={selectAllCandidates}
                style={{ backgroundColor: '#673ab7' }}
                disabled={filteredResults.length === 0}
              >
                Select All
              </button>

              <button
                className="email-button"
                onClick={clearAllSelections}
                style={{ backgroundColor: '#888' }}
                disabled={selectedCandidates.length === 0}
              >
                Clear Selection
              </button>

              {selectedCandidates.length > 0 && (
                <>
                  <button
                    className="email-button"
                    onClick={() => {
                      const selected = sortedResults.filter((result) =>
                        selectedCandidates.includes(result.email)
                      );
                      generateBulkMailLinkPerPerson(selected);
                    }}
                  >
                    <FontAwesomeIcon icon={faPaperPlane} /> Send Form
                  </button>

                  <button
                    className="email-button"
                    onClick={saveSelectedCandidates}
                    disabled={isSaving}
                    style={{ backgroundColor: '#28a745' }}
                  >
                    {isSaving ? (
                      <>
                        <FontAwesomeIcon icon={faSpinner} spin /> Saving...
                      </>
                    ) : (
                      <>
                        <FontAwesomeIcon icon={faSave} /> Save to Database
                      </>
                    )}
                  </button>
                </>
              )}

              {saveSuccess && (
                <div className="save-notification success">
                  <FontAwesomeIcon icon={faCheckCircle} /> Candidates saved
                  successfully!
                </div>
              )}

              {saveError && (
                <div className="save-notification error">
                  <FontAwesomeIcon icon={faExclamationTriangle} /> {saveError}
                </div>
              )}
            </div>
          )}

          {filteredResults.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th style={{ width: '40px' }}>
                    <input
                      type="checkbox"
                      checked={
                        selectedCandidates.length === filteredResults.length &&
                        filteredResults.length > 0
                      }
                      onChange={
                        selectedCandidates.length === filteredResults.length
                          ? clearAllSelections
                          : selectAllCandidates
                      }
                    />
                  </th>
                  <th style={{ width: '120px' }}>
                    <FontAwesomeIcon icon={faUserTie} className="header-icon" />{' '}
                    Name
                  </th>
                  <th style={{ width: '180px' }}>
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className="header-icon"
                    />{' '}
                    Email
                  </th>
                  <th style={{ width: '80px' }}>
                    <FontAwesomeIcon icon={faStar} className="header-icon" />{' '}
                    Score
                  </th>
                  <th style={{ width: '40%' }}>
                    <FontAwesomeIcon icon={faFileAlt} className="header-icon" />{' '}
                    Summary
                  </th>
                  <th style={{ width: '180px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredResults.map((result, index) => (
                  <tr
                    key={index}
                    className={
                      result.similarityScore >= scoreThreshold
                        ? 'highlighted-row'
                        : ''
                    }
                  >
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedCandidates.includes(result.email)}
                        onChange={() => toggleCandidateSelection(result.email)}
                      />
                    </td>
                    <td className="name">{result.name}</td>
                    <td>{result.email}</td>
                    <td className="score">{result.similarityScore}</td>
                    <td>{result.resumeSummary}</td>
                    <td>
                      <button
                        className="email-button"
                        onClick={() => generateMailLink(result.email, result)}
                      >
                        <FontAwesomeIcon icon={faPaperPlane} /> Send Form
                      </button>
                      <button
                        className="email-button"
                        onClick={() =>
                          generateBulkCalendarInvitePerPerson([result])
                        }
                      >
                        <FontAwesomeIcon icon={faCalendarAlt} /> Send Event
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div
              style={{
                padding: '30px',
                textAlign: 'center',
                backgroundColor: '#f8f8f8',
                borderRadius: '8px',
                color: '#666',
              }}
            >
              <FontAwesomeIcon
                icon={faFileAlt}
                style={{ fontSize: '2em', marginBottom: '15px', opacity: 0.5 }}
              />
              <p>No candidates match the current filters.</p>
              <button
                className="email-button"
                onClick={() => setScoreThreshold(0)}
                style={{ marginTop: '10px' }}
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ResultsTable;
