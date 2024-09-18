const db = require('../config/connection');
const { Profile, Player, Team, League } = require('../models');
const playerSeeds = require('./playerSeeds');
const teamSeeds = require('./teamSeeds');
const leagueSeeds = require('./leagueSeeds');
const profileSeeds = require('./profileSeeds');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
    try {
      await cleanDB('Player', 'players');
      await cleanDB('Team', 'teams');
      await cleanDB('League', 'leagues');
      await cleanDB('Profile', 'profiles');

      await Player.create(playerSeeds);
      await Team.create(teamSeeds);
      await League.create(leagueSeeds);
      await Profile.create(profileSeeds);
  
      console.log('all done!');
      process.exit(0);
    } catch (err) {
      throw err;
    }
  });