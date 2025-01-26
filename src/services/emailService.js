import { generateTicketEmailTemplate } from '../utils/emailTemplates';

export const sendConfirmationEmail = async (emailData) => {
  try {
    const emailTemplate = generateTicketEmailTemplate(emailData.orderDetails);
    
    const response = await fetch('YOUR_BACKEND_API/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: emailData.email,
        subject: 'FC ESCUELA - Ticket Order Confirmation',
        html: emailTemplate,
        orderDetails: emailData.orderDetails
      })
    });

    if (!response.ok) {
      throw new Error('Failed to send confirmation email');
    }

    return await response.json();
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    throw error;
  }
}; 