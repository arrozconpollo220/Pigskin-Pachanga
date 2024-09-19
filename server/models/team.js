const { Schema, model } = require('mongoose');

const teamSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'Profile',
        required: true,
    },
    players: {
        type: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Player',
            },
        ],
        validate: {
            validator: function (players) {
                return players.length <= 15;
            },
            message: 'A team cannot have more than 15 players.',
        },
    },
});

const Team = model('Team', teamSchema);

module.exports = Team;

