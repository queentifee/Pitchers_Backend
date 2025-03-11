const nodemailer = require('nodemailer');
const ContactUs = require("../models/ContactUs"); // Import Contact model

const dotenv = require ("dotenv");

dotenv.config();


exports.submitContactForm = async (req, res) => {
  const { firstName,  lastName, email, project_description } = req.body;

  if (!firstName || !lastName || !email || !project_description) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  try {
    // Save form data to the database
    const newContact = new ContactUs({
      firstName,
      lastName,
      email,
      project_description,
    });
    await newContact.save(); // Save to MongoDB

  const fullName = `${firstName} ${lastName}`; // Combine first and last name

  if (!process.env.EMAIL_USER) {
    return res.status(500).json({ message: 'Server error: Receiver email is not defined' });
  }

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,  
  replyTo: email,  
    to: process.env.EMAIL_USER,
    subject: 'New Contact Form Submission',
    text: `Name: ${fullName}\nEmail: ${email}\nMessage: ${project_description}`
  };
console.log (email)
  
    await transporter.sendMail(mailOptions);
    res.status(201).json({
      message: 'Contact form submitted successfully!',
      data: { fullName, email, project_description } 
    });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to submit contact form', error: error.message });
  }
};

  