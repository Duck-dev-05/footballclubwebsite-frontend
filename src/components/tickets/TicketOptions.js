import React from 'react';

const TicketOptions = ({ match, selectedType, onSelect }) => (
  <div className="ticket-options">
    {Object.entries(match.prices).map(([type, price]) => (
      <div 
        key={type}
        className={`ticket-type ${selectedType === type ? 'selected' : ''}`}
        onClick={() => onSelect(type, price)}
      >
        <h3>{type.charAt(0).toUpperCase() + type.slice(1)} Ticket</h3>
        <p>{type === 'standard' ? 'General admission seating' : 
           type === 'premium' ? 'Better viewing positions' : 
           'Best seats with additional benefits'}</p>
        <span className="price">${price}</span>
        <span className="availability">
          {match.available?.[type] || 0} tickets available
        </span>
      </div>
    ))}
  </div>
);

export default TicketOptions; 