import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFileAlt,
  faUser,
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
  faStar,
  faFile,
  faFileDownload,
  faGraduationCap,
  faBriefcase,
  faClipboardList,
  faEdit,
  faChevronLeft,
  faCalendarAlt,
  faSpinner,
  faExclamationTriangle,
  faTimes,
  faSave,
  faPlus,
  faTrash,
  faCloudUploadAlt,
} from '@fortawesome/free-solid-svg-icons';
import { backend_url } from '../config';
import '../CandidateProfile.css';

function CandidateProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [candidate, setCandidate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState({
    phoneNumber: '',
    location: '',
    skills: [],
    experience: [],
    education: [],
  });

  const [skillInput, setSkillInput] = useState('');
  const [fileUploading, setFileUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState(null);

  // Interview stages and colors (same as in SavedCandidates)
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

  useEffect(() => {
    fetchCandidateProfile();
  }, [id]);

  const fetchCandidateProfile = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${backend_url}/candidates/${id}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch candidate: ${response.status}`);
      }

      const data = await response.json();
      setCandidate(data);

      // Initialize profile data for editing
      setProfileData({
        phoneNumber: data.phoneNumber || '',
        location: data.location || '',
        skills: data.skills || [],
        experience: data.experience || [],
        education: data.education || [],
      });

      setError(null);
    } catch (err) {
      console.error('Error fetching candidate profile:', err);
      setError('Failed to load candidate profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = async () => {
    try {
      setLoading(true);

      const response = await fetch(`${backend_url}/candidates/${id}/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const data = await response.json();
      setCandidate(data.candidate);
      setEditMode(false);
      setError(null);
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('resumeFile', file);

    try {
      setFileUploading(true);
      setUploadProgress(0);
      setUploadError(null);

      const xhr = new XMLHttpRequest();

      // Track upload progress
      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
          const progressPercent = Math.round(
            (event.loaded / event.total) * 100
          );
          setUploadProgress(progressPercent);
        }
      });

      xhr.onload = function () {
        if (xhr.status === 200) {
          fetchCandidateProfile(); // Refresh candidate data
        } else {
          setUploadError('Upload failed. Please try again.');
        }
        setFileUploading(false);
      };

      xhr.onerror = function () {
        setUploadError('Upload failed. Please try again.');
        setFileUploading(false);
      };

      xhr.open('POST', `${backend_url}/candidates/${id}/resume`);
      xhr.send(formData);
    } catch (err) {
      console.error('Error uploading file:', err);
      setUploadError('Upload failed. Please try again.');
      setFileUploading(false);
    }
  };

  const handleAddSkill = () => {
    if (skillInput.trim() === '') return;

    // Add skill if it doesn't already exist
    if (!profileData.skills.includes(skillInput.trim())) {
      setProfileData({
        ...profileData,
        skills: [...profileData.skills, skillInput.trim()],
      });
    }

    setSkillInput('');
  };

  const handleRemoveSkill = (skill) => {
    setProfileData({
      ...profileData,
      skills: profileData.skills.filter((s) => s !== skill),
    });
  };

  const handleAddExperience = () => {
    setProfileData({
      ...profileData,
      experience: [
        ...profileData.experience,
        { title: '', company: '', duration: '', description: '' },
      ],
    });
  };

  const handleUpdateExperience = (index, field, value) => {
    const updatedExperience = [...profileData.experience];
    updatedExperience[index][field] = value;

    setProfileData({
      ...profileData,
      experience: updatedExperience,
    });
  };

  const handleRemoveExperience = (index) => {
    setProfileData({
      ...profileData,
      experience: profileData.experience.filter((_, i) => i !== index),
    });
  };

  const handleAddEducation = () => {
    setProfileData({
      ...profileData,
      education: [
        ...profileData.education,
        { degree: '', institution: '', year: '' },
      ],
    });
  };

  const handleUpdateEducation = (index, field, value) => {
    const updatedEducation = [...profileData.education];
    updatedEducation[index][field] = value;

    setProfileData({
      ...profileData,
      education: updatedEducation,
    });
  };

  const handleRemoveEducation = (index) => {
    setProfileData({
      ...profileData,
      education: profileData.education.filter((_, i) => i !== index),
    });
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

  if (loading && !candidate) {
    return (
      <div className="candidate-container">
        <div className="loading-container">
          <FontAwesomeIcon icon={faSpinner} spin className="icon" />
          <p>Loading candidate profile...</p>
        </div>
      </div>
    );
  }

  if (error && !candidate) {
    return (
      <div className="candidate-container">
        <div className="loading-container">
          <FontAwesomeIcon
            icon={faExclamationTriangle}
            className="error-icon"
          />
          <p>{error}</p>
          <button
            onClick={fetchCandidateProfile}
            className="edit-button"
            style={{ marginTop: '15px' }}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!candidate) {
    return (
      <div className="candidate-container">
        <div className="loading-container">
          <p>Candidate not found.</p>
          <Link to="/candidates" className="back-link">
            <FontAwesomeIcon icon={faChevronLeft} /> Back to Candidates
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="candidate-container">
      <div className="candidate-header">
        <Link to="/candidates" className="back-link">
          <FontAwesomeIcon icon={faChevronLeft} /> Back to Candidates
        </Link>

        {!editMode ? (
          <button onClick={() => setEditMode(true)} className="edit-button">
            <FontAwesomeIcon icon={faEdit} /> Edit Profile
          </button>
        ) : (
          <div className="button-group">
            <button
              onClick={() => setEditMode(false)}
              className="cancel-button"
            >
              <FontAwesomeIcon icon={faTimes} /> Cancel
            </button>
            <button onClick={handleProfileUpdate} className="save-button">
              <FontAwesomeIcon icon={faSave} /> Save Changes
            </button>
          </div>
        )}
      </div>

      <div className="profile-grid">
        {/* Sidebar */}
        <div className="sidebar">
          <div className="profile-image">
            <FontAwesomeIcon icon={faUser} />
          </div>

          <h2 className="candidate-name">{candidate.name}</h2>

          <div
            className="status-badge"
            style={{
              backgroundColor:
                stageColors[candidate.interviewStatus || 'Not Started'],
            }}
          >
            {candidate.interviewStatus || 'Not Started'}
          </div>

          <div className="info-item">
            <FontAwesomeIcon icon={faEnvelope} className="info-icon" />
            <span>{candidate.email}</span>
          </div>

          {!editMode ? (
            <>
              {candidate.phoneNumber && (
                <div className="info-item">
                  <FontAwesomeIcon icon={faPhone} className="info-icon" />
                  <span>{candidate.phoneNumber}</span>
                </div>
              )}

              {candidate.location && (
                <div className="info-item">
                  <FontAwesomeIcon
                    icon={faMapMarkerAlt}
                    className="info-icon"
                  />
                  <span>{candidate.location}</span>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="form-group">
                <label className="label">Phone Number</label>
                <input
                  type="text"
                  value={profileData.phoneNumber}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      phoneNumber: e.target.value,
                    })
                  }
                  className="text-input"
                  placeholder="Enter phone number"
                />
              </div>

              <div className="form-group">
                <label className="label">Location</label>
                <input
                  type="text"
                  value={profileData.location}
                  onChange={(e) =>
                    setProfileData({ ...profileData, location: e.target.value })
                  }
                  className="text-input"
                  placeholder="Enter location"
                />
              </div>
            </>
          )}

          <div className="info-item">
            <FontAwesomeIcon icon={faStar} className="info-icon" />
            <span>Score: {candidate.similarityScore || 'N/A'}</span>
          </div>

          {candidate.nextInterviewDate && (
            <div className="info-item">
              <FontAwesomeIcon icon={faCalendarAlt} className="info-icon" />
              <span>
                Next Interview: {formatDate(candidate.nextInterviewDate)}
              </span>
            </div>
          )}

          <div style={{ marginTop: '20px' }}>
            <div className="section-title">
              <FontAwesomeIcon icon={faFile} /> Resume
            </div>

            {candidate.resumeFile && candidate.resumeFile.filename ? (
              <a
                href={`${backend_url}/candidates/${candidate._id}/resume`}
                target="_blank"
                rel="noopener noreferrer"
                className="resume-link"
              >
                <FontAwesomeIcon icon={faFileDownload} />
                {candidate.resumeFile.filename}
              </a>
            ) : (
              <div className="no-resume">No resume uploaded yet</div>
            )}

            <label htmlFor="resumeUpload" className="file-upload-box">
              <FontAwesomeIcon
                icon={faCloudUploadAlt}
                style={{ fontSize: '1.5rem', marginBottom: '10px' }}
              />
              <div>Click to upload resume</div>
              <input
                type="file"
                id="resumeUpload"
                className="file-upload-input"
                onChange={handleFileUpload}
                accept=".pdf,.doc,.docx"
              />
            </label>

            {fileUploading && (
              <div className="progress-container">
                <div>Uploading... {uploadProgress}%</div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}

            {uploadError && <div className="upload-error">{uploadError}</div>}
          </div>
        </div>

        {/* Main Content */}
        <div className="main-content">
          {/* Summary */}
          <div className="profile-card">
            <div className="section-title">
              <FontAwesomeIcon icon={faFileAlt} /> Resume Summary
            </div>
            <div>{candidate.resumeSummary || 'No summary available'}</div>
          </div>

          {/* Skills */}
          <div className="profile-card">
            {!editMode ? (
              <>
                <div className="section-title">
                  <FontAwesomeIcon icon={faClipboardList} /> Skills
                </div>
                {candidate.skills && candidate.skills.length > 0 ? (
                  <div className="skills-list">
                    {candidate.skills.map((skill, index) => (
                      <div key={index} className="skill-item">
                        {skill}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div>No skills listed</div>
                )}
              </>
            ) : (
              <>
                <div className="section-title">
                  <FontAwesomeIcon icon={faClipboardList} /> Skills
                </div>
                <div className="skills-list">
                  {profileData.skills.map((skill, index) => (
                    <div key={index} className="skill-item">
                      {skill}
                      <button
                        onClick={() => handleRemoveSkill(skill)}
                        className="remove-button"
                      >
                        <FontAwesomeIcon icon={faTimes} />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="skill-input">
                  <input
                    type="text"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    placeholder="Add a skill"
                    className="input"
                    onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                  />
                  <button onClick={handleAddSkill} className="add-button">
                    <FontAwesomeIcon icon={faPlus} /> Add
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Experience */}
          <div className="profile-card">
            {!editMode ? (
              <>
                <div className="section-title">
                  <FontAwesomeIcon icon={faBriefcase} /> Experience
                </div>
                {candidate.experience && candidate.experience.length > 0 ? (
                  <div>
                    {candidate.experience.map((exp, index) => (
                      <div key={index} className="experience-item">
                        <div className="experience-header">
                          <div className="experience-title">{exp.title}</div>
                        </div>
                        <div className="experience-company">{exp.company}</div>
                        <div className="experience-duration">
                          {exp.duration}
                        </div>
                        <div>{exp.description}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div>No experience listed</div>
                )}
              </>
            ) : (
              <>
                <div className="section-title-with-button">
                  <div className="section-title">
                    <FontAwesomeIcon icon={faBriefcase} /> Experience
                  </div>
                  <button onClick={handleAddExperience} className="add-button">
                    <FontAwesomeIcon icon={faPlus} /> Add Experience
                  </button>
                </div>

                {profileData.experience.map((exp, index) => (
                  <div key={index} className="experience-item">
                    <div className="experience-header">
                      <div>Experience #{index + 1}</div>
                      <button
                        onClick={() => handleRemoveExperience(index)}
                        className="remove-button"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>

                    <div className="form-group-grid">
                      <div className="form-group">
                        <label className="label">Title</label>
                        <input
                          type="text"
                          value={exp.title}
                          onChange={(e) =>
                            handleUpdateExperience(
                              index,
                              'title',
                              e.target.value
                            )
                          }
                          className="text-input"
                          placeholder="Job Title"
                        />
                      </div>

                      <div className="form-group">
                        <label className="label">Company</label>
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) =>
                            handleUpdateExperience(
                              index,
                              'company',
                              e.target.value
                            )
                          }
                          className="text-input"
                          placeholder="Company Name"
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="label">Duration</label>
                      <input
                        type="text"
                        value={exp.duration}
                        onChange={(e) =>
                          handleUpdateExperience(
                            index,
                            'duration',
                            e.target.value
                          )
                        }
                        className="text-input"
                        placeholder="e.g. Jan 2020 - Present"
                      />
                    </div>

                    <div className="form-group">
                      <label className="label">Description</label>
                      <textarea
                        value={exp.description}
                        onChange={(e) =>
                          handleUpdateExperience(
                            index,
                            'description',
                            e.target.value
                          )
                        }
                        className="textarea"
                        placeholder="Description of responsibilities and achievements"
                      ></textarea>
                    </div>
                  </div>
                ))}

                {profileData.experience.length === 0 && (
                  <div>
                    No experience added yet. Click 'Add Experience' to add your
                    first entry.
                  </div>
                )}
              </>
            )}
          </div>

          {/* Education */}
          <div className="profile-card">
            {!editMode ? (
              <>
                <div className="section-title">
                  <FontAwesomeIcon icon={faGraduationCap} /> Education
                </div>
                {candidate.education && candidate.education.length > 0 ? (
                  <div>
                    {candidate.education.map((edu, index) => (
                      <div key={index} className="experience-item">
                        <div className="experience-title">{edu.degree}</div>
                        <div className="experience-company">
                          {edu.institution}
                        </div>
                        <div className="experience-duration">{edu.year}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div>No education listed</div>
                )}
              </>
            ) : (
              <>
                <div className="section-title-with-button">
                  <div className="section-title">
                    <FontAwesomeIcon icon={faGraduationCap} /> Education
                  </div>
                  <button onClick={handleAddEducation} className="add-button">
                    <FontAwesomeIcon icon={faPlus} /> Add Education
                  </button>
                </div>

                {profileData.education.map((edu, index) => (
                  <div key={index} className="experience-item">
                    <div className="experience-header">
                      <div>Education #{index + 1}</div>
                      <button
                        onClick={() => handleRemoveEducation(index)}
                        className="remove-button"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>

                    <div className="form-group">
                      <label className="label">Degree</label>
                      <input
                        type="text"
                        value={edu.degree}
                        onChange={(e) =>
                          handleUpdateEducation(index, 'degree', e.target.value)
                        }
                        className="text-input"
                        placeholder="e.g. Bachelor of Science in Computer Science"
                      />
                    </div>

                    <div className="form-group">
                      <label className="label">Institution</label>
                      <input
                        type="text"
                        value={edu.institution}
                        onChange={(e) =>
                          handleUpdateEducation(
                            index,
                            'institution',
                            e.target.value
                          )
                        }
                        className="text-input"
                        placeholder="University or College Name"
                      />
                    </div>

                    <div className="form-group">
                      <label className="label">Year</label>
                      <input
                        type="text"
                        value={edu.year}
                        onChange={(e) =>
                          handleUpdateEducation(index, 'year', e.target.value)
                        }
                        className="text-input"
                        placeholder="e.g. 2015-2019 or 2020"
                      />
                    </div>
                  </div>
                ))}

                {profileData.education.length === 0 && (
                  <div>
                    No education added yet. Click 'Add Education' to add your
                    first entry.
                  </div>
                )}
              </>
            )}
          </div>

          {/* Interview Notes */}
          <div className="profile-card">
            <div className="section-title">
              <FontAwesomeIcon icon={faClipboardList} /> Interview Notes
            </div>

            {candidate.interviewNotes && candidate.interviewNotes.length > 0 ? (
              <div className="notes-list">
                {candidate.interviewNotes.map((note, index) => (
                  <div key={index} className="note-item">
                    <div className="note-header">
                      <span className="note-stage">{note.stage}</span>
                      <span className="note-date">
                        {formatDate(note.createdAt)}
                      </span>
                    </div>
                    <div>{note.note}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div>No interview notes yet</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CandidateProfile;
