// import React from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// //import './NavigationHeader.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {
//   faUsers,
//   faCloudUploadAlt,
//   faSignOutAlt,
// } from '@fortawesome/free-solid-svg-icons';
// import logo from '../assets/coreopsai.png';

// function NavigationHeader({ setIsLoggedIn }) {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     // Clear any auth state/tokens
//     setIsLoggedIn(false);
//     // Redirect to login page
//     navigate('/signin');
//   };

//   return (
//     <header className="nav-header">
//       <div className="nav-logo">
//         <img src={logo} alt="CoreHire.AI" />
//         <h1>CoreHire.AI</h1>
//       </div>

//       <nav className="nav-links">
//         <Link
//           to="/candidates"
//           className={location.pathname === '/candidates' ? 'active' : ''}
//         >
//           <FontAwesomeIcon icon={faUsers} /> Candidates
//         </Link>
//         <Link
//           to="/upload"
//           className={location.pathname === '/upload' ? 'active' : ''}
//         >
//           <FontAwesomeIcon icon={faCloudUploadAlt} /> Upload Resumes
//         </Link>
//       </nav>

//       <button className="logout-button" onClick={handleLogout}>
//         <FontAwesomeIcon icon={faSignOutAlt} /> Logout
//       </button>
//     </header>
//   );
// }

// export default NavigationHeader;

import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUsers,
  faCloudUploadAlt,
  faSignOutAlt,
  faChartBar,
} from '@fortawesome/free-solid-svg-icons';

function NavigationHeader({ setIsLoggedIn }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any auth state/tokens
    setIsLoggedIn(false);
    // Redirect to login page
    navigate('/signin');
  };

  // Inline styles
  const styles = {
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '12px 20px',
      backgroundColor: '#ffffff',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
      marginBottom: '20px',
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
    },
    logoImage: {
      height: '35px',
    },
    logoText: {
      fontSize: '1.2rem',
      fontWeight: '600',
      color: '#5e35b1',
      margin: '0',
    },
    navLinks: {
      display: 'flex',
      gap: '20px',
    },
    link: {
      textDecoration: 'none',
      color: '#555',
      fontWeight: '500',
      padding: '8px 12px',
      borderRadius: '4px',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
    },
    activeLink: {
      backgroundColor: '#5e35b1',
      color: 'white',
    },
    logoutButton: {
      backgroundColor: '#f5f5f5',
      color: '#555',
      border: 'none',
      padding: '8px 15px',
      borderRadius: '4px',
      cursor: 'pointer',
      fontWeight: '500',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
    },
  };

  return (
    <header style={styles.header}>
      <div style={styles.logo}>
        <h1 style={styles.logoText}>CoreHire.AI</h1>
      </div>

      <nav style={styles.navLinks}>
        <Link
          to="/candidates"
          style={{
            ...styles.link,
            ...(location.pathname === '/candidates' ? styles.activeLink : {}),
          }}
        >
          <FontAwesomeIcon icon={faUsers} /> Candidates
        </Link>
        <Link
          to="/interview-tracking"
          style={{
            ...styles.link,
            ...(location.pathname === '/interview-tracking'
              ? styles.activeLink
              : {}),
          }}
        >
          <FontAwesomeIcon icon={faChartBar} /> Interview Tracking
        </Link>
        <Link
          to="/upload"
          style={{
            ...styles.link,
            ...(location.pathname === '/upload' ? styles.activeLink : {}),
          }}
        >
          <FontAwesomeIcon icon={faCloudUploadAlt} /> Upload Resumes
        </Link>
      </nav>

      <button style={styles.logoutButton} onClick={handleLogout}>
        <FontAwesomeIcon icon={faSignOutAlt} /> Logout
      </button>
    </header>
  );
}

export default NavigationHeader;
