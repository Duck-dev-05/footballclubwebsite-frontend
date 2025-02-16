import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import FacebookLogin from '@greatsumini/react-facebook-login';
import { Box, Alert, Divider, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../../config/axios';
import './SocialAuth.css';

const SocialAuth = () => {
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleGoogleSuccess = async (credentialResponse) => {
        try {
            const response = await api.post('/auth/google', {
                credential: credentialResponse.credential
            });
            
            if (response.data.data?.token) {
                localStorage.setItem('token', response.data.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.data.user));
                navigate('/');
            }
        } catch (error) {
            console.error('Error during Google login:', error);
            setError(error.response?.data?.message || 'Google login failed');
        }
    };

    const handleFacebookSuccess = async (response) => {
        try {
            const res = await api.post('/auth/facebook', {
                accessToken: response.accessToken
            });
            
            if (res.data.data?.token) {
                localStorage.setItem('token', res.data.data.token);
                localStorage.setItem('user', JSON.stringify(res.data.data.user));
                navigate('/');
            }
        } catch (error) {
            console.error('Error during Facebook login:', error);
            setError(error.response?.data?.message || 'Facebook login failed');
        }
    };

    return (
        <Box sx={{ mt: 2 }}>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            
            <Divider sx={{ my: 2 }}>
                <Typography color="textSecondary">OR</Typography>
            </Divider>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={() => setError('Google login failed')}
                    size="large"
                    width="100%"
                />

                <FacebookLogin
                    appId={process.env.REACT_APP_FACEBOOK_APP_ID}
                    onSuccess={handleFacebookSuccess}
                    onFail={(error) => {
                        console.error('Facebook login failed:', error);
                        setError('Failed to authenticate with Facebook');
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