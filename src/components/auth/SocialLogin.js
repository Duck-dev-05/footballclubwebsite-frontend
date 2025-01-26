import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import FacebookLogin from '@greatsumini/react-facebook-login';
import './SocialLogin.css';

const SocialLogin = ({ onSocialLogin }) => {
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const response = await fetch('http://localhost:5046/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          credential: credentialResponse.credential,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        onSocialLogin(data);
      } else {
        throw new Error(data.message || 'Failed to authenticate with Google');
      }
    } catch (error) {
      console.error('Google authentication error:', error);
    }
  };

  const handleFacebookSuccess = async (response) => {
    try {
      const apiResponse = await fetch('http://localhost:5046/api/auth/facebook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          accessToken: response.accessToken,
        }),
      });

      const data = await apiResponse.json();
      if (apiResponse.ok) {
        onSocialLogin(data);
      } else {
        throw new Error(data.message || 'Failed to authenticate with Facebook');
      }
    } catch (error) {
      console.error('Facebook authentication error:', error);
    }
  };

  return (
    <div className="social-login">
      <div className="social-login-divider">
        <span>or continue with</span>
      </div>
      <div className="social-buttons">
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => console.log('Google Login Failed')}
          useOneTap
          shape="pill"
          theme="filled_blue"
        />
        <FacebookLogin
          appId={process.env.REACT_APP_FACEBOOK_APP_ID}
          onSuccess={handleFacebookSuccess}
          onFail={(error) => {
            console.log('Facebook Login Failed:', error);
          }}
          className="facebook-login-button"
          initParams={{
            version: 'v17.0',
          }}
        />
      </div>
    </div>
  );
};

export default SocialLogin; 