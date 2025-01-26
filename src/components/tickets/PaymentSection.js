import React from 'react';
import { PayPalButtons } from "@paypal/react-paypal-js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const PaymentSection = ({ 
  isLoading, 
  paymentStatus, 
  createOrder, 
  onApprove, 
  onError, 
  onCancel, 
  disabled,
  total 
}) => (
  <div className="payment-section" data-loading={isLoading}>
    {isLoading && (
      <div className="loading-overlay">
        <div className="loading-spinner">
          <FontAwesomeIcon icon="spinner" spin />
          <span>Processing payment...</span>
        </div>
      </div>
    )}
    
    {paymentStatus === 'success' && (
      <div className="success-message">
        <FontAwesomeIcon icon="check-circle" />
        <span>Payment successful! Redirecting to confirmation...</span>
      </div>
    )}

    {paymentStatus === 'failed' && (
      <div className="error-message">
        <FontAwesomeIcon icon="exclamation-circle" />
        <span>Payment failed. Please try again.</span>
      </div>
    )}

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
      onApprove={onApprove}
      onError={onError}
      onCancel={onCancel}
      disabled={disabled || isLoading}
    />
  </div>
);

export default PaymentSection; 