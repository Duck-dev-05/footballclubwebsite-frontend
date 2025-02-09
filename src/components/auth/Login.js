import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaExclamationCircle } from 'react-icons/fa';
import { teamPhoto } from '../../images';
import '../../CSS/Login.css';
import SocialAuth from './SocialAuth';

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState('');
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading('form');
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
                const from = location.state?.from?.pathname || '/';
                navigate(from);
            }
        } catch (err) {
            setError(err.message || 'An error occurred during login');
        } finally {
            setLoading('');
        }
    };

    const handleSocialAuthSuccess = (authData) => {
        // Store auth data
        localStorage.setItem('token', authData.token);
        localStorage.setItem('userId', authData.user.id);
        localStorage.setItem('userRole', authData.user.role);
        localStorage.setItem('username', authData.user.username);

        // Redirect based on role
        if (authData.user.role === 'admin') {
            navigate('/admin/dashboard');
        } else {
            const from = location.state?.from?.pathname || '/';
            navigate(from);
        }
    };

    return (
        <div className="login-container">
            <div className="login-wrapper">
                <div className="login-box">
                    <div className="login-header">
                        <img src={teamPhoto} alt="FC ESCUELA" className="login-logo" />
                        <h1>Welcome Back</h1>
                        <p>Please enter your details to continue</p>
                    </div>

                    {error && (
                        <div className="error-message">
                            <FaExclamationCircle />
                            <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="login-form" noValidate>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="Enter your email"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <div className="password-input-group">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    placeholder="Enter your password"
                                    required
                                />
                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() => setShowPassword(!showPassword)}
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>

                        <div className="form-options">
                            <label className="remember-me">
                                <input
                                    type="checkbox"
                                    name="rememberMe"
                                    checked={formData.rememberMe}
                                    onChange={handleInputChange}
                                />
                                <span>Remember me</span>
                            </label>
                            <Link to="/forgot-password" className="forgot-link">
                                Forgot password?
                            </Link>
                        </div>

                        <button 
                            type="submit" 
                            className={`submit-btn ${loading === 'form' ? 'loading' : ''}`}
                            disabled={!!loading}
                        >
                            {loading === 'form' ? (
                                <span className="loading-spinner"></span>
                            ) : 'Sign In'}
                        </button>
                    </form>

                    <SocialAuth onSuccess={handleSocialAuthSuccess} />

                    <div className="register-prompt">
                        <span>Don't have an account?</span>
                        <Link to="/register" className="register-link">
                            Sign up for free
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login; 