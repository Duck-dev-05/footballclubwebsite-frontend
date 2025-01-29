import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { teamPhoto } from '../images';
import '../CSS/ResetPassword.css';

const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [formData, setFormData] = useState({
    email: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleRequestReset = async (e) => {
    e.preventDefault();
    try {
      // Here you would make an API call to request password reset
      const response = await fetch('your-api/request-reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.email }),
      });

      if (response.ok) {
        setEmailSent(true);
        setSuccess('Reset instructions have been sent to your email!');
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to send reset email');
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      // Here you would make an API call to reset the password
      const response = await fetch('your-api/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          newPassword: formData.newPassword,
        }),
      });

      if (response.ok) {
        setSuccess('Password has been reset successfully!');
        setTimeout(() => navigate('/signin'), 2000);
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to reset password');
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="reset-container" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${teamPhoto})` }}>
      <div className="reset-content">
        <div className="reset-info">
          <div className="club-logo">
            <img src={teamPhoto} alt="FC ESCUELA Logo" />
          </div>
          <h1>Reset Password</h1>
          <p>We'll help you get back into your account.</p>
        </div>

        <div className="reset-box">
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          {!token ? (
            // Request Reset Form
            <form onSubmit={handleRequestReset} className="reset-form">
              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your registered email"
                />
              </div>
              <button type="submit" className="submit-btn">
                {emailSent ? 'Resend Email' : 'Send Reset Instructions'}
              </button>
              <button 
                type="button" 
                className="back-btn"
                onClick={() => navigate('/signin')}
              >
                Back to Login
              </button>
            </form>
          ) : (
            // Reset Password Form
            <form onSubmit={handleResetPassword} className="reset-form">
              <div className="form-group">
                <label>New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter new password"
                />
              </div>
              <div className="form-group">
                <label>Confirm New Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                  placeholder="Confirm new password"
                />
              </div>
              <button type="submit" className="submit-btn">Reset Password</button>
            </form>
          )}

          {emailSent && (
            <div className="email-instructions">
              <FontAwesomeIcon icon="envelope" className="icon" />
              <h3>Check Your Email</h3>
              <p>We've sent instructions to reset your password to {formData.email}</p>
              <p className="note">If you don't see the email, check your spam folder.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword; 