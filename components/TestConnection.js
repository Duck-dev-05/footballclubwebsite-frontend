import React, { useState, useEffect } from 'react';
import api from '../config/axios';

const TestConnection = () => {
  const [status, setStatus] = useState('Testing connection...');

  useEffect(() => {
    const testConnection = async () => {
      try {
        const response = await api.get('/health/database');
        if (response.data.status === 'healthy') {
          setStatus('Connected to backend successfully!');
        } else {
          setStatus('Backend connection status: ' + response.data.status);
        }
      } catch (error) {
        setStatus('Failed to connect to backend: ' + error.message);
      }
    };

    testConnection();
  }, []);

  return (
    <div>
      <h2>Backend Connection Status</h2>
      <p>{status}</p>
    </div>
  );
};

export default TestConnection; 