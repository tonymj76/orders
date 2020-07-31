const mongoose = require('mongoose');
require("../database/db");


let serviceSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('services', serviceSchema)