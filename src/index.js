const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// MongoDB bağlantı URI'si
const mongoURI = 'mongodb+srv://user_garanti:F5Ca7TIzzTxZLV9w@cluster0.jcus0vv.mongodb.net/catchme-db';

// MongoDB'ye bağlanma
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});