import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import FacebookLogin from '@greatsumini/react-facebook-login';
import { Box, Alert, Divider, Typography, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../../config/axios';
import './SocialAuth.css';

const SocialAuth = () => {
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleGoogleSuccess = async (credentialResponse) => {
        try {
            setIsLoading(true);
            setError('');

            if (!credentialResponse.credential) {
                throw new Error('No credential received from Google');
            }

            const response = await api.post('/auth/google', {
                credential: credentialResponse.credential
            });

            if (response.data?.data?.token) {
                localStorage.setItem('token', response.data.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.data.user));
                navigate('/');
            } else {
                throw new Error('Invalid response from server');
            }
        } catch (error) {
            console.error('Google login error:', error);
            setError(error.response?.data?.message || 'Failed to authenticate with Google');
        } finally {
            setIsLoading(false);
        }
    };

    const handleFacebookSuccess = async (response) => {
        try {
            setIsLoading(true);
            setError('');
            
            console.log('Facebook response:', response);
            
            const apiResponse = await api.post('/auth/facebook', {
                accessToken: response.accessToken
            });
            
            if (apiResponse.data.data?.token) {
                localStorage.setItem('token', apiResponse.data.data.token);
                localStorage.setItem('user', JSON.stringify(apiResponse.data.data.user));
                navigate('/');
            }
        } catch (error) {
            console.error('Facebook login error:', error);
            setError(error.response?.data?.message || 'Failed to authenticate with Facebook');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Box sx={{ mt: 2 }}>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            
            <Divider sx={{ my: 2 }}>
                <Typography color="textSecondary">OR</Typography>
            </Divider>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {isLoading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <CircularProgress size={24} />
                    </Box>
                ) : (
                    <>
                        <GoogleLogin
                            onSuccess={handleGoogleSuccess}
                            onError={(error) => {
                                console.error('Google Login Failed:', error);
                                setError('Failed to authenticate with Google');
                            }}
                            useOneTap={false}
                            theme="filled_blue"
                            size="large"
                            width="100%"
                            text="signin_with"
                            shape="rectangular"
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
                            <div className="facebook-button-content">
                                <img src="/facebook-icon.png" alt="Facebook" />
                                <span>Continue with Facebook</span>
                            </div>
                        </FacebookLogin>
                    </>
                )}
            </Box>
        </Box>
    );
};

export default SocialAuth; 