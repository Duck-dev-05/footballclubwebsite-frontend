import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const MatchCard = ({ match, isSelected, onSelect }) => (
  <div 
    className={`match-ticket-card ${isSelected ? 'selected' : ''}`}
    onClick={() => onSelect(match)}
  >
    <div className="match-header">
      <span className="competition">{match.competition}</span>
      <div className="teams">
        <span className="team">{match.homeTeam}</span>
        <span className="vs">VS</span>
        <span className="team">{match.awayTeam}</span>
      </div>
    </div>
    <div className="match-info">
      <span>
        <FontAwesomeIcon icon="calendar" /> {match.date}
      </span>
      <span>
        <FontAwesomeIcon icon="clock" /> {match.time}
      </span>
      <span>
        <FontAwesomeIcon icon="map-marker-alt" /> {match.venue}
      </span>
    </div>
    <div className="price-info">
      <span>From ${match.prices.standard}</span>
    </div>
  </div>
);

export default MatchCard; 