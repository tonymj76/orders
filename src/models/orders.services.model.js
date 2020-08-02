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
    status: {
        type: Number, //0 - pending, 1 - ongoing , 2 - delivered
        default: 0
    }
})

module.exports = mongoose.model('orders.services', orderServicesSchema)