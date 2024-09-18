const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://user_garanti:F5Ca7TIzzTxZLV9w@cluster0.jcus0vv.mongodb.net/garanti-db-2';

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;