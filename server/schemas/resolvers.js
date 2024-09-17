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
        addNewTeam: async (parent, { name }) => {
            return Team.create({name});
        },
        addNewLeague: async (parent, { name, commissioner }) => {
            return League.create({name, commissioner});
        },
    }
};

module.exports = resolvers;