// const ContactUs = require ('../models/ContactUs.js')
// // const nodemailer = require("nodemailer");

// exports.submitContactForm = async (req, res) => {
//     try {
//         const contactUsData = req.body;
//         const newContact = new ContactUs(contactUsData);
//         await newContact.save();
//         res.status(201).json({
//             message: 'Contact form submitted successfully!',
//             data: contactUsData
//         });
//     } catch (error) {
//         res.status(500).json({ message: 'Failed to submit contact form', error: error.message });
//     }
// };

// exports.submitContactForm = async (req, res) => {
//   const { name, email, project_description } = req.body;
  
//   const transporter = nodemailer.createTransport({
//     service: 'Gmail',
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS
//     }
//   });

//   const mailOptions = {
//     from: ContactUs.email,
//     to: process.env.RECEIVER_EMAIL,
//     subject: 'New Contact Form Submission',
//     text: `Name: ${name}\nEmail: ${email}\nMessage: ${project_description}`
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     res.status(201).json({
//         message: 'Contact form submitted successfully!',
//         data: ContactUsData
//     });
// } catch (error) {
//     res.status(500).json({ message: 'Failed to submit contact form', error: error.message });
// }
// };

const nodemailer = require('nodemailer');
const dotenv = require ("dotenv");

dotenv.config();


exports.submitContactForm = async (req, res) => {
  const { firstName,  lastName, email, project_description } = req.body;

  if (!firstName || !lastName || !email || !project_description) {
    return res.status(400).json({ message: 'All fields are required' });
  }

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
    from: process.env.EMAIL_USER,  // ✅ Must match the authenticated sender
  replyTo: email,  // ✅ This makes it look like the user sent i
    to: process.env.EMAIL_USER,
    subject: 'New Contact Form Submission',
    text: `Name: ${fullName}\nEmail: ${email}\nMessage: ${project_description}`
  };
console.log (email)
  try {
    await transporter.sendMail(mailOptions);
    res.status(201).json({
      message: 'Contact form submitted successfully!',
      data: { fullName, email, project_description } // Return the correct data
    });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to submit contact form', error: error.message });
  }
};

  