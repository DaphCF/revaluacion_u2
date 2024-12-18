const { gql } = require('apollo-server');

const typeDefs = gql`
    enum Type {
        single
        double
        suite
    }

    type Room {
        _id: ID!
        name: String!
        type: Type!
        pricePerNight: Int!
        features: [String]
        availability: Boolean!
    }
    
    type Query {
        rooms: [Room]!
    }

    type Mutation {
        createRoom(
            name: String!,
            type: Type!,
            pricePerNight: Int!,
            features: [String]
        ): Room!
    }
`;

module.exports = typeDefs;
