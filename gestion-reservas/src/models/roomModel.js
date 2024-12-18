const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, enum: ['single', 'double', 'suite'], required: true },
    pricePerNight: { type: Number, required: true },
    features: [String],
    availability: { type: Boolean, default: true }
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;