const mongoose = require('mongoose');
require('dotenv').config();

const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to database');
    } catch (err) {
        console.error('Error:', err);
    }
};

module.exports = { connectToDatabase, mongoose };
