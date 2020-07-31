const mongoose = require('mongoose');

let orderServicesSchema = new mongoose.Schema({
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "orders",
    },
    servicetype: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "services.types",
    },
    service: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "services"
    },
    price: {
        type: Number,
        require: true
    },
    quantity: {
        type: Number,
        require: true
    },
    recurringDay: {
        type: String
    },
    scheduleDate: {
        type: Date,
    },
    scheduleTime: {
        type: Date,
    },
    timestamp: Date
})

module.exports = mongoose.model('orders.services', orderServicesSchema)