import React, { useEffect, useState } from 'react';
import authService from '../services/authService';

function Dashboard() {
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await authService.getCurrentUser();
                setUser(userData);
            } catch (error) {
                setError('Failed to load user data');
            }
        };

        fetchUser();
    }, []);

    if (error) return <div>Error: {error}</div>;
    if (!user) return <div>Loading...</div>;

    return (
        <div>
            <h1>Welcome, {user.username}!</h1>
            <button onClick={() => {
                authService.logout();
                window.location.href = '/login';
            }}>
                Logout
            </button>
        </div>
    );
}

export default Dashboard; 