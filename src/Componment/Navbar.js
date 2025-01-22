// src/Component/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Navbar.css'; // Import the corresponding CSS file for styling

function Navbar() {
  return (
    <nav className="navbar">
      <ul className="navbar-links">
        <li>
          <Link to="/" className="navbar-link">Home</Link>
        </li>
        <li>
          <Link to="/about" className="navbar-link">About Us</Link>
        </li>
        <li>
          <Link to="/fixtures" className="navbar-link">Fixtures</Link>
        </li>
        <li>
          <Link to="/news" className="navbar-link">News</Link>
        </li>
        <li>
          <Link to="/contact" className="navbar-link">Contact Us</Link>
        </li>
        <li>
          <Link to="/signin" className="navbar-link">Sign In</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
