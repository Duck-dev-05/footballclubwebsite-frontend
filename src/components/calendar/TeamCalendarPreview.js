import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faArrowRight, faClock, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import '../../CSS/TeamCalendarPreview.css';

const TeamCalendarPreview = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUpcomingEvents();
  }, []);

  const fetchUpcomingEvents = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5046/api/events/upcoming', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) throw new Error('Failed to fetch events');
      const data = await response.json();
      setEvents(data.slice(0, 3)); // Get only first 3 events
    } catch (err) {
      setError('Failed to load upcoming events');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="calendar-loading">Loading team calendar...</div>;
  if (error) return <div className="calendar-error">{error}</div>;

  return (
    <section className="team-calendar-preview">
      <div className="calendar-preview-header">
        <h2>
          <FontAwesomeIcon icon={faCalendar} />
          Team Calendar
        </h2>
        <Link to="/team-calendar" className="view-calendar-link">
          View Full Calendar <FontAwesomeIcon icon={faArrowRight} />
        </Link>
      </div>

      <div className="upcoming-events">
        {events.map((event) => (
          <div key={event.id} className="event-card">
            <div className="event-date">
              <span className="date-day">
                {new Date(event.start).getDate()}
              </span>
              <span className="date-month">
                {new Date(event.start).toLocaleString('default', { month: 'short' })}
              </span>
            </div>
            <div className="event-details">
              <h3>{event.title}</h3>
              <div className="event-info">
                <p className="event-time">
                  <FontAwesomeIcon icon={faClock} />
                  {new Date(event.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  {' - '}
                  {new Date(event.end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
                {event.location && (
                  <p className="event-location">
                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                    {event.location}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="calendar-cta">
        <Link to="/team-calendar" className="schedule-button">
          View Team Schedule <FontAwesomeIcon icon={faArrowRight} />
        </Link>
      </div>
    </section>
  );
};

export default TeamCalendarPreview; 