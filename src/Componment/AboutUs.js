// src/Component/AboutUs.js
import React from 'react';
import { teamPhoto } from '../images';
import '../CSS/AboutUs.css'; // Import the CSS file

function AboutUs() {
  return (
    <div className="about-container">
      <div className="about-hero">
        <img src={teamPhoto} alt="FC ESCUELA Team" className="team-photo" />
        <div className="overlay">
          <h1 className="about-title">About Us</h1>
        </div>
      </div>

      <div className="about-content">
        <div className="about-description">
          <p>
            Welcome to FC ESCUELA, a football club dedicated to nurturing talent and promoting the love of the game. 
            Our mission is to provide a platform where players of all levels can improve their skills, compete, and grow as individuals.
          </p>
          <p>
            Established in 2021, FC ESCUELA has become a hub for passionate football enthusiasts, fostering a sense of community 
            and sportsmanship. Our programs cater to players of all ages, from beginners to seasoned professionals.
          </p>
        </div>

        <div className="about-values">
          <h2>Our Core Values</h2>
          <div className="values-grid">
            <div className="value-item">
              <h3>Teamwork</h3>
              <p>Working together to achieve excellence</p>
            </div>
            <div className="value-item">
              <h3>Dedication</h3>
              <p>Commitment to continuous improvement</p>
            </div>
            <div className="value-item">
              <h3>Integrity</h3>
              <p>Upholding the highest standards of sportsmanship</p>
            </div>
            <div className="value-item">
              <h3>Excellence</h3>
              <p>Striving for the best in everything we do</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
