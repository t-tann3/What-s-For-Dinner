import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const authController = {
  // Registration Logic
  register: async (req, res) => {
    try {
      const { username, email, password, confirmPassword} = req.body;

      if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
      }
      
      // Check if email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already exists' });
      }

      // Hash the password before saving to the database
      // const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user with the hashed password
      const newUser = await User.create({
        username,
        email,
        password,
        confirmPassword
      });

      
      // Generate a JWT token for the new user
      const userToken = jwt.sign(
        { id: newUser._id },
        process.env.SECRET_KEY,
        { expiresIn: '1h' }
      );

      // Send the token as a cookie
      return res.status(201).json({
        message: 'User registered successfully',
        token: userToken,
        user: {
          id: newUser._id,
          username: newUser.username,
          email: newUser.email,
        }
      });
      
    } catch (error) {
      console.error('Error during registration:', error);
      res.status(500).json({ message: 'Server error during registration', error });
    }
  },




  // Login Logic
  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      console.log(username, password)
      // Find the user by username
      const user = await User.findOne({ username });
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
