const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const { promisify } = require('util');

// Function to register a new user
const registerUser = async (userData) => {
    const { email, password, role } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
        email,
        password: hashedPassword,
        role,
        verificationStatus: 'pending'
    });
    return await newUser.save();
};

// Function to login a user
const loginUser = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('User not found');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid credentials');
    }
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return { token, user };
};

// Function to verify OTP (mocked)
const verifyOTP = async (email, otp) => {
    // Mocked OTP verification logic
    return true; // Assume OTP is always valid for this mock
};

// Function to get user by ID
const getUserById = async (id) => {
    return await User.findById(id);
};

// Function to refresh JWT token
const refreshToken = async (token) => {
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const user = await getUserById(decoded.id);
    if (!user) {
        throw new Error('User not found');
    }
    const newToken = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return newToken;
};

module.exports = {
    registerUser,
    loginUser,
    verifyOTP,
    getUserById,
    refreshToken
};