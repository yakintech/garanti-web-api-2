const Order = require('../models/order');

// Get all orders
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user').populate('products.product');
    res.json(orders);
  } catch (err) {
    res.status(500).send('Error fetching orders: ' + err.message);
  }
};

// Create a new order
exports.createOrder = async (req, res) => {
  const { user, products, totalAmount, status } = req.body;

  const newOrder = new Order({ user, products, totalAmount, status });

  try {
    const savedOrder = await newOrder.save();
    res.status(201).json({ id: savedOrder._id });
  } catch (err) {
    res.status(500).send('Error creating order: ' + err.message);
  }
};

// Update an existing order
exports.updateOrder = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedOrder) {
      return res.status(404).send('Order not found');
    }
    res.send('Order updated successfully!');
  } catch (err) {
    res.status(500).send('Error updating order: ' + err.message);
  }
};

// Delete an order
exports.deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) {
      return res.status(404).send('Order not found');
    }
    res.send('Order deleted successfully!');
  } catch (err) {
    res.status(500).send('Error deleting order: ' + err.message);
  }
};