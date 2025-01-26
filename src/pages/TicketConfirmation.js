import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../CSS/TicketConfirmation.css';

const TicketConfirmation = () => {
  const location = useLocation();
  const { orderDetails, matchDetails, ticketType, quantity, emailSent } = location.state || {};

  if (!orderDetails) {
    return (
      <div className="confirmation-container">
        <div className="confirmation-error">
          <FontAwesomeIcon icon="exclamation-circle" />
          <h2>No order details found</h2>
          <Link to="/tickets" className="back-btn">Return to Tickets</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="confirmation-container">
      <div className="confirmation-content">
        <div className="confirmation-header">
          <FontAwesomeIcon icon="check-circle" className="success-icon" />
          <h1>Thank You for Your Purchase!</h1>
          {emailSent && (
            <p className="email-sent">
              <FontAwesomeIcon icon="envelope" />
              A confirmation email has been sent to {orderDetails.payer.email_address}
            </p>
          )}
        </div>

        <div className="order-details">
          <h2>Order Details</h2>
          <div className="details-grid">
            <div className="detail-item">
              <span>Order ID:</span>
              <span>{orderDetails.id}</span>
            </div>
            <div className="detail-item">
              <span>Match:</span>
              <span>{matchDetails.homeTeam} vs {matchDetails.awayTeam}</span>
            </div>
            <div className="detail-item">
              <span>Date & Time:</span>
              <span>{matchDetails.date} at {matchDetails.time}</span>
            </div>
            <div className="detail-item">
              <span>Venue:</span>
              <span>{matchDetails.venue}</span>
            </div>
            <div className="detail-item">
              <span>Ticket Type:</span>
              <span>{ticketType.type}</span>
            </div>
            <div className="detail-item">
              <span>Quantity:</span>
              <span>{quantity}</span>
            </div>
            <div className="detail-item total">
              <span>Total Paid:</span>
              <span>${orderDetails.purchase_units[0].amount.value}</span>
            </div>
          </div>
        </div>

        <div className="next-steps">
          <h2>Next Steps</h2>
          <ul>
            <li>Check your email for the confirmation and e-tickets</li>
            <li>Save or print your e-tickets</li>
            <li>Arrive at least 30 minutes before kick-off</li>
            <li>Bring a valid ID matching the ticket name</li>
          </ul>
        </div>

        <div className="confirmation-actions">
          <Link to="/" className="home-btn">Return to Home</Link>
          <Link to="/tickets" className="tickets-btn">Buy More Tickets</Link>
        </div>
      </div>
    </div>
  );
};

export default TicketConfirmation; 