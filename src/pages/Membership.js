import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { paypalConfig, handlePayPalError, isSandbox } from '../config/paypal';
import '../CSS/Membership.css';

const Membership = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);

  const membershipPlans = [
    {
      id: 'bronze',
      name: 'Bronze',
      price: 99,
      period: 'year',
      benefits: [
        'Match ticket pre-sale access',
        'Official membership card',
        '10% discount on merchandise',
        'Monthly newsletter',
        'Digital membership pack'
      ]
    },
    {
      id: 'silver',
      name: 'Silver',
      price: 199,
      period: 'year',
      benefits: [
        'All Bronze benefits',
        'Priority ticket booking',
        '20% discount on merchandise',
        'Exclusive member events',
        'Season preview event access'
      ]
    },
    {
      id: 'gold',
      name: 'Gold',
      price: 399,
      period: 'year',
      benefits: [
        'All Silver benefits',
        'Guaranteed match tickets',
        '30% discount on merchandise',
        'VIP stadium tour',
        'Meet & greet with players',
        'Access to exclusive lounges'
      ]
    }
  ];

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    setPaymentStatus(null);
  };

  const createOrder = async (data, actions) => {
    if (!selectedPlan) return;

    try {
      setIsLoading(true);
      return await actions.order.create({
        purchase_units: [{
          reference_id: `membership-${selectedPlan.id}-${Date.now()}`,
          description: `FC ESCUELA ${selectedPlan.name} Membership`,
          amount: {
            currency_code: "USD",
            value: selectedPlan.price.toString()
          }
        }]
      });
    } catch (error) {
      handlePayPalError(error);
      throw error;
    }
  };

  const onApprove = async (data, actions) => {
    try {
      setIsLoading(true);
      const details = await actions.order.capture();
      
      // Save membership to database
      await saveMembership({
        orderId: details.id,
        plan: selectedPlan,
        paymentDetails: details
      });

      setPaymentStatus('success');
      alert('Welcome to FC ESCUELA Membership! Check your email for details.');
    } catch (error) {
      setPaymentStatus('failed');
      handlePayPalError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveMembership = async (membershipData) => {
    // Here you would make an API call to save the membership
    console.log('Saving membership:', membershipData);
  };

  return (
    <PayPalScriptProvider 
      options={{
        "client-id": paypalConfig["client-id"],
        currency: "USD",
        intent: "capture"
      }}
    >
      <div className="membership-page">
        <div className="membership-hero">
          <h1>FC ESCUELA Membership</h1>
          <p>Join our football family and enjoy exclusive benefits</p>
        </div>

        <div className="membership-content">
          <div className="membership-plans">
            {membershipPlans.map((plan) => (
              <div 
                key={plan.id}
                className={`plan-card ${selectedPlan?.id === plan.id ? 'selected' : ''}`}
                onClick={() => handlePlanSelect(plan)}
              >
                <div className="plan-header">
                  <h2>{plan.name}</h2>
                  <div className="plan-price">
                    <span className="amount">${plan.price}</span>
                    <span className="period">/{plan.period}</span>
                  </div>
                </div>
                <div className="plan-benefits">
                  <h3>Benefits Include:</h3>
                  <ul>
                    {plan.benefits.map((benefit, index) => (
                      <li key={index}>
                        <FontAwesomeIcon icon="check" /> {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
                <button 
                  className={`select-plan-btn ${selectedPlan?.id === plan.id ? 'selected' : ''}`}
                >
                  {selectedPlan?.id === plan.id ? 'Selected' : 'Select Plan'}
                </button>
              </div>
            ))}
          </div>

          {selectedPlan && (
            <div className="payment-section">
              {isLoading && (
                <div className="loading-overlay">
                  <div className="loading-spinner">
                    Processing payment...
                  </div>
                </div>
              )}
              
              {paymentStatus === 'success' && (
                <div className="success-message">
                  Welcome to FC ESCUELA Membership!
                </div>
              )}

              {paymentStatus === 'failed' && (
                <div className="error-message">
                  Payment failed. Please try again.
                </div>
              )}

              <PayPalButtons 
                createOrder={createOrder}
                onApprove={onApprove}
                onError={(err) => {
                  setPaymentStatus('failed');
                  handlePayPalError(err);
                }}
                onCancel={() => {
                  setPaymentStatus(null);
                  alert('Payment cancelled');
                }}
                style={{ 
                  layout: "horizontal",
                  color: "blue",
                  shape: "rect",
                  label: "pay"
                }}
                disabled={!selectedPlan || isLoading}
              />

              {isSandbox && (
                <div className="sandbox-notice">
                  Test Mode: Use sandbox PayPal account to test payments
                </div>
              )}
            </div>
          )}

          <div className="membership-faq">
            <h2>Frequently Asked Questions</h2>
            <div className="faq-grid">
              <div className="faq-item">
                <h3>How long is the membership valid?</h3>
                <p>Memberships are valid for one year from the date of purchase.</p>
              </div>
              <div className="faq-item">
                <h3>Can I upgrade my membership?</h3>
                <p>Yes, you can upgrade your membership at any time. Contact our support team for assistance.</p>
              </div>
              <div className="faq-item">
                <h3>How do I use my benefits?</h3>
                <p>Once your membership is active, you'll receive a digital membership card and instructions via email.</p>
              </div>
              <div className="faq-item">
                <h3>Is my membership transferable?</h3>
                <p>No, memberships are non-transferable and linked to the registered member.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PayPalScriptProvider>
  );
};

export default Membership; 