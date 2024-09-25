// src/components/AdminNavbar.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AdminNavbar.css';
import logo1 from './Assets/logo1.avif';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

function AdminNavbar({ onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <nav className="admin-navbar">
      <div className="admin-nav-left">
        <div className="menu-icon" onClick={toggleMenu}>
          <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
        </div>
        <div className="logo">
          <img src={logo1} style={{ borderRadius: "45%" }} alt="Kids TOS" className="logo-img" />
          <span className="app-name">Joyville</span>
        </div>
        <div className={`admin-nav-links ${menuOpen ? 'open' : ''}`}>
          <li><Link to="/admin-dashboard" onClick={() => setMenuOpen(false)}>Admin Dashboard</Link></li>
          <li><Link to="/admin/products" onClick={() => setMenuOpen(false)}>Manage Products</Link></li>
          <li><Link to="/admin/feedback" onClick={() => setMenuOpen(false)}>User Feedback</Link></li>
          <li><Link to="/admin/users" onClick={() => setMenuOpen(false)}>Manage Users</Link></li>
          <li><Link to="/admin/admins" onClick={() => setMenuOpen(false)}>Manage Admins</Link></li> {/* New link for Manage Admins */}
        </div>
      </div>
      <div className="admin-nav-right">
        <div className="admin-button" onClick={handleLogout}>
          <FontAwesomeIcon icon={faSignOutAlt} /> Logout
        </div>
      </div>
    </nav>
  );
}

export default AdminNavbar;
