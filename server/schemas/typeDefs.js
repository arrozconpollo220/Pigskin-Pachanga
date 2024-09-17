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

    type Query {
        profiles: [Profile]!
        players: [Player]!
    }

    type Mutation {
    
    }
`;

module.exports = typeDefs;