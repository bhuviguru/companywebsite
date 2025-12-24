const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/vyphera';

mongoose
    .connect(MONGODB_URI)
    .then(() => {
        console.log('✓ Connected to MongoDB');
    })
    .catch((error) => {
        console.error('✗ MongoDB connection error:', error);
    });

// Routes
const contactRoutes = require('./routes/contact');
app.use('/api/contact', contactRoutes);
app.use('/api/test-email', require('./routes/test-email'));

// Health Check Endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'Vyphera Groups R&D API is running',
        timestamp: new Date().toISOString(),
    });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined,
    });
});

// 404 Handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found',
    });
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    console.log(`  🚀 Vyphera Groups R&D API Server`);
    console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    console.log(`  ➜ Local:    http://localhost:${PORT}`);
    console.log(`  ➜ Health:   http://localhost:${PORT}/api/health`);
    console.log(`  ➜ Time:     ${new Date().toLocaleString()}`);
    console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);
});

module.exports = app;
