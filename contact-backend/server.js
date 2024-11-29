const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const app = express();

// Connect to MongoDB (replace with your connection string)
mongoose.connect('mongodb://localhost:27017/contactFormDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => console.error('Error connecting to MongoDB:', error));

// Middleware
app.use(bodyParser.json());
app.use(cors());


const adminSchema = new mongoose.Schema({
  email: String,
  otp: String,
  otpExpires: Date
});
// Define Mongoose schema
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String
});
const Admin = mongoose.model('Admin', adminSchema);
const Contact = mongoose.model('Contact', contactSchema);

// Define endpoint to handle form submissions
app.post('/contact', async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).send({ message: 'Form data saved successfully!' });
  } catch (error) {
    res.status(400).send({ error: 'Failed to save form data' });
  }
});


// Admin email and password
const ADMIN_EMAIL = 'anshumanbiswal098@gmail.com';
const ADMIN_PASSWORD = 'juihzsmqmmbofxhf';

// Setup nodemailer
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: ADMIN_EMAIL,
    pass: ADMIN_PASSWORD
  },
  secure: false, // Use SSL
  tls: {
    rejectUnauthorized: false
  }
});

// Login route
app.post('/admin/login', async (req, res) => {
  const { email } = req.body;

  // Check if the provided email matches the admin email
  if (email !== ADMIN_EMAIL) {
    return res.status(403).send({ error: 'Sorry, you are not an admin of this site.' });
  }

  const otp = crypto.randomInt(100000, 999999).toString(); // Generate OTP
  const otpExpires = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes

  try {
    // Update OTP in database
    await Admin.updateOne(
      { email },
      { email, otp, otpExpires },
      { upsert: true }
    );
  } catch (error) {
    console.error('Error updating database:', error);
    return res.status(500).send({ error: 'Failed to update OTP in database' });
  }

  const mailOptions = {
    from: ADMIN_EMAIL,
    to: email,
    subject: 'Your OTP for Login',
    text: `Your OTP is: ${otp}`
  };

  transporter.sendMail(mailOptions, (error, _info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).send({ error: 'Failed to send OTP' });
    }
    res.status(200).send({ message: 'OTP sent to your email' });
  });
});





// OTP verification route
app.post('/admin/verify-otp', async (req, res) => {
  const { email, otp } = req.body;
  const admin = await Admin.findOne({ email });

  if (!admin || admin.otp !== otp || Date.now() > admin.otpExpires) {
    return res.status(400).send({ error: 'Invalid or expired OTP' });
  }

  res.status(200).send({ message: 'Logged in successfully' });
});

// Fetch contact form data
app.get('/admin/contacts', async (req, res) => {
  const contacts = await Contact.find();
  res.status(200).send(contacts);
});





// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
