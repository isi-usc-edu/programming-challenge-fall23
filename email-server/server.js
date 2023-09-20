const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());


const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: '', 
    pass: '', 
  },
});

// Define an endpoint for sending emails
app.post('/send-email', (req, res) => {
  const { recipientEmail, shoppingList } = req.body;

  const mailOptions = {
    from: 'your-email@gmail.com', 
    to: recipientEmail,
    subject: 'Shopping List',
    text: shoppingList.join('\n'), 
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ message: 'Email sending failed' });
    } else {
      console.log('Email sent:', info.response);
      res.json({ message: 'Email sent successfully' });
    }
  });
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
