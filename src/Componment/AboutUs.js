// src/Component/AboutUs.js
import React from 'react';
import '../CSS/AboutUs.css'; // Import the CSS file

function AboutUs() {
  return (
    <div className="about-container">
      <h1 className="about-title">About Us</h1>
      <p className="about-description">
        Welcome to FC ESCUELA, a football club dedicated to nurturing talent and promoting the love of the game. 
        Our mission is to provide a platform where players of all levels can improve their skills, compete, and grow as individuals.
      </p>
      <p className="about-description">
        Established in 2021, FC ESCUELA has become a hub for passionate football enthusiasts, fostering a sense of community 
        and sportsmanship. Our programs cater to players of all ages, from beginners to seasoned professionals.
      </p>
      <div className="about-values">
        <h2>Our Core Values</h2>
        <ul>
          <li>Teamwork</li>
          <li>Dedication</li>
          <li>Integrity</li>
          <li>Excellence</li>
        </ul>
      </div>
    </div>
  );
}

export default AboutUs;
