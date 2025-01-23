import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { paypalConfig } from '../config/paypal';
import '../CSS/BuyTickets.css';

const BuyTickets = () => {
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedTicketType, setSelectedTicketType] = useState(null);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const upcomingMatches = [
    {
      id: 1,
      homeTeam: "FC ESCUELA",
      awayTeam: "City FC",
      date: "Feb 1, 2024",
      time: "20:00",
      venue: "Dong My Stadium",
      competition: "League Match",
      prices: {
        standard: 20,
        premium: 35,
        vip: 50
      }
    },
    {
      id: 2,
      homeTeam: "FC ESCUELA",
      awayTeam: "United FC",
      date: "Feb 15, 2024",
      time: "19:45",
      venue: "Dong My Stadium",
      competition: "Cup Match",
      prices: {
        standard: 25,
        premium: 40,
        vip: 60
      }
    }
  ];

  const handleMatchSelect = (match) => {
    setSelectedMatch(match);
    setQuantity(1);
    setSelectedTicketType(null);
    setTotal(0);
  };

  const handleTicketTypeSelect = (type, price) => {
    setSelectedTicketType({ type, price });
    setTotal(price * quantity);
  };

  useEffect(() => {
    if (selectedTicketType) {
      setTotal(selectedTicketType.price * quantity);
    }
  }, [quantity, selectedTicketType]);

  const createOrder = async (data, actions) => {
    if (!selectedMatch || !selectedTicketType) {
      alert('Please select a match and ticket type');
      return;
    }
    
    setIsLoading(true);
    try {
      return await actions.order.create({
        purchase_units: [{
          description: `${selectedMatch.competition} - ${selectedTicketType.type} Ticket`,
          amount: {
            currency_code: "USD",
            value: total.toString(),
            breakdown: {
              item_total: {
                currency_code: "USD",
                value: total.toString()
              }
            }
          },
          items: [{
            name: `${selectedTicketType.type} Ticket`,
            description: `${selectedMatch.homeTeam} vs ${selectedMatch.awayTeam}`,
            quantity: quantity.toString(),
            unit_amount: {
              currency_code: "USD",
              value: selectedTicketType.price.toString()
            }
          }]
        }]
      });
    } catch (error) {
      console.error('Create Order Error:', error);
      alert('There was an error creating your order. Please try again.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const onApprove = async (data, actions) => {
    setIsLoading(true);
    try {
      const details = await actions.order.capture();
      alert("Transaction completed! Thank you for your purchase.");
      // Here you would typically:
      // 1. Save the order to your database
      // 2. Send confirmation email
      // 3. Generate tickets
      // 4. Redirect to confirmation page
    } catch (error) {
      console.error('Capture Order Error:', error);
      alert('There was an error processing your payment.');
    } finally {
      setIsLoading(false);
    }
  };

  const onError = (err) => {
    console.error('PayPal Error:', err);
    alert('There was an error processing your payment. Please try again.');
  };

  const onCancel = () => {
    alert('Payment cancelled. Please try again when you\'re ready.');
  };

  return (
    <PayPalScriptProvider options={paypalConfig}>
      <div className="tickets-page">
        <div className="tickets-header">
          <h1>Buy Match Tickets</h1>
          <p>Support FC ESCUELA at Dong My Stadium</p>
        </div>

        <div className="tickets-container">
          <div className="matches-section">
            <h2>Upcoming Matches</h2>
            <div className="matches-grid">
              {upcomingMatches.map((match) => (
                <div 
                  key={match.id} 
                  className={`match-ticket-card ${selectedMatch?.id === match.id ? 'selected' : ''}`}
                  onClick={() => handleMatchSelect(match)}
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
              ))}
            </div>
          </div>

          {selectedMatch && (
            <div className="booking-section">
              <h2>Ticket Details</h2>
              <div className="ticket-options">
                {Object.entries(selectedMatch.prices).map(([type, price]) => (
                  <div 
                    key={type}
                    className={`ticket-type ${selectedTicketType?.type === type ? 'selected' : ''}`}
                    onClick={() => handleTicketTypeSelect(type, price)}
                  >
                    <h3>{type.charAt(0).toUpperCase() + type.slice(1)} Ticket</h3>
                    <p>{type === 'standard' ? 'General admission seating' : 
                       type === 'premium' ? 'Better viewing positions' : 
                       'Best seats with additional benefits'}</p>
                    <span className="price">${price}</span>
                  </div>
                ))}
              </div>

              {selectedTicketType && (
                <>
                  <div className="quantity-selector">
                    <label>Number of Tickets:</label>
                    <div className="quantity-controls">
                      <button 
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        disabled={quantity <= 1}
                      >
                        <FontAwesomeIcon icon="minus" />
                      </button>
                      <span>{quantity}</span>
                      <button 
                        onClick={() => setQuantity(quantity + 1)}
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
                        <span>{selectedTicketType.type.charAt(0).toUpperCase() + selectedTicketType.type.slice(1)}</span>
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

                  <div className="payment-section">
                    {isLoading && (
                      <div className="loading-overlay">
                        <div className="loading-spinner">Processing payment...</div>
                      </div>
                    )}
                    <PayPalButtons 
                      createOrder={createOrder}
                      onApprove={onApprove}
                      onError={onError}
                      onCancel={onCancel}
                      style={{ 
                        layout: "horizontal",
                        color: "blue",
                        shape: "rect",
                        label: "pay"
                      }}
                      disabled={!selectedMatch || !selectedTicketType}
                    />
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </PayPalScriptProvider>
  );
};

export default BuyTickets; 