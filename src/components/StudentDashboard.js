import React from 'react';
import { useNavigate } from 'react-router-dom';
import './StudentDashboard.css';
import profileIcon from './profile-icon.jpg';

function StudentDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');  // Redirect to login page
  };

  const handleNavigation = (section) => {
    // Here you can handle showing different content for each section
    console.log(`Navigating to: ${section}`);
    // Optionally update the state to show different content based on the section clicked
  };

  return (
    <div className="dashboard">
      <div className="sidebar">
        <h2>Student Dashboard</h2>
        {/* Replace <a> with <button> or <span> for handling internal navigation */}
        <button onClick={() => handleNavigation('home')} className="sidebar-link">Home</button>
        <button onClick={() => handleNavigation('courses')} className="sidebar-link">View Courses</button>
        <button onClick={() => handleNavigation('registration')} className="sidebar-link">Course Registration</button>
        <button onClick={() => handleNavigation('feedback')} className="sidebar-link">Give Feedback</button>
        <button onClick={() => handleNavigation('grades')} className="sidebar-link">View Grades</button>
        <button onClick={() => handleNavigation('calendar')} className="sidebar-link">Academic Calendar</button>
        <button onClick={() => handleNavigation('library')} className="sidebar-link">Library Resources</button>
        <button onClick={() => handleNavigation('services')} className="sidebar-link">Student Services</button>
        <button onClick={() => handleNavigation('settings')} className="sidebar-link">Settings</button>
      </div>
      <div className="dashboard-content">
        <div className="dashboard-header">
          <h2>Welcome, Student</h2>
          <div className="profile">
          <img src={profileIcon} alt="Profile" className="profile-icon" />
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </div>
        </div>
        <h3>Student Dashboard Overview</h3>
        <p>Here you can view your courses, submit feedback, and access various student services.</p>
      </div>
    </div>
  );
}

export default StudentDashboard;
