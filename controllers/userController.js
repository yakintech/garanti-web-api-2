const User = require('../models/user');

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
exports.createUser = async (req, res) => {
  const { name, email, password, isAdmin } = req.body;

  const newUser = new User({ name, email, password, isAdmin });

  try {
    const savedUser = await newUser.save();
    res.status(201).json({ id: savedUser._id });
  } catch (err) {
    res.status(500).send('Error creating user: ' + err.message);
  }
};

// Update an existing user
exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
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