import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/ClubStats.css';

const ClubStats = () => {
  const stats = [
    {
      number: '2021',
      label: 'Founded',
      suffix: ''
    },
    {
      number: '20',
      label: 'Players',
      suffix: '+'
    },
    {
      number: '10',
      label: 'Matches',
      suffix: '+'
    },
    {
      number: '5',
      label: 'Trophies',
      suffix: '+'
    }
  ];

  return (
    <section className="club-stats">
      <div className="stats-container">
        {stats.map((stat, index) => (
          <div key={index} className="stat-item">
            <div className="stat-number">
              {stat.number}
              <span className="stat-suffix">{stat.suffix}</span>
            </div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="join-section">
        <h2 className="join-title">Join FC ESCUELA Family</h2>
        <p className="join-description">
          Be part of something special. Support your local team.
        </p>
        <div className="join-links">
          <Link to="/membership" className="join-link">
            Become a Member
          </Link>
          <Link to="/contact" className="join-link">
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ClubStats; 