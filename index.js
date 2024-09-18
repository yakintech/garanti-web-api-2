const express = require('express');
const connectDB = require('./config/db');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');
const cleanupRoutes = require('./routes/cleanupRoutes');
const addTestData = require('./seed');

const app = express();
const port = 3000;

connectDB().then(() => {
  addTestData();
});

app.use(express.json());

app.use('/categories', categoryRoutes);
app.use('/products', productRoutes);
app.use('/', cleanupRoutes); // Cleanup routes

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});