const mongoose = require('mongoose');
require("../database/db");


let userSubscriptions = new mongoose.Schema({
    subscription: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "subscriptions",
        require: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
        require: true
    },
    status: {
        type: Number,
        require: true,
        default: 1
    },
    startDate: {
        type: Date, 
        default: Date.now(),
        require: true
    },
    endDate: {
        type: Date,
        default: Date.now(),
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('user.subscriptions', userSubscriptions)