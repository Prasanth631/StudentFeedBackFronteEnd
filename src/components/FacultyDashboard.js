import React from 'react';
import './FacultyDashboard.css';
import { useNavigate } from 'react-router-dom';
import profileIcon from './profile-icon.jpg'; // You'll need to download this icon

const FacultyDashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Add any logout logic here if needed
        navigate('/login'); // Redirect to login page
    };

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <div className="dashboard">
            <div className="sidebar">
                <h2>Faculty Dashboard</h2>
                <button onClick={() => handleNavigation('/')}>Home</button>
                <button onClick={() => handleNavigation('/view-classes')}>View Classes</button>
                <button onClick={() => handleNavigation('/review-feedback')}>Review Feedback</button>
                <button onClick={() => handleNavigation('/grade-management')}>Grade Management</button>
                <button onClick={() => handleNavigation('/course-materials')}>Course Materials</button>
                <button onClick={() => handleNavigation('/office-hours')}>Office Hours</button>
                <button onClick={() => handleNavigation('/research-portal')}>Research Portal</button>
                <button onClick={() => handleNavigation('/faculty-resources')}>Faculty Resources</button>
                <button onClick={() => handleNavigation('/settings')}>Settings</button>
            </div>
            <div className="dashboard-content">
                <div className="dashboard-header">
                    <h2>Welcome, Faculty</h2>
                    <div className="profile">
                        <img src={profileIcon} alt="Profile" className="profile-icon" />
                        <span>Faculty</span>
                        <button className="logout-btn" onClick={handleLogout}>Logout</button>
                    </div>
                </div>
                <h3>Faculty Dashboard Overview</h3>
                <p>Here you can manage your classes, review student feedback, and access faculty resources.</p>
            </div>
        </div>
    );
}

export default FacultyDashboard;