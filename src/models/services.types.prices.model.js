const mongoose = require('mongoose');
require("../database/db");


let servicePriceSchema = new mongoose.Schema({
    service: {
        type:mongoose.Schema.Types.ObjectId,
        ref: "services"
    },
    servicetype: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "services.types"
    },
    price: {
        type: Number,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})


module.exports = mongoose.model('services.prices', servicePriceSchema)