import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUsers,
  faUserTie,
  faCalendarAlt,
  faChartBar,
  faListAlt,
  faSpinner,
  faExclamationTriangle,
  faCheckCircle,
  faArrowRight,
  faClock,
} from '@fortawesome/free-solid-svg-icons';
import { backend_url } from '../config';

function InterviewTracking() {
  const [trackingData, setTrackingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

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

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  useEffect(() => {
    fetchTrackingData();
  }, []);

  const fetchTrackingData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${backend_url}/interview-tracking`);

      if (!response.ok) {
        throw new Error(
          `Failed to fetch interview tracking data: ${response.status}`
        );
      }

      const data = await response.json();
      setTrackingData(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching interview tracking data:', err);
      setError('Failed to load interview tracking data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Inline styles
  const styles = {
    container: {
      padding: '20px',
      maxWidth: '1200px',
      margin: '0 auto',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px',
    },
    title: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      fontSize: '1.5rem',
      fontWeight: 'bold',
    },
    tabs: {
      display: 'flex',
      borderBottom: '1px solid #ddd',
      marginBottom: '20px',
    },
    tab: {
      padding: '10px 15px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      borderBottom: '3px solid transparent',
    },
    activeTab: {
      borderBottom: '3px solid #673ab7',
      color: '#673ab7',
      fontWeight: 'bold',
    },
    stageCard: {
      borderRadius: '8px',
      padding: '15px',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
      marginBottom: '15px',
      backgroundColor: 'white',
    },
    stageHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '10px',
    },
    stageTitle: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      fontSize: '1.1rem',
      fontWeight: 'bold',
    },
    stageCount: {
      backgroundColor: '#e0e0e0',
      borderRadius: '20px',
      padding: '3px 12px',
      fontSize: '0.9rem',
      fontWeight: 'bold',
    },
    upcomingCard: {
      borderRadius: '8px',
      padding: '15px',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
      marginBottom: '15px',
      backgroundColor: 'white',
      borderLeft: '4px solid #03a9f4',
    },
    upcomingHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '10px',
    },
    upcomingName: {
      fontWeight: 'bold',
      fontSize: '1.1rem',
    },
    upcomingDate: {
      color: '#03a9f4',
      fontWeight: 'bold',
      display: 'flex',
      alignItems: 'center',
      gap: '5px',
    },
    recentCard: {
      borderRadius: '8px',
      padding: '15px',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
      marginBottom: '15px',
      backgroundColor: 'white',
      borderLeft: '4px solid #9c27b0',
    },
    stagePill: {
      display: 'inline-block',
      padding: '3px 10px',
      borderRadius: '20px',
      fontSize: '0.8rem',
      color: 'white',
      marginRight: '10px',
    },
    candidateLink: {
      color: '#673ab7',
      textDecoration: 'none',
      display: 'flex',
      alignItems: 'center',
      gap: '5px',
    },
    loadingContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '50px',
      backgroundColor: '#f8f8f8',
      borderRadius: '8px',
      marginTop: '20px',
    },
    icon: {
      fontSize: '2em',
      marginBottom: '15px',
      color: '#673ab7',
    },
    errorIcon: {
      fontSize: '2em',
      marginBottom: '15px',
      color: '#e53935',
    },
    retryButton: {
      marginTop: '15px',
      padding: '8px 16px',
      backgroundColor: '#673ab7',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    },
    stagesGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: '15px',
    },
    flex: {
      display: 'flex',
      gap: '15px',
    },
    leftCol: {
      flex: '2',
    },
    rightCol: {
      flex: '1',
    },
    progressBarContainer: {
      marginTop: '20px',
      marginBottom: '30px',
    },
    progressBar: {
      display: 'flex',
      width: '100%',
      height: '30px',
      borderRadius: '4px',
      overflow: 'hidden',
    },
    sectionTitle: {
      fontSize: '1.2rem',
      fontWeight: 'bold',
      margin: '20px 0 15px 0',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
  };

  // Render overview tab content
  const renderOverview = () => {
    if (!trackingData) return null;

    // Prepare data for progress bar
    const stageNames = trackingData.stageCounts.map((stage) => stage._id);
    const totalCandidates = trackingData.stageCounts.reduce(
      (sum, stage) => sum + stage.count,
      0
    );

    return (
      <div>
        <div style={styles.progressBarContainer}>
          <h3 style={styles.sectionTitle}>
            <FontAwesomeIcon icon={faChartBar} /> Candidates by Stage
          </h3>
          <div style={styles.progressBar}>
            {trackingData.stageCounts.map((stage) => (
              <div
                key={stage._id}
                style={{
                  backgroundColor: stageColors[stage._id] || '#9e9e9e',
                  width: `${(stage.count / totalCandidates) * 100}%`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '0.8rem',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  padding: '0 5px',
                }}
                title={`${stage._id}: ${stage.count} candidates`}
              >
                {stage.count > 0 ? `${stage._id}: ${stage.count}` : ''}
              </div>
            ))}
          </div>
        </div>

        <div style={styles.flex}>
          <div style={styles.leftCol}>
            <h3 style={styles.sectionTitle}>
              <FontAwesomeIcon icon={faCalendarAlt} /> Upcoming Interviews
            </h3>
            {trackingData.upcomingInterviews.length > 0 ? (
              trackingData.upcomingInterviews.map((candidate) => (
                <div key={candidate._id} style={styles.upcomingCard}>
                  <div style={styles.upcomingHeader}>
                    <div style={styles.upcomingName}>{candidate.name}</div>
                    <div style={styles.upcomingDate}>
                      <FontAwesomeIcon icon={faCalendarAlt} />
                      {formatDate(candidate.nextInterviewDate)}
                    </div>
                  </div>
                  <div>
                    <span
                      style={{
                        ...styles.stagePill,
                        backgroundColor: stageColors[candidate.interviewStatus],
                      }}
                    >
                      {candidate.interviewStatus}
                    </span>
                    <span>{candidate.email}</span>
                  </div>
                  <div style={{ marginTop: '10px', textAlign: 'right' }}>
                    <Link
                      to={`/candidates/${candidate._id}`}
                      style={styles.candidateLink}
                    >
                      View Profile <FontAwesomeIcon icon={faArrowRight} />
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p>No upcoming interviews scheduled.</p>
            )}
          </div>

          <div style={styles.rightCol}>
            <h3 style={styles.sectionTitle}>
              <FontAwesomeIcon icon={faClock} /> Recently Updated
            </h3>
            {trackingData.recentlyUpdated.map((candidate) => (
              <div key={candidate._id} style={styles.recentCard}>
                <div style={{ fontWeight: 'bold' }}>{candidate.name}</div>
                <div style={{ margin: '5px 0' }}>
                  <span
                    style={{
                      ...styles.stagePill,
                      backgroundColor: stageColors[candidate.interviewStatus],
                    }}
                  >
                    {candidate.interviewStatus}
                  </span>
                </div>
                <div
                  style={{
                    fontSize: '0.8rem',
                    color: '#757575',
                    marginBottom: '5px',
                  }}
                >
                  Updated: {formatDate(candidate.updatedAt)}
                </div>
                <div style={{ textAlign: 'right' }}>
                  <Link
                    to={`/candidates/${candidate._id}`}
                    style={styles.candidateLink}
                  >
                    View Profile <FontAwesomeIcon icon={faArrowRight} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Render candidates by stage tab content
  const renderCandidatesByStage = () => {
    if (!trackingData) return null;

    return (
      <div>
        <h3 style={styles.sectionTitle}>
          <FontAwesomeIcon icon={faUsers} /> Candidates by Interview Stage
        </h3>
        <div style={styles.stagesGrid}>
          {trackingData.stageCounts.map((stage) => (
            <div
              key={stage._id}
              style={{
                ...styles.stageCard,
                borderLeft: `4px solid ${stageColors[stage._id] || '#9e9e9e'}`,
              }}
            >
              <div style={styles.stageHeader}>
                <div style={styles.stageTitle}>{stage._id}</div>
                <div style={styles.stageCount}>{stage.count}</div>
              </div>
              <Link
                to={`/candidates?stage=${encodeURIComponent(stage._id)}`}
                style={styles.candidateLink}
              >
                View Candidates <FontAwesomeIcon icon={faArrowRight} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>
          <FontAwesomeIcon icon={faUserTie} /> Interview Tracking
        </h2>
      </div>

      {/* Tabs */}
      <div style={styles.tabs}>
        <div
          style={{
            ...styles.tab,
            ...(activeTab === 'overview' ? styles.activeTab : {}),
          }}
          onClick={() => setActiveTab('overview')}
        >
          <FontAwesomeIcon icon={faChartBar} /> Overview
        </div>
        <div
          style={{
            ...styles.tab,
            ...(activeTab === 'stages' ? styles.activeTab : {}),
          }}
          onClick={() => setActiveTab('stages')}
        >
          <FontAwesomeIcon icon={faListAlt} /> Candidates by Stage
        </div>
      </div>

      {loading ? (
        <div style={styles.loadingContainer}>
          <FontAwesomeIcon icon={faSpinner} spin style={styles.icon} />
          <p>Loading interview tracking data...</p>
        </div>
      ) : error ? (
        <div style={styles.loadingContainer}>
          <FontAwesomeIcon
            icon={faExclamationTriangle}
            style={styles.errorIcon}
          />
          <p>{error}</p>
          <button style={styles.retryButton} onClick={fetchTrackingData}>
            Retry
          </button>
        </div>
      ) : (
        <div>
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'stages' && renderCandidatesByStage()}
        </div>
      )}
    </div>
  );
}

export default InterviewTracking;
