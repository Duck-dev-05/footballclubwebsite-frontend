// src/Component/AboutUs.js
import React from 'react';
import { Link } from 'react-router-dom';
import { teamPhoto } from '../images';
import '../CSS/AboutUs.css'; // Import the CSS file

function AboutUs() {
  const stats = [
    { number: "2021", label: "Founded" },
    { number: "20+", label: "Players" },
    { number: "10+", label: "Matches" },
    { number: "5+", label: "Trophies" }
  ];

  const values = [
    {
      title: "Excellence",
      description: "Striving for the highest standards in everything we do",
      icon: "🏆"
    },
    {
      title: "Teamwork",
      description: "Working together to achieve our common goals",
      icon: "🤝"
    },
    {
      title: "Development",
      description: "Continuous improvement both on and off the field",
      icon: "📈"
    },
    {
      title: "Passion",
      description: "Deep love and commitment to the beautiful game",
      icon: "⚽"
    }
  ];

  return (
    <div className="about-container">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-image" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url(${teamPhoto})` }}>
          <h1>About FC ESCUELA</h1>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="mission-content">
          <h2>Our Mission</h2>
          <p>
            FC ESCUELA is more than just a football club. We are a community dedicated 
            to nurturing talent and promoting the love of the game. Founded in 2021, 
            we've become a hub for passionate football enthusiasts.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item">
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Team Photo Section */}
      <section className="team-section">
        <div className="team-photo-container">
          <img src={teamPhoto} alt="FC ESCUELA Team" className="team-photo" />
          <div className="photo-caption">
            FC ESCUELA Team 2024
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <h2>Our Core Values</h2>
        <div className="values-grid">
          {values.map((value, index) => (
            <div key={index} className="value-card">
              <div className="value-icon">{value.icon}</div>
              <h3>{value.title}</h3>
              <p>{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Join Section */}
      <section className="join-section">
        <div className="join-content">
          <h2>Join Our Team</h2>
          <p>Be part of something special. Join FC ESCUELA today!</p>
          <Link to="/contact" className="join-button">Contact Us</Link>
        </div>
      </section>
    </div>
  );
}

export default AboutUs;
