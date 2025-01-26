// Use the sandbox client ID for development
const SANDBOX_CLIENT_ID = "AVshvnYiYrrVy7k43XzXTGj_doc3VY6RIEM1tU9LOvPMoWDR9HRil7O7VK-QRZ62Uvdb5MD4EiE9ZomO";

export const paypalConfig = {
  "client-id": process.env.NODE_ENV === 'production' 
    ? process.env.REACT_APP_PAYPAL_CLIENT_ID 
    : SANDBOX_CLIENT_ID,
  "currency": "USD",
  "intent": "capture",
  "disable-funding": "credit,card",
  "data-client-token": process.env.REACT_APP_PAYPAL_CLIENT_TOKEN
};

// Add validation
if (!process.env.REACT_APP_PAYPAL_CLIENT_ID) {
  console.error('PayPal Client ID is not configured');
}

// Add sandbox detection
export const isSandbox = process.env.NODE_ENV !== 'production';

// Add error handling wrapper
export const handlePayPalError = (error) => {
  console.error('PayPal Error:', error);
  return {
    error: true,
    message: error.message || 'Payment processing failed. Please try again.'
  };
};

// PayPal API helpers
export const validatePayPalOrder = (orderData) => {
  const requiredFields = ['orderId', 'matchId', 'ticketType', 'quantity', 'total'];
  return requiredFields.every(field => orderData[field]);
};

export const formatPayPalAmount = (amount) => {
  return Number(amount).toFixed(2);
}; 