const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    customer: { type: mongoose.Types.ObjectId, ref: 'Customer', required: true},
    room: { type: mongoose.Types.ObjectId, ref: 'Room', required: true},
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true},
    nights: { type: Number, default:0 },
    totalPrice: { type: Number, default: 0 },
    status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' }
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;