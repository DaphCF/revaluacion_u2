const Booking = require('../models/bookingModel');
const Room = require('../models/roomModel');

module.exports = {
    getAllBookings: async () => {
        return await Booking.find().populate('customer').populate('room');
    },
    createBooking: async ({ customer, room, startDate, endDate }) => {
        console.log('createBooking', customer, room, startDate, endDate);
        const start = new Date(startDate);
        const end = new Date(endDate);
        const today = new Date();
        if (start < today) {
            throw new Error('La fecha de inicio debe ser igual o posterior a la fecha actual');
        }
        if (start >= end) {
            throw new Error('La fecha de inicio debe ser anterior a la fecha de fin');
        }

        const roomAvailability = await Booking.find({
            room,
            $or: [
                { startDate: { $lte: end }, endDate: { $gte: start } },
            ],
        });
        if (roomAvailability.lenght > 0) {
            throw new Error('La habitación no está disponible en las fechas seleccionadas');
        }

        const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
        const roomDetails = await Room.findById(room);

        if (!roomDetails || !roomDetails.availability) {
            throw new Error('La habitación no se encuentra disponible');
        }

        let totalPrice = roomDetails.pricePerNight * nights;

        if (nights > 7) {
            totalPrice *= 0.9;
        }

        roomDetails.availability = false;
        await roomDetails.save();

        const booking = new Booking({ customer, room, startDate, endDate, nights, totalPrice })
        return await booking.save();
    },
    updateBooking: async (_id, status) => {
        const booking = await Booking.findById(_id).populate('room');
        if (!booking) {
            throw new Error(`Booking with ID: ${_id} not found`);
        }
        console.log('status: ' + status);
        if (status === 'cancelled') {
            const room = await Room.findById(booking.room._id);
            if (room) {
                room.availability = true;
                await room.save();
            }
        }
        const updatedBooking = await Booking.findByIdAndUpdate(_id, status, { new: true });
        return updatedBooking;
    },
    deleteBooking: async (_id) => {
        const booking = await Booking.findById(_id).populate('room');
        if (!booking) {
            throw new Error(`Booking with ID: ${_id} not found`);
        }
        const room = await Room.findById(booking.room._id);
        if (room) {
            room.availability = true;
            await room.save();
        }
        const deletedBooking = await Booking.findByIdAndDelete(_id);
        return deletedBooking;
    }
};