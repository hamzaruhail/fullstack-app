const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5100;

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Successfully connected to DB'))
.catch(() => console.error('Error occurred'));

app.get('/', (req, res) => {
  res.send('Hi! I am Ruhail from node.js');
});

app.listen(PORT, () => {
  console.log(`Backend is running at ${PORT}`);
});
