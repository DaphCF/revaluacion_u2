const customerService = require('../services/customerService');

const resolvers = {
    Query: {
        customers: async () => await customerService.getAllCustomers(),
    },
    Mutation: {
        createCustomer: async (_, args) => await customerService.createCustomer(args),
    }
};

module.exports = resolvers;