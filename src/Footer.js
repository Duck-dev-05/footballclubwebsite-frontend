import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaMapMarkerAlt, FaPhone, FaEnvelope, FaPaperPlane } from 'react-icons/fa';
import '../CSS/Footer.css';

const Footer = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setStatus('error');
            return;
        }

        setLoading(true);
        try {
            // Simulate API call - replace with your actual API endpoint
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            setStatus('success');
            setEmail('');
        } catch (error) {
            setStatus('error');
        } finally {
            setLoading(false);
            // Reset status after 3 seconds
            setTimeout(() => setStatus(''), 3000);
        }
    };

    return (
        <footer className="footer">
            <div className="footer-content">
                {/* Club Info */}
                <div className="footer-section">
                    <h3 className="footer-title">FC ESCUELA</h3>
                    <p className="footer-description">
                        Experience excellence in football. Join our community and be part of something special.
                    </p>
                    <div className="contact-info">
                        <p><FaMapMarkerAlt />Khu Tập Thể Cơ Khí & Xây Lắp Số 7,Liên Ninh,Thanh Trì,Hà Nội</p>
                        <p><FaPhone /> +84 0865817605</p>
                        <p><FaEnvelope /> minhducworking05@gmail.com</p>
                    </div>
                </div>

                {/* Quick Links */}
                <div className="footer-section">
                    <h3 className="footer-title">Quick Links</h3>
                    <ul className="footer-links">
                        <li><Link to="/about">About Us</Link></li>
                        <li><Link to="/teams">Teams</Link></li>
                        <li><Link to="/fixtures">Fixtures</Link></li>
                        <li><Link to="/news">News</Link></li>
                        <li><Link to="/tickets">Tickets</Link></li>
                    </ul>
                </div>

                {/* Club Resources */}
                <div className="footer-section">
                    <h3 className="footer-title">Club Resources</h3>
                    <ul className="footer-links">
                        <li><Link to="/membership">Membership</Link></li>
                        <li><Link to="/academy">Academy</Link></li>
                        <li><Link to="/community">Community</Link></li>
                        <li><Link to="/gallery">Gallery</Link></li>
                        <li><Link to="/contact">Contact Us</Link></li>
                    </ul>
                </div>

                {/* Newsletter - Updated Section */}
                <div className="footer-section">
                    <h3 className="footer-title">Newsletter</h3>
                    <p className="newsletter-text">
                        Subscribe to our newsletter for the latest updates and exclusive content.
                    </p>
                    <form className="newsletter-form" onSubmit={handleSubmit}>
                        <div className="newsletter-input-group">
                            <input 
                                type="email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className={`newsletter-input ${status}`}
                                disabled={loading}
                            />
                            <button 
                                type="submit" 
                                className={`newsletter-button ${loading ? 'loading' : ''}`}
                                disabled={loading}
                            >
                                {loading ? (
                                    <span className="loading-spinner"></span>
                                ) : (
                                    <>
                                        Subscribe <FaPaperPlane />
                                    </>
                                )}
                            </button>
                        </div>
                        {status === 'success' && (
                            <p className="newsletter-message success">
                                Thank you for subscribing!
                            </p>
                        )}
                        {status === 'error' && (
                            <p className="newsletter-message error">
                                Please enter a valid email address.
                            </p>
                        )}
                    </form>
                </div>
            </div>

            {/* Social Media & Copyright */}
            <div className="footer-bottom">
                <div className="social-links">
                    <a href="https://www.facebook.com/profile.php?id=100083085867194" target="_blank" rel="noopener noreferrer">
                        <FaFacebook />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                        <FaTwitter />
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                        <FaInstagram />
                    </a>
                    <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                        <FaYoutube />
                    </a>
                </div>
                <div className="copyright">
                    <p>&copy; {new Date().getFullYear()} FC ESCUELA. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
  