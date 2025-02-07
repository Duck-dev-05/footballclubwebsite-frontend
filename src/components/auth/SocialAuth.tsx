import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { Box, Alert, Divider, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../../config/axios';
import './SocialAuth.css';

interface SocialAuthProps {
  onSuccess?: (data: any) => void;
}

const SocialAuth: React.FC<SocialAuthProps> = ({ onSuccess }) => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      const response = await api.post('/auth/google', {
        credential: credentialResponse.credential
      });
      
      if (response.data.success) {
        localStorage.setItem('token', response.data.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
        onSuccess?.(response.data);
        navigate('/dashboard');
      }
    } catch (err: any) {
      console.error('Google auth error:', err);
      setError(err.response?.data?.message || 'Google sign in failed. Please try again.');
    }
  };

  return (
    <Box className="social-auth-container">
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      
      <Divider sx={{ my: 2 }}>
        <Typography color="textSecondary">OR</Typography>
      </Divider>

      <Box className="social-buttons">
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => setError('Google sign in failed')}
          useOneTap={false}
          theme="filled_black"
          text="signin_with"
          shape="rectangular"
          width="100%"
        />
      </Box>
    </Box>
  );
};

export default SocialAuth; 