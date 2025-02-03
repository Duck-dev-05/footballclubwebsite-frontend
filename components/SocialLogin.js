import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import FacebookLogin from '@greatsumini/react-facebook-login';
import { useNavigate } from 'react-router-dom';
import api from '../config/axios';

const SocialLogin = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
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
    <div className="social-login">
      {error && <div className="error-message">{error}</div>}
      
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
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
          width={250}
        />
      </GoogleOAuthProvider>

      <FacebookLogin
        appId={process.env.REACT_APP_FACEBOOK_APP_ID}
        onSuccess={handleFacebookSuccess}
        onFail={(error) => setError('Facebook login failed')}
        className="facebook-login-button"
        style={{
          backgroundColor: '#4267b2',
          color: '#fff',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginTop: '10px'
        }}
      >
        Sign in with Facebook
      </FacebookLogin>
    </div>
  );
};

export default SocialLogin; 