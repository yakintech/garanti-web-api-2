const User = require('../models/user');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Multer ayarları
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/';
    // uploads dizininin var olup olmadığını kontrol et, yoksa oluştur
    if (!fs.existsSync(uploadDir)){
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).send('Error fetching users: ' + err.message);
  }
};

// Create a new user
exports.createUser = [
  upload.single('profileImage'), // Profil resmini yüklemek için multer middleware
  // Validate and sanitize input
  body('name').trim().isLength({ min: 1 }).escape().withMessage('Name is required.'),
  body('email').isEmail().normalizeEmail().withMessage('Invalid email.'),
  body('password')
    .isLength({ min: 5 }).withMessage('Password must be at least 5 characters long.')
    .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter.')
    .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage('Password must contain at least one special character.'),
  body('isAdmin').optional().isBoolean().withMessage('isAdmin must be a boolean value.'),

  // Process request after validation and sanitization
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, isAdmin } = req.body;
    const profileImage = req.file ? req.file.filename : null;

    try {
      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({ name, email, password: hashedPassword, isAdmin, profileImage });

      const savedUser = await newUser.save();
      res.status(201).json({ id: savedUser._id });
    } catch (err) {
      res.status(500).send('Error creating user: ' + err.message);
    }
  }
];

// Update an existing user
exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req, { new: true });
    if (!updatedUser) {
      return res.status(404).send('User not found');
    }
    res.send('User updated successfully!');
  } catch (err) {
    res.status(500).send('Error updating user: ' + err.message);
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).send('User not found');
    }
    res.send('User deleted successfully!');
  } catch (err) {
    res.status(500).send('Error deleting user: ' + err.message);
  }
};