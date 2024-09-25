import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import './Login.css';

function Login({ setLoggedIn, setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:8080/userInfo/authenticate`, {
          username: email,
          password: password,
      });
      const user = response.data.token;
      const token = jwtDecode(user);
      if (user) {
        if (token.blocked) {
          setError('Your account has been blocked by the admin.');
        } else {
          localStorage.setItem('token', true);
          localStorage.setItem("userId", token.userId);
          localStorage.setItem("role", token.role);
          localStorage.setItem('tokenExpiration', Date.now() + 3600000);
          console.log(localStorage.getItem("userId"));
          console.log(localStorage.getItem("token"));
          console.log(localStorage.getItem("role"));
          console.log(localStorage.getItem("tokenExpiration"));
          setLoggedIn(true);
          setUser(user);
          navigate(user.role === 'admin' ? '/admin-dashboard' : '/profile');
        }
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
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
        Don't have an account? <Link to="/register">Register</Link>
      </p>
      <p className="admin-login-link">
        Admin? <Link to="/admin-login">Login here</Link>
      </p>
    </div>
  );
}

export default Login;