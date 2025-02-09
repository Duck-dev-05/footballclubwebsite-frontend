import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { 
  Box, 
  Container, 
  TextField, 
  Button, 
  Typography, 
  Alert, 
  Paper,
  Divider,
  CircularProgress
} from '@mui/material';
import api from '../config/axios';
import SocialAuth from './auth/SocialAuth';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleReady, setIsGoogleReady] = useState(false);

  useEffect(() => {
    // Check if Google is available
    const checkGoogleInit = () => {
      if (window.google) {
        console.log('Google OAuth initialized');
        setIsGoogleReady(true);
      } else {
        console.log('Waiting for Google OAuth...');
        setTimeout(checkGoogleInit, 100);
      }
    };
    checkGoogleInit();
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await api.post('/auth/login', formData);
      if (response.data.data?.token) {
        localStorage.setItem('token', response.data.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
        navigate(location.state?.from || '/');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      setIsLoading(true);
      const response = await api.post('/auth/google', {
        credential: credentialResponse.credential
      });
      
      if (response.data.data?.token) {
        localStorage.setItem('token', response.data.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
        navigate('/');
      }
    } catch (error) {
      console.error('Google login error:', error);
      setError(error.response?.data?.message || 'Failed to authenticate with Google');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleError = (error) => {
    console.error('Google Login Failed:', error);
    setError('Failed to authenticate with Google. Please try again.');
  };

  const renderGoogleButton = () => {
    if (!isGoogleReady) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress size={24} />
        </Box>
      );
    }

    return (
      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={handleGoogleError}
        useOneTap={false}
        theme="filled_black"
        text="signin_with"
        shape="rectangular"
        width="100%"
        type="standard"
      />
    );
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Sign In
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
            margin="normal"
            required
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            sx={{ mt: 3 }}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : 'Sign In'}
          </Button>
        </form>

        <Divider sx={{ my: 3 }}>
          <Typography color="textSecondary">OR</Typography>
        </Divider>

        <Box sx={{ mt: 2 }}>
          {isLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <CircularProgress />
            </Box>
          ) : (
            renderGoogleButton()
          )}
        </Box>

        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Typography variant="body2">
            Don't have an account?{' '}
            <Button
              color="primary"
              onClick={() => navigate('/signup')}
              sx={{ textTransform: 'none' }}
            >
              Sign Up
            </Button>
          </Typography>
          <Button
            color="primary"
            onClick={() => navigate('/reset-password')}
            sx={{ textTransform: 'none', mt: 1 }}
          >
            Forgot Password?
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login; 