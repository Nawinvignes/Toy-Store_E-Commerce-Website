import React, { useEffect, useState } from 'react';
import './AdminFooter.css'; // Ensure you have a separate CSS file for the admin footer

function AdminFooter() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;
      if (scrollTop + clientHeight >= scrollHeight - 50) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    isVisible && (
      <footer className="admin-footer">
        <div className="admin-footer-content">
          <p>&copy; 2024 Joyville. All rights reserved.</p>
          <p className="admin-footer-links">
            <a href="/admin/dashboard">Dashboard</a> | 
            <a href="/admin/products">Manage Products</a> | 
            <a href="/admin/feedback">User Feedback</a> | 
            <a href="/admin/reports">Reports</a>
          </p>
        </div>
      </footer>
    )
  );
}

export default AdminFooter;