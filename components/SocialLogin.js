import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import FacebookLogin from '@greatsumini/react-facebook-login';
import { useNavigate } from 'react-router-dom';
import api from '../config/axios';  // Import api config

const SocialLogin = () => {
  const navigate = useNavigate();

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const { data } = await api.post('/auth/google', {
        credential: credentialResponse.credential
      });
      
      // Store token in localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      // Redirect to dashboard or home
      navigate('/dashboard');
    } catch (error) {
      console.error('Google login error:', error);
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
    }
  };

  return (
    <div className="social-login">
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        onSuccess={handleGoogleSuccess}
        onError={() => console.log('Login Failed')}
        useOneTap
        auto_select
      />

      <FacebookLogin
        appId={process.env.REACT_APP_FACEBOOK_APP_ID}
        onSuccess={handleFacebookSuccess}
        onFail={(error) => console.log('Login Failed!', error)}
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