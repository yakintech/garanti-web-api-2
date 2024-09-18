const express = require('express');
const connectDB = require('./config/db');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const authRoutes = require('./routes/authRoutes');
const cleanupRoutes = require('./routes/cleanupRoutes');
const authMiddleware = require('./middleware/authMiddleware');
const addTestData = require('./seed');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Veritabanı bağlantısı ve seed verileri
connectDB().then(() => {
  addTestData();
});

// Middleware'ler
app.use(express.json());
app.use(helmet());

// Rate limiting middleware
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 dakika
  max: 100 // 15 dakika içinde 100 istek
});
app.use(apiLimiter);

// Route'lar
app.use('/categories', categoryRoutes);
app.use('/products', productRoutes);
app.use('/users', userRoutes);
app.use('/orders', orderRoutes);
app.use('/auth', authRoutes);
app.use('/', cleanupRoutes); // Cleanup routes

// Korunan route örneği
app.get('/protected', authMiddleware, (req, res) => {
  res.send('This is a protected route.');
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});