const { Profile, Player, Team, League } = require('../models');

const resolvers = {
    Query: {
        profiles: async () => {
            return Profile.find();
        },

        players: async () => {
            return Player.find();
        },

        teams: async () => {
            return Team.find();
        },

        leagues: async () => {
            return League.find();
        },
    },

    Mutation: {

    },
};

module.exports = resolvers;