export const generateTicketEmailTemplate = (orderData) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background-color: #0055FF; color: white; padding: 20px; text-align: center;">
        <h1>FC ESCUELA Ticket Confirmation</h1>
      </div>
      
      <div style="padding: 20px; background-color: #f5f5f5;">
        <h2>Thank you for your purchase!</h2>
        <p>Your ticket order has been confirmed.</p>
        
        <div style="background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Order Details</h3>
          <p><strong>Order ID:</strong> ${orderData.orderId}</p>
          <p><strong>Match:</strong> ${orderData.matchDetails.homeTeam} vs ${orderData.matchDetails.awayTeam}</p>
          <p><strong>Date:</strong> ${orderData.matchDetails.date}</p>
          <p><strong>Time:</strong> ${orderData.matchDetails.time}</p>
          <p><strong>Venue:</strong> ${orderData.matchDetails.venue}</p>
          <p><strong>Ticket Type:</strong> ${orderData.ticketType}</p>
          <p><strong>Quantity:</strong> ${orderData.quantity}</p>
          <p><strong>Total Amount:</strong> $${orderData.total}</p>
        </div>
        
        <div style="background-color: white; padding: 20px; border-radius: 8px;">
          <h3>Important Information</h3>
          <ul style="padding-left: 20px;">
            <li>Please arrive at least 30 minutes before kick-off</li>
            <li>Bring a valid ID matching the name on the ticket</li>
            <li>Your e-tickets will be sent in a separate email</li>
            <li>For any queries, contact support@fcescuela.com</li>
          </ul>
        </div>
      </div>
      
      <div style="text-align: center; padding: 20px; color: #666;">
        <p>FC ESCUELA - Home of Champions</p>
        <p>Follow us on social media for updates</p>
      </div>
    </div>
  `;
}; 