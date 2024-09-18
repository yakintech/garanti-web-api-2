const Category = require('../models/category');

exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find().select('-__v');
        const modifiedCategories = categories.map(category => ({
            ...category._doc,
            name: category.name.toUpperCase()
        }));
        res.json(modifiedCategories);
    } catch (err) {
        res.status(500).send('Error fetching categories: ' + err.message);
    }
};

exports.createCategory = async (req, res) => {
  const { name, description } = req.body;

  if (name.length < 3) {
    return res.status(400).send('Category name must be at least 3 characters long');
  }

  const newCategory = new Category({ name, description });

  try {
    const savedCategory = await newCategory.save();
    res.status(201).json({ id: savedCategory._id });
  } catch (err) {
    res.status(500).send('Error creating category: ' + err.message);
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCategory) {
      return res.status(404).send('Category not found');
    }
    res.send('Category updated successfully!');
  } catch (err) {
    res.status(500).send('Error updating category: ' + err.message);
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);
    if (!deletedCategory) {
      return res.status(404).send('Category not found');
    }
    res.send('Category deleted successfully!');
  } catch (err) {
    res.status(500).send('Error deleting category: ' + err.message);
  }
};