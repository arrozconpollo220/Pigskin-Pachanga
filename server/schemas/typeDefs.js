const typeDefs = `
    type Profile {
        _id: ID
        name: String
        email: String
        password: String
        teams: [Team]
    }
    
    type Auth {
        token: ID!
        profile: Profile
    }
    
    type Player {
        _id: ID
        name: String
        playerId: String
        pos: String
        nflTeam: String
    }

    type Team {
        _id: ID
        name: String!
        owner: Profile!
        players: [Player]
    }

    type League {
        _id: ID
        name: String
        commissioner: String
        teams: [Team]
    }

    type Query {
        profiles: [Profile]!
        players: [Player]!
        teams: [Team]!
        leagues: [League]!

        teamsByOwner(ownerId: ID!): [Team]

        profile(profileId: ID!): Profile
        me: Profile
        
        player(playerId: ID!): Player
        team(teamId: ID!): Team
        league(leagueId: ID!): League
    }

    type Mutation {
        addProfile(name: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth

        createNewTeamInLeague(leagueId: ID!, teamName: String!): League
        addNewLeague(name: String!, commissioner: String!): League

        addPlayerToTeam (teamId: ID!, playerId: ID! ): Team
        removePlayerFromTeam (teamId: ID!, playerId: ID!): Team
        addTeamToLeague (leagueId: ID!, teamId: ID!): League
        removeTeamFromLeague (leagueId: ID!, teamId: ID!): League
        updateTeam (teamId: ID!, teamName: String!): Team
        updateLeague (leagueId: ID!, leagueName: String!, leagueComm: String!): League

        removeTeam(teamId: ID!): Team
        removeLeague(leagueId: ID!): League
    }
`;

module.exports = typeDefs;