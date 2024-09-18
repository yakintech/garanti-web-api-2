const User = require('../models/user');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/jwt');
const { body, validationResult } = require('express-validator');

// Kullanıcı kaydı
exports.register = [
  body('name').trim().isLength({ min: 1 }).escape().withMessage('Name is required.'),
  body('email').isEmail().normalizeEmail().withMessage('Invalid email.'),
  body('password')
    .isLength({ min: 5 }).withMessage('Password must be at least 5 characters long.')
    .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter.')
    .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage('Password must contain at least one special character.'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, isAdmin } = req.body;

    try {
      const newUser = new User({ name, email, password, isAdmin });
      const savedUser = await newUser.save();
      const token = generateToken(savedUser);
      res.status(201).json({ token });
    } catch (err) {
      res.status(500).send('Error creating user: ' + err.message);
    }
  }
];

// Kullanıcı girişi
exports.login = [
  body('email').isEmail().normalizeEmail().withMessage('Invalid email.'),
  body('password').isLength({ min: 1 }).withMessage('Password is required.'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).send('Invalid email or password.');
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).send('Invalid email or password.');
      }

      const token = generateToken(user);
      res.json({ token });
    } catch (err) {
      res.status(500).send('Error logging in: ' + err.message);
    }
  }
];