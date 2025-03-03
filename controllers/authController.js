const bcrypt = require ('bcryptjs');
const jwt = require ('jsonwebtoken');
const User = require ('../models/User');
const crypto = require ('crypto');
const nodemailer = require ('nodemailer')
const ContactUs = require ('../models/ContactUs.js')


// Register user

exports.registerUser = async (req, res) => {
    const { email, password, confirm_password} = req.body;

    try {
        const existingUser = await User.findOne ({ email });
        if (existingUser)  {
            return res.status (400).json ({ message: "Email already exists. Please enter a different email"});
        }

        if (password !== confirm_password) {
          return res.status(400).send('Passwords do not match.');
      }
  

    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(password, salt);    

    const newUser = new User ({ email, password, confirm_password });
    await newUser.save();
    // const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(201).json({ message: "User registered successfully" });
} catch (error) {
  res.status(500).json({ message: "Failed to register user", error });
}
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    console.log("Request body:", req.body);  // Check if email and password are received

  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
      console.log("Entered password:", password);  // Logs the entered password
      console.log("Stored hashed password:", user.password);  // Logs the stored hashed password

  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
      res.json({ message: "Login successful", token });
    } catch (error) {
      res.status(500).json({ message: "Failed to login", error });
    }
  };
  
  exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne ({ email });

    if (!user) {
      return res.status(404).json ({ message: 'Invalid email. Please check and try again'});
    }
    const token = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour from now

    await user.save();

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        to: user.email,
        from: process.env.EMAIL_USER,
        subject: 'Password Reset',
        text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n` +
              `Please click on the following link, or paste this into your browser to complete the process:\n\n` +
              `${process.env.BASE_URL}/reset/${token}\n\n` +
              `If you did not request this, please ignore this email and your password will remain unchanged.\n`
    };

    transporter.sendMail(mailOptions, (error) => {
        if (error) {
            return res.status(500).send('Error sending email.');
        }
        res.send('Recovery email sent.');
    });
};

exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password, confirm_password } = req.body;

  const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
  });

  if (!user) {
      return res.status(400).send('Password reset token is invalid or has expired.');
  }

  if (password !== confirm_password) {
      return res.status(400).send('Passwords do not match.');
  }

  user.password = await bcrypt.hash(password, 10);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;

  await user.save();

  res.send('Password has been reset successfully!');
};
exports.submitForm = async (req, res) => {
  const { name, email, project_description } = req.body;
  
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.RECEIVER_EMAIL,
    subject: 'New Contact Form Submission',
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${project_description}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Error sending email');
  }
};


  