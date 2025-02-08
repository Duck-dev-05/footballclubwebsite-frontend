import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { teamPhoto } from '../images';
import '../CSS/Login.css';
import authService from '../services/authService';
import FacebookLogin from '@greatsumini/react-facebook-login';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('login');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    role: 'user'
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLoginSuccess = (data) => {
    // Store auth data
    localStorage.setItem('token', data.token);
    localStorage.setItem('userId', data.user.id);
    localStorage.setItem('userRole', data.user.role);
    localStorage.setItem('username', data.user.username);
    localStorage.setItem('email', data.user.email);

    // Redirect based on role
    if (data.user.role === 'admin') {
      navigate('/admin/dashboard');
    } else {
      const from = location.state?.from?.pathname || '/';
      navigate(from);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await authService.login(formData.email, formData.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      setSuccess('Registration successful! Please login.');
      setTimeout(() => setActiveTab('login'), 1500);
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    // Add forgot password logic here
  };

  const handleGoogleSuccess = async (response) => {
    try {
      const result = await authService.googleLogin(response.credential);
      if (result.success) {
        handleLoginSuccess(result);
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Google login failed');
    }
  };

  const handleFacebookLogin = async (response) => {
    try {
      const result = await authService.facebookLogin(response.accessToken);
      if (result.success) {
        handleLoginSuccess(result);
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Facebook login failed');
    }
  };

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <div className="login-container" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${teamPhoto})` }}>
        <div className="login-content">
          <div className="login-info">
            <div className="club-logo">
              <img src={teamPhoto} alt="FC ESCUELA Logo" />
            </div>
            <h1>Welcome to FC ESCUELA</h1>
            <p>Join our football community and experience excellence in the beautiful game.</p>
          </div>

          <div className="login-box">
            <div className="login-tabs">
              <button
                className={`tab-btn ${activeTab === 'login' ? 'active' : ''}`}
                onClick={() => setActiveTab('login')}
              >
                Sign In
              </button>
              <button
                className={`tab-btn ${activeTab === 'register' ? 'active' : ''}`}
                onClick={() => setActiveTab('register')}
              >
                Register
              </button>
            </div>

            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}

            {activeTab === 'login' ? (
              <>
                <form onSubmit={handleSubmit} className="login-form">
                  <div className="form-group">
                    <label>Email</label>
                    <div className="input-group">
                      <FontAwesomeIcon icon={faUser} />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <div className="input-group">
                      <FontAwesomeIcon icon={faLock} />
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <button type="submit" disabled={loading} className="submit-btn">
                    {loading ? 'Signing in...' : 'Sign In'}
                  </button>
                </form>

                <div className="forgot-password">
                  <button 
                    className="text-btn"
                    onClick={() => setActiveTab('forgot')}
                  >
                    Forgot Password?
                  </button>
                </div>

                <div className="social-login">
                  <p>or continue with</p>
                  <div className="social-buttons">
                    <button 
                      className="google-btn"
                      onClick={() => {
                        // Initialize Google OAuth
                        window.googleOAuth.init();
                      }}
                    >
                      <FontAwesomeIcon icon={faGoogle} />
                      Sign in with Google
                    </button>
                    <FacebookLogin
                      appId={process.env.REACT_APP_FACEBOOK_APP_ID}
                      onSuccess={(response) => {
                        handleFacebookLogin(response);
                      }}
                      onFail={(error) => {
                        console.error('Facebook login failed:', error);
                        setError('Failed to authenticate with Facebook');
                      }}
                      className="facebook-button"
                      style={{
                        backgroundColor: '#1877f2',
                        color: 'white',
                        padding: '10px 20px',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        width: '100%'
                      }}
                    >
                      <FontAwesomeIcon icon={faFacebook} />
                      Sign in with Facebook
                    </FacebookLogin>
                  </div>
                </div>
              </>
            ) : activeTab === 'register' ? (
              <form onSubmit={handleRegister} className="login-form">
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <button type="submit" className="submit-btn">Register</button>
              </form>
            ) : (
              <form onSubmit={handleForgotPassword} className="login-form">
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <button type="submit" className="submit-btn">Reset Password</button>
                <button 
                  type="button" 
                  className="back-btn"
                  onClick={() => setActiveTab('login')}
                >
                  Back to Login
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login; 