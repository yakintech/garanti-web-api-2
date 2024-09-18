const User = require('./models/user');
const Product = require('./models/product');
const Category = require('./models/category');
const Order = require('./models/order');

const addTestData = async () => {
  try {
    // Örnek kullanıcı verisi ekleme
    const existingUser = await User.findOne({ email: 'admin@example.com' });
    if (!existingUser) {
      const user = new User({
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'Password123!',
        isAdmin: true
      });
      await user.save();
      console.log('Admin user added');
    } else {
      console.log('Admin user already exists');
    }

    // Diğer seed verileri ekleme işlemleri
    // ...

    console.log('Test data added');
  } catch (err) {
    console.error('Error adding test data:', err.message);
  }
};

module.exports = addTestData;