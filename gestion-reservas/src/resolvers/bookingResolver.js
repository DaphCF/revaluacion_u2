const bookingService = require('../services/bookingService');

const resolvers = {
    Query: {
        bookings: async () => {
            try {
                return await bookingService.getAllBookings();
            } catch (error) {
                throw new Error(`Error obteniendo reservas: ${error.message}`);
            }
        },
    },
    Mutation: {
        createBooking: async (_, args) => {
            try {
                const { customer, room, startDate, endDate } = args;
                const bookingData = {
                    customer: customer._id, // Usar el ID del input
                    room: room._id,       // Usar el ID del input
                    startDate,
                    endDate,
                };
                return await bookingService.createBooking(bookingData);
            } catch (error) {
                throw new Error(`Error al crear la reserva: ${error.message}`);
            }
        },
        updateBooking: async (_, args) => {
            try {
                const { _id, status } = args;
                return await bookingService.updateBooking(_id, status);
            } catch (error) {
                throw new Error(`Error al actualizar la reserva: ${error.message}`);
            }
        },
        deleteBooking: async (_, { _id }) => {
            try {
                return await bookingService.deleteBooking(_id);
            } catch (error) {
                throw new Error(`Error al eliminar la reserva: ${error.message}`);
            }
        },
    },
};

module.exports = resolvers;