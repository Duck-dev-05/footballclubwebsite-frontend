import React, { useState, useEffect } from 'react';

const TestConnection = () => {
    const [status, setStatus] = useState('Testing connection...');

    useEffect(() => {
        const testConnection = async () => {
            try {
                const response = await fetch('http://localhost:5046/api/test');
                const data = await response.json();
                setStatus(data.message || 'Connection successful');
            } catch (err) {
                setStatus('Connection failed');
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