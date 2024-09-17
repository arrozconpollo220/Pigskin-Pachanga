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
    
    }
`;

module.exports = typeDefs;