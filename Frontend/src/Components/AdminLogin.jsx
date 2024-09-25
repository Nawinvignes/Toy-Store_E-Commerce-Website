import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import './AdminLogin.css';

function AdminLogin({ setLoggedIn, setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:8080/adminauth/signin`, {
        params: {
          email: email,
          password: password,
        },
      });

      const admin = response.data;

      if (admin) {
        setLoggedIn(true);
        setUser(admin);
        navigate('/admin-dashboard');
      } else {
        setError('Invalid admin email or password');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="form-container">
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <div className="input-item">
            <label>Email:</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="input-item">
            <label>Password:</label>
            <div className="password-container">
              <input 
                type={showPassword ? 'text' : 'password'} 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
              <FontAwesomeIcon 
                icon={showPassword ? faEyeSlash : faEye} 
                className="password-icon" 
                onClick={togglePasswordVisibility} 
              />
            </div>
          </div>
        </div>
        {error && <p className="error-message">{error}</p>} {/* Display error message */}
        <button type="submit">Login</button>
      </form>
      <div className="social-icons">
        <FontAwesomeIcon icon={faGoogle} size="2x" className="icon" />
        <FontAwesomeIcon icon={faFacebook} size="2x" className="icon" />
        <FontAwesomeIcon icon={faInstagram} size="2x" className="icon" />
      </div>
      <p className="register-link">
        Go back to <Link to="/login">User Login</Link>
      </p>
    </div>
  );
}

export default AdminLogin;