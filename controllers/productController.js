const Product = require('../models/product');

// Get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('category');
    const formattedProducts = products.map(product => ({
      _id: product._id,
      name: product.name,
      price: product.price,
      category: {
        _id: product.category._id,
        name: product.category.name,
        description: product.category.description
      }
    }));
    res.json(formattedProducts);
  } catch (err) {
    res.status(500).send('Error fetching products: ' + err.message);
  }
};

// Create a new product
exports.createProduct = async (req, res) => {
  const { name, price, category } = req.body;

  const newProduct = new Product({ name, price, category });

  try {
    const savedProduct = await newProduct.save();
    res.status(201).json({ id: savedProduct._id });
  } catch (err) {
    res.status(500).send('Error creating product: ' + err.message);
  }
};

// Update an existing product
exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProduct) {
      return res.status(404).send('Product not found');
    }
    res.send('Product updated successfully!');
  } catch (err) {
    res.status(500).send('Error updating product: ' + err.message);
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).send('Product not found');
    }
    res.send('Product deleted successfully!');
  } catch (err) {
    res.status(500).send('Error deleting product: ' + err.message);
  }
};