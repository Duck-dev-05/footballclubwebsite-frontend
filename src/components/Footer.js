import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Footer.css'; // Create this CSS file for styling

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/gallery">Gallery</Link></li>
            <li><Link to="/membership">Membership</Link></li>
            <li><Link to="/buy-tickets">Buy Tickets</Link></li>
            <li><Link to="/news">News</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>
        <div className="footer-contact">
          <h3>Contact Us</h3>
          <p>Email: <a href="mailto:info@fcescuela.com">info@fcescuela.com</a></p>
          <p>Phone: <a href="tel:+1234567890">+1 234 567 890</a></p>
          <p>Address: 123 Football Lane, City, Country</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} FC ESCUELA. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer; 