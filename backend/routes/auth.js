require('dotenv').config(); // Load environment variables
const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = process.env.JWT_SECRET; // Load JWT secret from .env

// Route1: Create a User
router.post('/createuser', [
  body('name', 'Enter a valid name').isLength({ min: 3 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must be 5 characters').isLength({ min: 5 }),
], async (req, res) => {
  let success = false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success, errors: errors.array() });
  }

  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ success, error: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const secpass = await bcrypt.hash(req.body.password, salt);

    user = await User.create({
      name: req.body.name,
      password: secpass,
      email: req.body.email,
    });

    const data = { user: { id: user.id } };
    const authToken = jwt.sign(data, JWT_SECRET, { expiresIn: '1h' });

    success = true;
    res.json({ success, authToken });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occurred");
  }
});

// Route2: Login User
router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
  let success = false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      return res.status(400).json({ success, error: "Invalid credentials" });
    }

    const data = { user: { id: user.id } };
    const authToken = jwt.sign(data, JWT_SECRET, { expiresIn: '1h' });

    success = true;
    res.json({ success, authToken });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

// Route3: Get Logged-in User Details
router.post('/getuser', fetchuser, async (req, res) => {
  try {
    let userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
