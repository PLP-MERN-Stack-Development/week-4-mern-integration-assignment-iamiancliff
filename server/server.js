// Description: Main server file for the Blog API
// This file sets up the Express server, connects to MongoDB, and defines routes for the blog API.
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const postRoutes = require('./routes/posts');
const errorHandler = require('./middleware/errorHandler');
const categoryRoutes = require('./routes/categories');


// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware
app.use(cors()); // Allows frontend (e.g., React on localhost:5173) to access API
app.use(express.json()); // Parses JSON request bodies

// Connect to MongoDB
connectDB();

// Routes
app.get('/', (req, res) => res.json({ message: 'Welcome to the Blog API' }));
app.use('/api/posts', postRoutes);
app.use('/api/categories', categoryRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server Error', error: process.env.NODE_ENV === 'development' ? err.message : {} });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));