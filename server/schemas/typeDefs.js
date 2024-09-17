const typeDefs = `
    type Profile {
        _id: ID
        name: String
        teams: [String]
    }
    
    type Player {
        _id: ID
        name: String
        team: String
    }

    type Team {
        _id: ID
        name: String
        players: [String]
    }

    type League {
        _id: ID
        name: String
        commissioner: String
        teams: [String]
    }

    type Query {
        profiles: [Profile]!
        players: [Player]!
        teams: [Team]!
        leagues: [League]!
    }

    type Mutation {
        addNewTeam(name: String!): Team
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