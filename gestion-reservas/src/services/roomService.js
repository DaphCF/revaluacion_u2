const Room = require('../models/roomModel');

module.exports = {
    getAllRooms: async () => {
        return await Room.find();
    },
    createRoom: async (args) => {
        const { name, type, pricePerNight, features } = args;
        const room = new Room({name, type, pricePerNight, features});
        return await room.save();
    }
};