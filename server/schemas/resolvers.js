const { Profile, Player } = require('../models');

const resolvers = {
    Query: {
        profiles: async () => {
            return Profile.find();
        },

        players: async () => {
            return Players.find();
        }
    },

    Mutation: {

    },
};

module.exports = resolvers;