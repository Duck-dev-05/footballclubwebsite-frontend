import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import SocialLogin from '../components/auth/SocialLogin';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { teamPhoto } from '../images';
import '../CSS/Login.css';

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

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5046/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Store auth data
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.user.id);
      localStorage.setItem('userRole', data.user.role);
      localStorage.setItem('username', data.user.username);

      // Redirect based on role
      if (data.user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        // Redirect to the page they tried to access or home
        const from = location.state?.from?.pathname || '/';
        navigate(from);
      }
    } catch (err) {
      setError(err.message || 'An error occurred during login');
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
    // Here you would make an API call to register the user
    try {
      setSuccess('Registration successful! Please login.');
      setTimeout(() => setActiveTab('login'), 1500);
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    // Here you would make an API call to handle password reset
    try {
      setSuccess('Password reset link sent to your email!');
    } catch (err) {
      setError('Failed to send reset link. Please try again.');
    }
  };

  const handleSocialLogin = (data) => {
    localStorage.setItem('token', data.token);
    localStorage.setItem('userId', data.user.id);
    localStorage.setItem('userRole', data.user.role);
    localStorage.setItem('username', data.user.username);
    
    const from = location.state?.from?.pathname || '/';
    navigate(from);
  };

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <div className="login-container" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${teamPhoto})` }}>
        <div className="login-content">
          {/* Left side - Club Info */}
          <div className="login-info">
            <div className="club-logo">
              <img src={teamPhoto} alt="FC ESCUELA Logo" />
            </div>
            <h1>Welcome to FC ESCUELA</h1>
            <p>Join our football community and experience excellence in the beautiful game.</p>
          </div>

          {/* Right side - Login Form */}
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
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                    />
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
                  <p>Or sign in with:</p>
                  <div className="social-buttons">
                    <button 
                      onClick={() => handleSocialLogin('google')}
                      className="social-btn google"
                    >
                      <FontAwesomeIcon icon={['fab', 'google']} /> Google
                    </button>
                    <button 
                      onClick={() => handleSocialLogin('facebook')}
                      className="social-btn facebook"
                    >
                      <FontAwesomeIcon icon={['fab', 'facebook']} /> Facebook
                    </button>
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
          <SocialLogin onSocialLogin={handleSocialLogin} />
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;