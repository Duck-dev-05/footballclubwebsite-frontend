import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { paypalConfig, handlePayPalError } from '../config/paypal';
import MatchCard from '../components/tickets/MatchCard';
import TicketOptions from '../components/tickets/TicketOptions';
import OrderSummary from '../components/tickets/OrderSummary';
import '../CSS/BuyTickets.css';
import { sendConfirmationEmail } from '../services/emailService';
import Notification from '../components/common/Notification';

const saveOrder = async (orderData) => {
  try {
    const response = await fetch('http://localhost:5046/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData)
    });
    
    if (!response.ok) {
      throw new Error('Failed to save order');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error saving order:', error);
    throw error;
  }
};

const BuyTickets = () => {
  const navigate = useNavigate();
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedTicketType, setSelectedTicketType] = useState(null);
  const [total, setTotal] = useState(0);
  const [notification, setNotification] = useState(null);

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
      },
      available: {
        standard: 100,
        premium: 50,
        vip: 20
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
      },
      available: {
        standard: 80,
        premium: 40,
        vip: 15
      }
    }
  ];

  useEffect(() => {
    if (selectedTicketType && quantity) {
      setTotal(selectedTicketType.price * quantity);
    }
  }, [selectedTicketType, quantity]);

  const handleMatchSelect = (match) => {
    setSelectedMatch(match);
    setSelectedTicketType(null);
    setQuantity(1);
    setTotal(0);
  };

  const handleTicketSelect = (type, price) => {
    if (selectedMatch.available[type] < quantity) {
      showNotification('warning', `Sorry, only ${selectedMatch.available[type]} ${type} tickets available`);
      return;
    }
    setSelectedTicketType({ type, price });
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      if (selectedTicketType && selectedMatch.available[selectedTicketType.type] < newQuantity) {
        showNotification('warning', `Sorry, only ${selectedMatch.available[selectedTicketType.type]} tickets available`);
        return;
      }
      setQuantity(newQuantity);
    }
  };

  const showNotification = (type, message) => {
    setNotification({ type, message });
    // Auto-hide after 3 seconds
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const processOrder = async (details) => {
    try {
      // Save order to database
      const savedOrder = await saveOrder({
        orderId: details.id,
        matchId: selectedMatch.id,
        ticketType: selectedTicketType.type,
        quantity: quantity,
        total: total,
        paymentDetails: details,
        customerEmail: details.payer.email_address,
        purchaseDate: new Date().toISOString()
      });

      // Send confirmation email
      await sendConfirmationEmail({
        email: details.payer.email_address,
        orderDetails: {
          orderId: details.id,
          matchDetails: selectedMatch,
          ticketType: selectedTicketType.type,
          quantity: quantity,
          total: total,
          purchaseDate: new Date().toLocaleDateString(),
          customerName: `${details.payer.name.given_name} ${details.payer.name.surname}`
        }
      });

      // Update ticket availability
      const updatedMatch = { ...selectedMatch };
      updatedMatch.available[selectedTicketType.type] -= quantity;
      // Here you would typically update this in your database

      return savedOrder;
    } catch (error) {
      console.error('Error processing order:', error);
      throw new Error('Failed to process order');
    }
  };

  return (
    <PayPalScriptProvider 
      options={{
        "client-id": paypalConfig["client-id"],
        currency: "USD",
        intent: "capture",
        components: "buttons"
      }}
    >
      <div className="tickets-page">
        {notification && (
          <Notification
            type={notification.type}
            message={notification.message}
          />
        )}
        <div className="tickets-header">
          <h1>Buy Match Tickets</h1>
          <p>Support FC ESCUELA at Dong My Stadium</p>
        </div>

        <div className="tickets-container">
          {/* Match Selection */}
          <div className="matches-section">
            <h2>Upcoming Matches</h2>
            <div className="matches-grid">
              {upcomingMatches.map((match) => (
                <MatchCard
                  key={match.id}
                  match={match}
                  isSelected={selectedMatch?.id === match.id}
                  onSelect={handleMatchSelect}
                />
              ))}
            </div>
          </div>

          {/* Ticket Selection and Payment */}
          {selectedMatch && (
            <div className="booking-section">
              <h2>Ticket Details</h2>
              
              <TicketOptions
                match={selectedMatch}
                selectedType={selectedTicketType?.type}
                onSelect={handleTicketSelect}
              />

              {selectedTicketType && (
                <>
                  <OrderSummary
                    quantity={quantity}
                    onQuantityChange={handleQuantityChange}
                    ticketType={selectedTicketType}
                    total={total}
                  />

                  <div className="payment-section">
                    <PayPalButtons
                      style={{
                        layout: "horizontal",
                        color: "blue",
                        shape: "rect",
                        label: "pay"
                      }}
                      createOrder={(data, actions) => {
                        return actions.order.create({
                          purchase_units: [{
                            amount: {
                              value: total.toString()
                            }
                          }]
                        });
                      }}
                      onApprove={async (data, actions) => {
                        try {
                          const details = await actions.order.capture();
                          showNotification('success', 'Payment successful! Redirecting to confirmation...');
                          
                          await processOrder(details);
                          
                          setTimeout(() => {
                            navigate('/tickets/confirmation', { 
                              state: { 
                                orderDetails: details,
                                matchDetails: selectedMatch,
                                ticketType: selectedTicketType,
                                quantity: quantity,
                                emailSent: true
                              }
                            });
                          }, 2000);
                        } catch (error) {
                          showNotification('error', 'Payment failed. Please try again.');
                          handlePayPalError(error);
                        }
                      }}
                      onError={(err) => {
                        showNotification('error', 'An error occurred during payment. Please try again.');
                        handlePayPalError(err);
                      }}
                      onCancel={() => {
                        showNotification('warning', 'Payment was cancelled');
                      }}
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