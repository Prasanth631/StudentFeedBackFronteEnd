import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import kluLogo from './klu-logo.png';
import './LoginPage.css';

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== retypePassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    const user = {
      username,
      email,
      phoneNumber,
      password
    };

    try {
      await axios.post('http://localhost:8080/api/auth/signup', user); // Removed response variable
      setSuccessMessage("Registration successful!");
      setErrorMessage('');
      navigate('/');  // Redirect to login after successful signup
    } catch (error) {
      console.error("There was an error during registration!", error);
      setSuccessMessage('');
      setErrorMessage("Registration failed");
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
          <form className="login-form" onSubmit={handleRegister}>
            <label htmlFor="username">Username</label>
            <input 
              type="text" 
              id="username" 
              placeholder="Enter your username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required 
            />

            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              placeholder="Enter your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />

            <label htmlFor="phoneNumber">Phone Number</label>
            <input 
              type="text" 
              id="phoneNumber" 
              placeholder="Enter your phone number" 
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
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

            <label htmlFor="retypePassword">Retype Password</label>
            <input 
              type="password" 
              id="retypePassword" 
              placeholder="Retype your password" 
              value={retypePassword}
              onChange={(e) => setRetypePassword(e.target.value)}
              required 
            />
            
            <button type="submit" className="next-button">Register</button>
          </form>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
          <div className="registration-link">
            <a href="/">Back to Login</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
