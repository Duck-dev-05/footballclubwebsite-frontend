import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import FacebookLogin from '@greatsumini/react-facebook-login';
import { Box, Alert, Divider, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../../config/axios';
import './SocialAuth.css';

const SocialAuth = ({ onSuccess }) => {
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleGoogleSuccess = async (credentialResponse) => {
        try {
            const response = await api.post('/auth/social/google', {
                credential: credentialResponse.credential
            });
            
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                onSuccess?.(response.data);
                navigate('/dashboard');
            }
        } catch (err) {
            console.error('Google auth error:', err);
            setError(err.response?.data?.message || 'Google sign in failed. Please try again.');
        }
    };

    const handleFacebookSuccess = async (response) => {
        try {
            const apiResponse = await api.post('/auth/social/facebook', {
                accessToken: response.accessToken
            });
            
            if (apiResponse.data.token) {
                localStorage.setItem('token', apiResponse.data.token);
                localStorage.setItem('user', JSON.stringify(apiResponse.data.user));
                onSuccess?.(apiResponse.data);
                navigate('/dashboard');
            }
        } catch (err) {
            console.error('Facebook auth error:', err);
            setError(err.response?.data?.message || 'Facebook sign in failed. Please try again.');
        }
    };

    return (
        <Box className="social-auth-container">
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            
            <Box className="social-buttons">
                <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={() => setError('Google sign in failed')}
                    className="google-button"
                />

                <Divider sx={{ my: 2 }}>
                    <Typography color="textSecondary">OR</Typography>
                </Divider>

                <FacebookLogin
                    appId={process.env.REACT_APP_FACEBOOK_APP_ID}
                    onSuccess={handleFacebookSuccess}
                    onFail={(error) => {
                        setError('Facebook sign in failed');
                        console.error('Facebook auth error:', error);
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
                    Sign in with Facebook
                </FacebookLogin>
            </Box>
        </Box>
    );
};

export default SocialAuth; 