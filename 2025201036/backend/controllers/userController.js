import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

export const authUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.status(200).json({ _id: user._id, email: user.email });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
};

export const registerUser = async (req, res) => {
  const { email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ message: 'User already exists' });
  const user = await User.create({ email, password }); //
  if (user) {
    generateToken(res, user._id); //
    res.status(201).json({ _id: user._id, email: user.email });
  } else {
    res.status(400).json({ message: 'Invalid user data' });
  }
};

export const logoutUser = (req, res) => {
  res.cookie('jwt', '', { httpOnly: true, expires: new Date(0) });
  res.status(200).json({ message: 'User logged out' }); //
};