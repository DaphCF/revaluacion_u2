const roomService = require('../services/roomService');

const resolvers = {
    Query: {
        rooms: async () => await roomService.getAllRooms(),
    },
    Mutation: {
        createRoom: async (_, args) => await roomService.createRoom(args),
    }
};

module.exports = resolvers;