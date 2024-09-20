const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://orian42:dwY4DVV2aNzqJcIs@cluster0.3wiy3.mongodb.net/');

module.exports = mongoose.connection;
