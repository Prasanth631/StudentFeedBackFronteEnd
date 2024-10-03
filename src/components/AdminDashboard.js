import React from 'react';
import './AdminDashboard.css';
import { useNavigate } from 'react-router-dom';
import profileIcon from './profile-icon.jpg';
const AdminDashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Handle logout logic here
        localStorage.removeItem('token');
        navigate('/login'); // Redirect to login page after logout
    };

    const navigateTo = (path) => {
        // Navigate to the specified path
        navigate(path);
    };

    return (
        <div className="dashboard">
            <div className="sidebar">
                <h2>Admin Dashboard</h2>
                <button onClick={() => navigateTo('/')}>Home</button>
                <button onClick={() => navigateTo('/view-feedback')}>View Feedback</button>
                <button onClick={() => navigateTo('/manage-users')}>Manage Users</button>
                <button onClick={() => navigateTo('/course-management')}>Course Management</button>
                <button onClick={() => navigateTo('/faculty-management')}>Faculty Management</button>
                <button onClick={() => navigateTo('/student-management')}>Student Management</button>
                <button onClick={() => navigateTo('/report-generation')}>Report Generation</button>
                <button onClick={() => navigateTo('/system-analytics')}>System Analytics</button>
                <button onClick={() => navigateTo('/settings')}>Settings</button>
            </div>
            <div className="dashboard-content">
                <div className="dashboard-header">
                    <h2>Welcome, Admin User</h2>
                    <div className="profile">
                    <img src={profileIcon} alt="Profile" className="profile-icon" />
                        <button className="logout-btn" onClick={handleLogout}>Logout</button>
                    </div>
                </div>
                <h3>Admin Dashboard Overview</h3>
                <p>Here you can manage users, view feedback, and oversee the entire feedback system.</p>
            </div>
        </div>
    );
};

export default AdminDashboard;
