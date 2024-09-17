const { Schema, model } = require('mongoose');

const leagueSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    commissioner: {
        type: String,
        required: true,
        trim: true,
    },
    teams: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Team',
        },
    ],
});

const League = model('League', leagueSchema);

module.exports = League;