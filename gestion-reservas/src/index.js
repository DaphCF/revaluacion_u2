const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const roomtypeDefs = require('./schemas/roomSchema.js');
const roomResolvers = require('./resolvers/roomResolver');
const customerDefs = require('./schemas/customerSchema');
const customerResolvers = require('./resolvers/customerResolver');
const bookingDefs = require('./schemas/bookingSchema');
const bookingResolvers = require('./resolvers/bookingResolver');

const typeDefs = [roomtypeDefs, customerDefs, bookingDefs];
const resolvers = [roomResolvers, customerResolvers, bookingResolvers];

const startServer = async () => {
  await mongoose.connect('mongodb+srv://daaicoronafl:commerce123@commerce.t4p4r.mongodb.net/?retryWrites=true&w=majority&appName=commerce');
  const server = new ApolloServer({ typeDefs, resolvers });
  server.listen().then(({ url }) => {
    console.log(`Servidor corriendo en ${url}`);
  });
};

startServer();