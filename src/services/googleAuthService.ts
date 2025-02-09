import { GoogleCredentialResponse } from '@react-oauth/google';
import api from '../config/axios';

interface GoogleAuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    username: string;
    role: string;
  };
}

export const googleAuthService = {
  async handleGoogleLogin(credentialResponse: GoogleCredentialResponse): Promise<GoogleAuthResponse> {
    try {
      console.log('Sending credential to backend:', credentialResponse.credential); // Debug log
      
      const response = await api.post('/auth/google', {
        credential: credentialResponse.credential
      });
      
      if (!response.data.success) {
        throw new Error(response.data.message || 'Google authentication failed');
      }
      
      console.log('Backend response:', response.data); // Debug log
      
      return response.data.data;
    } catch (error: any) {
      console.error('Google authentication error:', error.response || error);
      throw new Error(error.response?.data?.message || error.message || 'Authentication failed');
    }
  }
}; 