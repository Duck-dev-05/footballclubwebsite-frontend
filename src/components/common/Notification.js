import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../CSS/Notification.css';

const Notification = ({ type, message }) => {
  const icons = {
    success: 'check-circle',
    error: 'exclamation-circle',
    warning: 'exclamation-triangle',
    info: 'info-circle'
  };

  return (
    <div className={`notification ${type}`}>
      <div className="notification-content">
        <FontAwesomeIcon icon={icons[type]} />
        <span>{message}</span>
      </div>
    </div>
  );
};

export default Notification; 