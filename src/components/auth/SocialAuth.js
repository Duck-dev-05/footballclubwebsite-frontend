import React, { useState, useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import FacebookLogin from '@greatsumini/react-facebook-login';
import { Box, Alert, Divider, Typography, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../../config/axios';

const SocialAuth = () => {
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if Google is properly initialized
        if (window.google) {
            setIsInitialized(true);
        } else {
            const checkGoogleInit = setInterval(() => {
                if (window.google) {
                    setIsInitialized(true);
                    clearInterval(checkGoogleInit);
                }
            }, 100);

            // Cleanup
            return () => clearInterval(checkGoogleInit);
        }
    }, []);

    const handleGoogleSuccess = async (credentialResponse) => {
        try {
            setError('');
            setIsLoading(true);
            
            if (!credentialResponse.credential) {
                throw new Error('No credential received from Google');
            }

            console.log('Google response:', credentialResponse);
            
            const response = await api.post('/auth/google', {
                credential: credentialResponse.credential
            });
            
            console.log('Backend response:', response.data);

            if (response.data?.data?.token) {
                localStorage.setItem('token', response.data.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.data.user));
                navigate('/');
            } else {
                throw new Error('Invalid response format from server');
            }
        } catch (error) {
            console.error('Google login error:', error);
            setError(
                error.response?.data?.message || 
                error.message || 
                'Failed to authenticate with Google'
            );
        } finally {
            setIsLoading(false);
        }
    };

    if (!isInitialized) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
                <CircularProgress size={24} />
            </Box>
        );
    }

    return (
        <Box sx={{ mt: 2 }}>
            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}
            
            <Divider sx={{ my: 2 }}>
                <Typography color="textSecondary">OR</Typography>
            </Divider>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {isLoading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
                        <CircularProgress size={24} />
                    </Box>
                ) : (
                    <GoogleLogin
                        onSuccess={handleGoogleSuccess}
                        onError={(error) => {
                            console.error('Google Login Failed:', error);
                            setError('Failed to authenticate with Google');
                        }}
                        useOneTap={false}
                        theme="filled_black"
                        text="signin_with"
                        shape="rectangular"
                        width="100%"
                        type="standard"
                    />
                )}
            </Box>
        </Box>
    );
};

export default SocialAuth; 