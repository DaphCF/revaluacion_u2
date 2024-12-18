const { gql } = require('apollo-server');

const typeDefs = gql`
    input RoomInput {
        _id: ID!
    }

    input CustomerInput {
        _id: ID!
    }

    type Room {
        _id: ID!
        name: String!
        type: Type!
        pricePerNight: Int!
        features: [String]
        availability: Boolean!
    }

    type Customer {
        _id: ID!
        name: String!
        email: String!
        phone: String!
    }

    enum Status {
        pending
        confirmed
        cancelled
    }

    type Booking {
        _id: ID!
        customer: Customer!
        room: Room!
        startDate: String!
        endDate: String!
        nights: Float!
        totalPrice: Float!
        status: Status!
    }
    
    type Query {
        bookings: [Booking]!
    }

    type Mutation {
        createBooking(
            customer: CustomerInput!
            room: RoomInput!
            startDate: String!
            endDate: String!
        ): Booking!
        updateBooking(
            _id: ID!,
            status: Status!
        ): Booking!
        deleteBooking(_id: ID!): Booking!
    }
`;

module.exports = typeDefs;