const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Secret key for JWT generation
const JWT_SECRET = process.env.JWT_SECRET || "ourSecretKey";

// =============================
// REGISTER USER CONTROLLER
// =============================
const registerUser = async(req, res) => {
    try {
        const { name, email, password } = req.body;
        console.log("Received register request:", { name, email, password });

        if (!email || !password || !name) {
            console.log("Missing fields");
            return res.status(400).json({ message: "Name, Email and Password are required." });
        }

        const existing = await User.findOne({ email });
        if (existing) {
            console.log("User already exists");
            return res.status(400).json({ message: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        console.log("User registered successfully:", newUser.email);
        const token = jwt.sign({ id: newUser._id, email: newUser.email }, JWT_SECRET, { expiresIn: '1w' });

        return res.status(201).json({ token, message: 'User created successfully' });

    } catch (err) {
        console.error("Registration error:", err);
        return res.status(500).json({ message: "Server error" });
    }
};


// =============================
// LOGIN USER CONTROLLER
// =============================
const loginUser = async (req, res) => {
  try {
    // Extracting credentials from request body
    const { email, password } = req.body;

    // Checking if user exists in DB
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not Found" });
    }

    // Validating password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid Password" });
    }

    // Creating JWT token upon successful login
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1w' });

    // Sending response with token
    res.status(200).json({ token, message: "Login successful" });

  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ message: err.message || "Server error" });
  }
};

// Exporting the controllers
module.exports = {
  registerUser,
  loginUser,
};
