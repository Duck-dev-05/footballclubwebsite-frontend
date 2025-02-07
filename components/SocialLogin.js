import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import FacebookLogin from '@greatsumini/react-facebook-login';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Divider, Alert } from '@mui/material';
import api from '../config/axios';
import './SocialLogin.css';

const SocialLogin = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      setError('');
      console.log('Google credential received:', credentialResponse);

      const response = await api.post('/auth/google', {
        credential: credentialResponse.credential
      });

      console.log('Backend authentication successful:', response.data);

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      navigate('/dashboard');
    } catch (error) {
      console.error('Google authentication failed:', error);
      setError(error.response?.data?.message || 'Failed to authenticate with Google');
    }
  };

  const handleFacebookSuccess = async (response) => {
    try {
      setError('');
      console.log('Facebook response:', response);

      const { data } = await api.post('/auth/facebook', {
        accessToken: response.accessToken
      });
      
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/dashboard');
    } catch (error) {
      console.error('Facebook login error:', error);
      setError(error.response?.data?.message || 'Failed to login with Facebook');
    }
  };

  return (
    <Box className="social-login-container">
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Divider sx={{ my: 2 }}>
        <Typography variant="body2" color="text.secondary">
          OR CONTINUE WITH
        </Typography>
      </Divider>

      <Box className="social-buttons">
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => {
            console.error('Google login failed');
            setError('Failed to authenticate with Google');
          }}
          useOneTap={false}
          theme="filled_black"
          text="signin_with"
          shape="rectangular"
          width="100%"
        />

        <FacebookLogin
          appId={process.env.REACT_APP_FACEBOOK_APP_ID}
          onSuccess={handleFacebookSuccess}
          onFail={(error) => {
            console.error('Facebook login failed:', error);
            setError('Failed to authenticate with Facebook');
          }}
          className="facebook-login-button"
          initParams={{
            version: 'v18.0',
            scope: 'email,public_profile'
          }}
        >
          <Box className="facebook-button-content">
            <img src="/facebook-icon.svg" alt="Facebook" />
            <span>Continue with Facebook</span>
          </Box>
        </FacebookLogin>
      </Box>
    </Box>
  );
};

export default SocialLogin; 