const mongoose = require('mongoose');
require("../database/db");


let subscriptionDetailsSchema = new mongoose.Schema({
    subscription: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "subscription",
        require: true
    },
    feature: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "services",
        require: true,
    },      
    value: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})


module.exports = mongoose.model('subscription.details', subscriptionDetailsSchema);