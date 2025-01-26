import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const OrderSummary = ({ quantity, onQuantityChange, ticketType, total }) => (
  <>
    <div className="quantity-selector">
      <label>Number of Tickets:</label>
      <div className="quantity-controls">
        <button 
          onClick={() => onQuantityChange(quantity - 1)}
          disabled={quantity <= 1}
        >
          <FontAwesomeIcon icon="minus" />
        </button>
        <span>{quantity}</span>
        <button 
          onClick={() => onQuantityChange(quantity + 1)}
          disabled={quantity >= 10}
        >
          <FontAwesomeIcon icon="plus" />
        </button>
      </div>
    </div>

    <div className="order-summary">
      <h3>Order Summary</h3>
      <div className="summary-details">
        <div className="summary-row">
          <span>Ticket Type:</span>
          <span>{ticketType.type.charAt(0).toUpperCase() + ticketType.type.slice(1)}</span>
        </div>
        <div className="summary-row">
          <span>Quantity:</span>
          <span>{quantity}</span>
        </div>
        <div className="summary-row total">
          <span>Total:</span>
          <span>${total}</span>
        </div>
      </div>
    </div>
  </>
);

export default OrderSummary; 