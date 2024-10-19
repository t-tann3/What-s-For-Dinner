import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const authController = {
  // Registration Logic
  register: async (req, res) => {
    try {
      const { username, email, password } = req.body;

      // Check if email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already exists' });
      }

      // Hash the password before saving to the database
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user with the hashed password
      const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
        age
      });

      // Generate a JWT token for the new user
      const userToken = jwt.sign(
        { id: newUser._id },
        process.env.SECRET_KEY,
        { expiresIn: '1h' }
      );

      // Send the token as a cookie
      res
        .cookie('usertoken', userToken, { httpOnly: true })
        .json({ message: 'User registered successfully!' });
    } catch (error) {
      res.status(500).json({ message: 'Server error during registration', error });
    }
  },

  // Login Logic
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Find the user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid email or password.' });
      }

      // Compare the provided password with the hashed password in the database
      const correctPassword = await bcrypt.compare(password, user.password);
      if (!correctPassword) {
        return res.status(400).json({ message: 'Invalid email or password.' });
      }

      // Generate a JWT token for the logged-in user
      const userToken = jwt.sign(
        { id: user._id },
        process.env.SECRET_KEY,
        { expiresIn: '1h' }
      );

      // Send the token as a cookie
      res
        .cookie('usertoken', userToken, { httpOnly: true })
        .json({ message: 'Login successful!' });
    } catch (error) {
      res.status(500).json({ message: 'Server error during login', error });
    }
  }
};
