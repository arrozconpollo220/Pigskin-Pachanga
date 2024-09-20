const { Profile, Player, Team, League } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        // View all entries
        profiles: async () => {
            return await Profile.find().populate('teams');
        },

        players: async () => {
            return await Player.find();
        },

        teams: async () => {
            return await Team.find().populate('players').populate({
                path: 'owner',
                select: 'name email'
            });
        },

        leagues: async () => {
            return await League.find().populate('teams');
        },

        // View single entries
        profile: async (parent, { profileId }) => {
            return await Profile.findOne({ _id: profileId }).populate('teams');
        },
        player: async (parent, { playerId }) => {
            return await Player.findOne({ _id: playerId });
        },
        team: async (parent, { teamId }) => {
            return await Team.findOne({ _id: teamId }).populate('players');
        },
        league: async (parent, { leagueId }) => {
            return await League.findOne({ _id: leagueId }).populate('teams');
        },
    },

    Mutation: {
        // JWT items
        addProfile: async (parent, { name, email, password }) => {
            const profile = await Profile.create({ name, email, password });
            const token = signToken(profile);

            return { token, profile };
        },
        login: async (parent, { email, password }) => {
            const profile = await Profile.findOne({ email });

            if (!profile) {
                throw AuthenticationError
            }

            const correctPw = await profile.isCorrectPassword(password);

            if (!correctPw) {
                throw AuthenticationError
            }

            const token = signToken(profile);
            return { token, profile };
        },

        // Creating new items
        createNewTeamInLeague: async (parent, { leagueId, teamName }, context) => {
            // Requires user to be logged in to add a new team
            if (!context.user) {
                throw AuthenticationError;
            }

            try {
                const newTeam = await Team.create({
                    name: teamName,
                    owner: context.user._id
                });

                const updatedLeague = await League.findOneAndUpdate(
                    { _id: leagueId },
                    {
                        $addToSet: { teams: newTeam._id }
                    },
                    {
                        new: true,
                        runValidators: true,
                    }
                ).populate({
                    path: 'teams',
                    populate: {
                        path: 'owner',
                        select: 'name email'
                    }
                });

                return updatedLeague;
            } catch (error) {
                throw new Error(`Failed to create the ${teamName} team within this league: ${error.message}`);
            }
        },
        addNewLeague: async (parent, { name, commissioner }) => {
            return await League.create({ name, commissioner });
        },

        // Updating existing items
        addPlayerToTeam: async (parent, { teamId, playerId }, context) => {
            try {
                // Requires user to be logged in to add a player to the team
                if (!context.user) {
                    throw AuthenticationError;
                }
                // Requires user to be the owner of the team to add players
                const team = await Team.findById(teamId);
                if (team.owner.toString() !== context.user._id.toString()) {
                    throw AuthenticationError;
                }
                // Ensures the team is assigned to a league
                const league = await League.findOne({ teams: teamId }).populate('teams');
                if (!league) {
                    throw new Error('This team is not assigned to a league and cannot recruit players!');
                }
                // Checks if the player is already assigned to a team within the league
                const playerExists = league.teams.some(team => team.players.includes(playerId));
                if (playerExists) {
                    throw new Error('This player is already assigned to a team within this league!');
                }

                return Team.findOneAndUpdate(
                    { _id: teamId },
                    {
                        $addToSet: { players: playerId }
                    },
                    {
                        new: true,
                        runValidators: true,
                    }
                ).populate({
                    path: 'players',
                    select: 'name nflTeam playerId pos'
                }).populate({
                    path: 'owner',
                    select: 'name email'
                });
            } catch (error) {
                throw new Error(error.message);
            }
        },
        removePlayerFromTeam: async (parent, { teamId, playerId }) => {
            try {
                return Team.findOneAndUpdate(
                    { _id: teamId },
                    {
                        $pull: { players: playerId }
                    },
                    {
                        new: true,
                        runValidators: true,
                    }
                ).populate('players');
            } catch (error) {
                throw new Error(error.message);
            }
        },
        addTeamToLeague: async (parent, { leagueId, teamId }) => {
            try {
                return League.findOneAndUpdate(
                    { _id: leagueId },
                    {
                        $addToSet: { teams: teamId }
                    },
                    {
                        new: true,
                        runValidators: true,
                    }
                ).populate('teams');
            } catch (error) {
                throw new Error(error.message);
            }
        },
        removeTeamFromLeague: async (parent, { leagueId, teamId }) => {
            try {
                return League.findOneAndUpdate(
                    { _id: leagueId },
                    {
                        $pull: { teams: teamId }
                    },
                    {
                        new: true,
                        runValidators: true,
                    }
                ).populate('teams');
            } catch (error) {
                throw new Error(error.message);
            }
        },
        updateTeam: async (parent, { teamId, teamName }) => {
            try {
                return Team.findOneAndUpdate(
                    { _id: teamId },
                    {
                        $set: { name: teamName }
                    },
                    {
                        new: true,
                        runValidators: true,
                    }
                ).populate('players');
            } catch (error) {
                throw new Error(error.message);
            }
        },
        updateLeague: async (parent, { leagueId, leagueName, leagueComm }) => {
            try {
                return League.findOneAndUpdate(
                    { _id: leagueId },
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
            } catch (error) {
                throw new Error(error.message);
            }
        },

        // Deleting existing items
        removeTeam: async (parent, { teamId }) => {
            try {
                return await Team.findOneAndDelete({ _id: teamId });
            } catch (error) {
                throw new Error(error.message);
            }
        },
        removeLeague: async (parent, { leagueId }) => {
            try {
                return await League.findOneAndDelete({ _id: leagueId }).populate('teams');
            } catch (error) {
                throw new Error(error.message);
            }
        },
    }
};

module.exports = resolvers;