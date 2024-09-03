import nodemailer from 'nodemailer';

// Create a transport object using your email service provider's configuration
const transporter = nodemailer.createTransport({
  service: 'gmail', // You can use other services like 'hotmail', 'yahoo', etc.
  auth: {
    user: 'ss365493@gmail.com', // Your email address
    pass: 'CL900ffxx@71L'    // Your email password or an app-specific password
  }
});

// Function to send an email
export async function sendEmail({ to, subject, text, html }) {
  const mailOptions = {
    from: 'sagarsharmatech00@gmail.com', // Sender address
    to: 'recipient@example.com',  // Dummy recipient
    subject: 'Test Email Subject', // Dummy subject
    text: 'Hello, this is a test email with plain text.', // Dummy plain text body
    html: '<p>Hello, this is a <b>test</b> email with HTML.</p>' 
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}
