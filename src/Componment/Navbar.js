// src/Component/Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Navbar.css'; // Import the corresponding CSS file for styling

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle navbar background on scroll
  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          FC ESCUELA
        </Link>
        
        <ul className="navbar-links">
          <li><Link to="/" className="navbar-link">Home</Link></li>
          <li><Link to="/about" className="navbar-link">About Us</Link></li>
          <li><Link to="/fixtures" className="navbar-link">Fixtures</Link></li>
          <li><Link to="/news" className="navbar-link">News</Link></li>
          <li><Link to="/contact" className="navbar-link">Contact</Link></li>
          <li><Link to="/gallery" className="navbar-link">Gallery</Link></li>
        </ul>

        <div className="navbar-auth">
          <Link to="/signin" className="signin-button">Sign In</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
