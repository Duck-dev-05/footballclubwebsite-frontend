import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { teamPhoto } from '../images';
import '../CSS/Contact.css';

const Contact = () => {
  const contactSections = [
    {
      title: "Club Information",
      contacts: [
        {
          title: "General Enquiries",
          phone: "+84 123 456 789",
          email: "enquiries@fcescuela.com"
        },
        {
          title: "Media Relations",
          email: "media@fcescuela.com"
        }
      ]
    },
    {
      title: "Ticketing & Match Day",
      contacts: [
        {
          title: "Match Tickets",
          phone: "+84 123 456 790",
          email: "tickets@fcescuela.com"
        },
        {
          title: "Match Day Support",
          phone: "+84 123 456 791",
          email: "matchday@fcescuela.com"
        }
      ]
    },
    {
      title: "Youth Academy",
      contacts: [
        {
          title: "Academy Enquiries",
          phone: "+84 123 456 792",
          email: "academy@fcescuela.com"
        },
        {
          title: "Youth Development",
          email: "development@fcescuela.com"
        }
      ]
    },
    {
      title: "Support Services",
      contacts: [
        {
          title: "Fan Support",
          phone: "+84 123 456 793",
          email: "support@fcescuela.com"
        },
        {
          title: "Club Store",
          email: "store@fcescuela.com"
        }
      ]
    }
  ];

  return (
    <div className="contact-container">
      {/* Hero Section */}
      <div className="contact-hero" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8)), url(${teamPhoto})` }}>
        <h1>Contact Us</h1>
        <p>Get in touch with FC ESCUELA</p>
      </div>

      {/* Main Content */}
      <div className="contact-content">
        <div className="contact-intro">
          <p>
            Can't find what you're looking for? Please use the contact information below 
            to direct your query to our friendly staff.
          </p>
        </div>

        <div className="contact-sections">
          {contactSections.map((section, index) => (
            <div key={index} className="contact-section">
              <h2>{section.title}</h2>
              <div className="contact-items">
                {section.contacts.map((contact, contactIndex) => (
                  <div key={contactIndex} className="contact-item">
                    <h3>{contact.title}</h3>
                    {contact.phone && (
                      <div className="contact-detail">
                        <FontAwesomeIcon icon="phone" />
                        <span>{contact.phone}</span>
                      </div>
                    )}
                    <div className="contact-detail">
                      <FontAwesomeIcon icon="envelope" />
                      <span>{contact.email}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Social Media Section */}
        <div className="social-section">
          <h2>Follow Us</h2>
          <div className="social-links">
            <a href="#" className="social-link">
              <FontAwesomeIcon icon={['fab', 'facebook']} />
            </a>
            <a href="#" className="social-link">
              <FontAwesomeIcon icon={['fab', 'twitter']} />
            </a>
            <a href="#" className="social-link">
              <FontAwesomeIcon icon={['fab', 'instagram']} />
            </a>
            <a href="#" className="social-link">
              <FontAwesomeIcon icon={['fab', 'youtube']} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact; 