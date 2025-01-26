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

  const socialLinks = [
    {
      platform: 'facebook',
      url: 'https://www.facebook.com/profile.php?id=100083085867194',
      label: 'Follow us on Facebook'
    },
    {
      platform: 'twitter',
      url: 'https://twitter.com/FCEscuela',  // Replace with actual Twitter URL when available
      label: 'Follow us on Twitter'
    },
    {
      platform: 'instagram',
      url: 'https://instagram.com/fcescuela',  // Replace with actual Instagram URL when available
      label: 'Follow us on Instagram'
    },
    {
      platform: 'youtube',
      url: 'https://youtube.com/@fcescuela',  // Replace with actual YouTube URL when available
      label: 'Subscribe to our YouTube channel'
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

        {/* Updated Social Media Section */}
        <div className="social-section">
          <h2>Follow Us</h2>
          <div className="social-links">
            {socialLinks.map((social, index) => (
              <a 
                key={index}
                href={social.url}
                className="social-link"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
              >
                <FontAwesomeIcon icon={['fab', social.platform]} />
                <span className="social-platform-name">{social.platform}</span>
              </a>
            ))}
          </div>

          {/* Add a call-to-action section */}
          <div className="social-cta">
            <p>Stay connected with FC ESCUELA on social media for the latest updates, 
               match highlights, and exclusive content!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact; 