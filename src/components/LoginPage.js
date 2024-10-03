import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import kluLogo from './klu-logo.png';
import './LoginPage.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', {
        username,
        password,
      });
      if (response.status === 200) {
        const role = response.data.role; 
        if (role === 'admin') {
          navigate('/admin-dashboard');  
        } else if (role === 'faculty') {
          navigate('/faculty-dashboard');  
        } else {
          navigate('/student-dashboard');  
        }
      }
    } catch (error) {
      console.error("There was an error logging in!", error);
      setErrorMessage("Login failed: Invalid credentials");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="image-section" />
        <div className="login-section">
          <div className="login-header">
            <img src={kluLogo} alt="K L University Logo" className="klu-logo" />
            <h1>K L University</h1>
          </div>
          <p className="subtitle">The key to happiness is to sign in.</p>
          <form className="login-form" onSubmit={handleLogin}>
            <label htmlFor="username">Username</label>
            <input 
              type="text" 
              id="username" 
              placeholder="Enter your username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required 
            />
            
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              placeholder="Enter your password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
            <a href="/forgot-password" className="forgot-password">Forgot Password?</a>
            <button type="submit" className="next-button">Login</button>
          </form>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          <div className="registration-link">
            <a href="/signup">Registration</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
