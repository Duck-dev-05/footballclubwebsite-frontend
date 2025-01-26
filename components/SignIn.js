import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SocialLogin from './SocialLogin';

const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const { data } = await axios.post('/api/auth/login', formData);
      
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className="sign-in-container">
      <div className="sign-in-left">
        <img src="/path-to-your-logo.png" alt="FC ESCUELA" />
        <div className="welcome-text">
          <h1>Welcome to FC ESCUELA</h1>
          <p>Join our football community and experience excellence in the beautiful game.</p>
        </div>
      </div>

      <div className="sign-in-right">
        <div className="auth-nav">
          <span className="auth-nav-item active">Sign In</span>
          <span className="auth-nav-item">Register</span>
        </div>

        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
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
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="sign-in-btn">
            Sign In
          </button>
        </form>

        <div className="forgot-password">
          <a href="/forgot-password">Forgot Password?</a>
        </div>

        <div className="divider">
          <span>Or sign in with</span>
        </div>

        <div className="social-login">
          <button className="social-btn google-btn">
            <img src="/google-icon.svg" alt="" />
            Sign in with Google
          </button>
          <button className="social-btn facebook-btn">
            <img src="/facebook-icon.svg" alt="" />
            Sign in with Facebook
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn; 