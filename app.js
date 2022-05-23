const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const postsRoutes = require('./routes/posts');

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use('/posts', postsRoutes);

// Database connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true }, () => {
  console.log('Database connected successfully!');
});

// Server connection
const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Server running on port ${PORT}`));
