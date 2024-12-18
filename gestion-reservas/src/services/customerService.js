const Customer = require('../models/customerModel');

module.exports = {
    getAllCustomers: async () => {
        return await Customer.find();
    },
    createCustomer: async (args) => {
        const { name, email, phone } = args;
        const customer = new Customer({ name, email, phone });
        return await customer.save();
    }
};