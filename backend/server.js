const express = require('express');
const mongoose = require('mongoose');
const { Pool } = require('pg');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config();

// MongoDB connection
const mongoURI = process.env.MONGODB_URI;
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// PostgreSQL connection
const pgPool = new Pool({
    connectionString: process.env.POSTGRES_URI,
});

pgPool.connect()
    .then(() => console.log('PostgreSQL connected'))
    .catch(err => console.error('PostgreSQL connection error:', err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});