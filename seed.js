const Category = require('./models/category');
const Product = require('./models/product');
const User = require('./models/user');
const Order = require('./models/order');

async function addTestData() {
  try {
    const categoryCount = await Category.countDocuments();
    const userCount = await User.countDocuments();
    if (categoryCount > 0 || userCount > 0) {
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

    // Test kullanıcıları ekleme
    const user1 = new User({ name: 'John Doe', email: 'john@example.com', password: 'password123', isAdmin: false });
    const user2 = new User({ name: 'Jane Doe', email: 'jane@example.com', password: 'password123', isAdmin: true });

    await user1.save();
    await user2.save();

    // Test siparişleri ekleme
    const order1 = new Order({
      user: user1._id,
      products: [
        { product: product1._id, quantity: 1 },
        { product: product3._id, quantity: 2 }
      ],
      totalAmount: 737,
      status: 'Pending'
    });

    const order2 = new Order({
      user: user2._id,
      products: [
        { product: product2._id, quantity: 1 }
      ],
      totalAmount: 999,
      status: 'Pending'
    });

    await order1.save();
    await order2.save();

    console.log('Test data added successfully!');
  } catch (err) {
    console.error('Error adding test data: ', err.message);
  }
}

module.exports = addTestData;