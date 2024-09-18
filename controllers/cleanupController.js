const Category = require('../models/category');
const Product = require('../models/product');

exports.cleanupDatabase = async (req, res) => {
  try {
    await Category.deleteMany({});
    await Product.deleteMany({});
    res.send('All data has been deleted successfully!');
  } catch (err) {
    res.status(500).send('Error deleting data: ' + err.message);
  }
};