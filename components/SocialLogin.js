import React from 'react';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SocialLogin = () => {
  const navigate = useNavigate();

  const handleGoogleSuccess = async (response) => {
    try {
      const { data } = await axios.post('/api/auth/google/login', {
        tokenId: response.tokenId,
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
      const { data } = await axios.post('/api/auth/facebook/login', {
        accessToken: response.accessToken,
        userID: response.userID,
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
        buttonText="Sign in with Google"
        onSuccess={handleGoogleSuccess}
        onFailure={(err) => console.error('Google Login Failed:', err)}
        cookiePolicy={'single_host_origin'}
        className="google-btn"
      />

      <FacebookLogin
        appId={process.env.REACT_APP_FACEBOOK_APP_ID}
        autoLoad={false}
        fields="name,email,picture"
        callback={handleFacebookSuccess}
        cssClass="facebook-btn"
        icon="fa-facebook"
      />
    </div>
  );
};

export default SocialLogin; 