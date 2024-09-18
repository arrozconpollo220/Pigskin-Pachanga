const { Profile, Player, Team, League } = require('../models');

const resolvers = {
    Query: {
        // View all entries
        profiles: async () => {
            return Profile.find().populate('teams');
        },

        players: async () => {
            return Player.find();
        },

        teams: async () => {
            return Team.find().populate('players');
        },

        leagues: async () => {
            return League.find().populate('teams');
        },

        // View single entries
        profile: async(parent, { profileId }) => {
            return Profile.findOne({ _id: profileId }).populate('teams');
        },
        player: async(parent, { playerId }) => {
            return Player.findOne({ _id: playerId });
        },
        team: async(parent, { teamId }) => {
            return Team.findOne({ _id: teamId }).populate('players');
        },
        league: async(parent, { leagueId }) => {
            return League.findOne({ _id: leagueId }).populate('teams');
        },
    },

    Mutation: {
        // Creating new items
        addNewTeam: async (parent, { name }) => {
            return Team.create({name});
        },
        addNewLeague: async (parent, { name, commissioner }) => {
            return League.create({name, commissioner});
        },

        // Updating existing items
        addPlayerToTeam: async (parent, { teamId, playerId }) => {
            return Team.findOneAndUpdate(
                { _id: teamId},
                {
                    $addToSet: { players: playerId }
                },
                {
                    new: true,
                    runValidators: true,
                }
            ).populate('players');
        },
        removePlayerFromTeam: async (parent, { teamId, playerId }) => {
            return Team.findOneAndUpdate(
                { _id: teamId},
                {
                    $pull: { players: playerId }
                },
                {
                    new: true,
                    runValidators: true,
                }
            ).populate('players');
        },
        addTeamToLeague: async (parent, { leagueId, teamId }) => {
            return League.findOneAndUpdate(
                { _id: leagueId},
                {
                    $addToSet: { teams: teamId }
                },
                {
                    new: true,
                    runValidators: true,
                }
            ).populate('teams');
        },
        removeTeamFromLeague: async (parent, { leagueId, teamId }) => {
            return League.findOneAndUpdate(
                { _id: leagueId},
                {
                    $pull: { teams: teamId }
                },
                {
                    new: true,
                    runValidators: true,
                }
            ).populate('teams');
        },
        updateTeam: async (parent, { teamId, teamName }) => {
            return Team.findOneAndUpdate(
                { _id: teamId},
                {
                    $set: { name: teamName }
                },
                {
                    new: true,
                    runValidators: true,
                }
            ).populate('players');
        },
        updateLeague: async (parent, { leagueId, leagueName, leagueComm }) => {
            return League.findOneAndUpdate(
                { _id: leagueId},
                {
                    $set: { 
                        name: leagueName,
                        commissioner: leagueComm,
                    }
                },
                {
                    new: true,
                    runValidators: true,
                }
            ).populate('teams');
        },

        // Deleting existing items
        removeTeam: async (parent,  { teamId }) => {
            return Team.findOneAndDelete({ _id: teamId });
        },
        removeLeague: async (parent,  { leagueId }) => {
            return League.findOneAndDelete({ _id: leagueId }).populate('teams');
        },
    }
};

module.exports = resolvers;