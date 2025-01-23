import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { teamPhoto } from '../images';

const NextEvents = () => {
  const events = [
    {
      type: 'Training',
      category: 'Football · First Team · Male',
      title: 'Training',
      date: 'Friday, Jan 24, 11:00 AM h',
      location: 'Dong My Stadium',
      details: 'Open only to press (15 minutes).',
      pressInfo: 'Press conference: yes (live on FC ESCUELA TV).',
      image: teamPhoto
    },
    {
      type: 'League Match',
      category: 'Football · First Team · Male',
      title: 'Matchday 21',
      homeTeam: {
        name: 'FC ESCUELA',
        logo: teamPhoto
      },
      awayTeam: {
        name: 'City FC',
        logo: teamPhoto
      },
      date: 'Saturday, Jan 25, 9:00 PM h',
      location: 'Dong My Stadium',
      image: teamPhoto
    },
    {
      type: 'Cup Match',
      category: 'Football · First Team · Male',
      title: 'Matchday 8',
      homeTeam: {
        name: 'United FC',
        logo: teamPhoto
      },
      awayTeam: {
        name: 'FC ESCUELA',
        logo: teamPhoto
      },
      date: 'Wednesday, Jan 29, 9:00 PM h',
      location: 'Dong My Stadium',
      image: teamPhoto
    },
    {
      type: 'League Match',
      category: 'Football · First Team · Male',
      title: 'Matchday 22',
      homeTeam: {
        name: 'FC ESCUELA',
        logo: teamPhoto
      },
      awayTeam: {
        name: 'Athletic FC',
        logo: teamPhoto
      },
      date: 'Saturday, Feb 1, 9:00 PM h',
      location: 'Dong My Stadium',
      image: teamPhoto
    }
  ];

  return (
    <section className="next-events-section">
      <div className="next-events-header">
        <h2 className="next-events-title">Next Events</h2>
        <div className="events-filters">
          <button className="filter-btn">
            <FontAwesomeIcon icon="users" /> Teams (1)
          </button>
          <button className="filter-btn">
            <FontAwesomeIcon icon="calendar" /> subscribe
          </button>
        </div>
      </div>

      <div className="events-grid">
        {events.map((event, index) => (
          <div key={index} className="event-card">
            <div className="event-header">
              <img src={event.image} alt={event.title} />
            </div>
            <div className="event-content">
              <div className="event-type">
                {event.category}
              </div>
              <h3 className="event-title">{event.type}</h3>
              {event.homeTeam ? (
                <div className="event-teams">
                  <img src={event.homeTeam.logo} alt={event.homeTeam.name} className="team-logo" />
                  <span className="vs-badge">VS</span>
                  <img src={event.awayTeam.logo} alt={event.awayTeam.name} className="team-logo" />
                </div>
              ) : null}
              <div className="event-details">
                <span className="event-detail">
                  <FontAwesomeIcon icon="calendar" /> {event.date}
                </span>
                <span className="event-detail">
                  <FontAwesomeIcon icon="map-marker-alt" /> {event.location}
                </span>
                {event.details && (
                  <span className="event-detail">
                    <FontAwesomeIcon icon="info-circle" /> {event.details}
                  </span>
                )}
                {event.pressInfo && (
                  <span className="event-detail">
                    <FontAwesomeIcon icon="tv" /> {event.pressInfo}
                  </span>
                )}
              </div>
              <button className="more-btn">
                More <FontAwesomeIcon icon="chevron-right" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NextEvents; 