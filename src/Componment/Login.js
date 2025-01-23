import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Login.css';

const Login = ({ setIsAdmin }) => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Simulated user database (in a real app, this would be on the backend)
  const users = [
    {
      email: 'admin@fcescuela.com',
      password: 'admin123',
      role: 'admin'
    },
    {
      email: 'user@fcescuela.com',
      password: 'user123',
      role: 'user'
    }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const user = users.find(user => user.email === credentials.email);

    if (user && user.password === credentials.password) {
      // Set admin status based on user role
      setIsAdmin(user.role === 'admin');
      
      // Store user info in localStorage
      localStorage.setItem('userRole', user.role);
      localStorage.setItem('isLoggedIn', 'true');
      
      // Redirect to home page
      navigate('/');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login to FC ESCUELA</h2>
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className="login-button">
            Login
          </button>
        </form>

        <div className="login-footer">
          <p>Demo Credentials:</p>
          <p>Admin: admin@fcescuela.com / admin123</p>
          <p>User: user@fcescuela.com / user123</p>
        </div>
      </div>
    </div>
  );
};

export default Login;