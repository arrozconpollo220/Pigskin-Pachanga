const mongoose = require('mongoose');
require('dotenv').config();

const db_username = process.env.DB_USER
const db_password = process.env.DB_PASSWORD

mongoose.connect(process.env.MONGODB_URI || `mongodb+srv://${db_username}:${db_password}@cluster0.3wiy3.mongodb.net/`);

module.exports = mongoose.connection;
