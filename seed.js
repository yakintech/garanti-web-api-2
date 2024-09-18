const Category = require('./models/category');
const Product = require('./models/product');

async function addTestData() {
  try {
    const categoryCount = await Category.countDocuments();
    if (categoryCount > 0) {
      console.log('Test data already exists. Skipping data insertion.');
      return;
    }

    // Test kategorileri ekleme
    const electronicsCategory = new Category({ name: 'Electronics', description: 'Electronic items' });
    const clothingCategory = new Category({ name: 'Clothing', description: 'Apparel and accessories' });

    await electronicsCategory.save();
    await clothingCategory.save();

    // Test ürünleri ekleme
    const product1 = new Product({ name: 'Smartphone', price: 699, category: electronicsCategory._id });
    const product2 = new Product({ name: 'Laptop', price: 999, category: electronicsCategory._id });
    const product3 = new Product({ name: 'T-Shirt', price: 19, category: clothingCategory._id });

    await product1.save();
    await product2.save();
    await product3.save();

    console.log('Test data added successfully!');
  } catch (err) {
    console.error('Error adding test data: ', err.message);
  }
}

module.exports = addTestData;