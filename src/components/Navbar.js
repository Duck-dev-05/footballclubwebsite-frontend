import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import '../CSS/Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const userRole = localStorage.getItem('userRole');
  const isTeamMember = userRole === 'player' || userRole === 'admin';

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Football Club
        </Link>
        <ul className="navbar-links">
          <li><Link to="/" className="navbar-link">Home</Link></li>
          <li><Link to="/about" className="navbar-link">About</Link></li>
          <li><Link to="/fixtures" className="navbar-link">Fixtures</Link></li>
          <li><Link to="/news" className="navbar-link">News</Link></li>
          <li><Link to="/gallery" className="navbar-link">Gallery</Link></li>
          {isTeamMember && (
            <li>
              <Link to="/team-calendar" className="navbar-link team-calendar-link">
                <FontAwesomeIcon icon={faCalendar} />
                Team Calendar
              </Link>
            </li>
          )}
          {!localStorage.getItem('token') ? (
            <li>
              <Link to="/signin" className="signin-button">Sign In</Link>
            </li>
          ) : (
            <li>
              <button 
                onClick={() => {
                  localStorage.clear();
                  window.location.reload();
                }}
                className="signin-button"
              >
                Sign Out
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar; 