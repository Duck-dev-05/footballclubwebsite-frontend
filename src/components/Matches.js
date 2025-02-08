import React, { useState, useEffect } from 'react';
import matchService from '../services/matchService';

const Matches = () => {
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                const data = await matchService.getAllMatches();
                setMatches(data);
                setLoading(false);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to fetch matches');
                setLoading(false);
            }
        };

        fetchMatches();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h2>Upcoming Matches</h2>
            {matches.map(match => (
                <div key={match.id}>
                    <h3>{match.homeTeam} vs {match.awayTeam}</h3>
                    <p>Date: {new Date(match.matchDate).toLocaleDateString()}</p>
                    <p>Venue: {match.venue}</p>
                    <p>Available Tickets: {match.availableTickets}</p>
                </div>
            ))}
        </div>
    );
};

export default Matches; 