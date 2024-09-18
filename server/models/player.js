const { Schema, model } = require('mongoose');

const playerSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    playerId: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    pos: {
        type: String,
        required: true,
        trim: true,
    },
    nflTeam: {
        type: String,
        required: true,
        trim: true,
    },
});

const Player = model('Player', playerSchema);

module.exports = Player;