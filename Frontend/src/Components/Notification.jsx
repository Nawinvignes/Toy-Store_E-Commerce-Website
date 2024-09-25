import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './Notification.css';

const Notification = ({ message, clearNotification }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      clearNotification();
    }, 3000); // 3 seconds

    return () => clearTimeout(timer);
  }, [message, clearNotification]);

  return (
    <div className="notification-container">
      <div className="notification">
        <i className="fas fa-info-circle notification-icon"></i>
        {message}
      </div>
    </div>
  );
};

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  clearNotification: PropTypes.func.isRequired,
};

export default Notification;
