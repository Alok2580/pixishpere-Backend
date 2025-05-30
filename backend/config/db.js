const mongoose = require('mongoose');
const { Pool } = require('pg');

const mongoURI = process.env.MONGO_URI;
const pgConfig = {
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
};

const connectMongoDB = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

const connectPostgreSQL = async () => {
    const pool = new Pool(pgConfig);
    try {
        await pool.connect();
        console.log('PostgreSQL connected successfully');
    } catch (error) {
        console.error('PostgreSQL connection error:', error);
        process.exit(1);
    }
    return pool;
};

const connectDB = async () => {
    await connectMongoDB();
    const pgPool = await connectPostgreSQL();
    return pgPool;
};

module.exports = connectDB;