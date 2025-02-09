import React, { useState, useEffect, useCallback } from 'react';
import { GoogleLogin, GoogleCredentialResponse, useGoogleOneTapLogin } from '@react-oauth/google';
import { Box, Alert, Divider, Typography, CircularProgress, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { googleAuthService } from '../../services/googleAuthService';
import './SocialAuth.css';

interface SocialAuthProps {
  onSuccess?: (data: any) => void;
}

const SocialAuth: React.FC<SocialAuthProps> = ({ onSuccess }) => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [showRetryButton, setShowRetryButton] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const initTimer = setTimeout(() => {
      setIsInitializing(false);
    }, 3000); // Give Google Sign-In 3 seconds to initialize

    return () => clearTimeout(initTimer);
  }, []);

  const initializeGoogleSignIn = useCallback(() => {
    setError('');
    setShowRetryButton(false);
    setRetryCount(prev => prev + 1);
    setIsInitializing(true);
    
    // Reset initialization state after a delay
    setTimeout(() => {
      setIsInitializing(false);
    }, 3000);
  }, []);

  const handleGoogleSuccess = async (credentialResponse: GoogleCredentialResponse) => {
    setLoading(true);
    setError('');
    try {
      if (!credentialResponse?.credential) {
        throw new Error('No credential received from Google');
      }

      const authData = await googleAuthService.handleGoogleLogin(credentialResponse);
      localStorage.setItem('token', authData.token);
      localStorage.setItem('user', JSON.stringify(authData.user));
      onSuccess?.(authData);
      navigate('/dashboard');
    } catch (err: any) {
      console.error('Google auth error:', err);
      setError(err.message || 'Google sign in failed. Please try again.');
      setShowRetryButton(true);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleError = (error: any) => {
    console.error('Google Login Failed:', error);
    setIsInitializing(false);
    setError('Failed to initialize Google Sign-In');
    if (retryCount >= 3) {
      setShowRetryButton(true);
    }
  };

  const handleRetry = () => {
    setRetryCount(0);
    setShowRetryButton(false);
    setError('');
    setLoading(false);
    initializeGoogleSignIn();
  };

  return (
    <Box className="social-auth-container">
      {error && (
        <Alert 
          severity="error" 
          sx={{ mb: 2 }}
          action={
            showRetryButton && (
              <Button 
                color="inherit" 
                size="small" 
                onClick={handleRetry}
              >
                Retry
              </Button>
            )
          }
        >
          {error}
        </Alert>
      )}
      
      <Divider sx={{ my: 2 }}>
        <Typography color="textSecondary">OR</Typography>
      </Divider>

      <Box className="social-buttons">
        {loading || isInitializing ? (
          <CircularProgress size={24} />
        ) : showRetryButton ? (
          <Button 
            variant="outlined" 
            onClick={handleRetry}
            fullWidth
            sx={{ mt: 1 }}
          >
            Retry Google Sign-In
          </Button>
        ) : (
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            useOneTap={false}
            theme="filled_black"
            text="signin_with"
            shape="rectangular"
            width="100%"
            auto_select={false}
            context="signin"
            ux_mode="popup"
            cancel_on_tap_outside={false}
            itp_support={true}
          />
        )}
      </Box>
    </Box>
  );
};

export default SocialAuth; 