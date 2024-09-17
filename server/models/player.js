const { Schema, model } = require('mongoose');

const playerSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
});

const Player = model('Player', playerSchema);

module.exports = Player;