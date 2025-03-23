const express = require('express');
const cors = require('cors');
const bookRoutes = require('./routes/bookRoutes'); // Add this line

// Initialize express
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Mount routes
app.use('/api/v1/books', bookRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Book Collection API' });
});

// Handle 404 errors
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

module.exports = app;