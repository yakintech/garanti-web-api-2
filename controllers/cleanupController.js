const Category = require('../models/category');
const Product = require('../models/product');
const User = require('../models/user');
const Order = require('../models/order');

exports.cleanupDatabase = async (req, res) => {
  try {
    await Category.deleteMany({});
    await Product.deleteMany({});
    await User.deleteMany({});
    await Order.deleteMany({});
    res.send('All data has been deleted successfully!');
  } catch (err) {
    res.status(500).send('Error deleting data: ' + err.message);
  }
};