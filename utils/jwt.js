const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  return jwt.sign({ id: user._id, isAdmin: user.isAdmin }, 'your_jwt_secret_key', { expiresIn: '1h' });
};

const verifyToken = (token) => {
  return jwt.verify(token, 'your_jwt_secret_key');
};

module.exports = { generateToken, verifyToken };