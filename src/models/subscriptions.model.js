const mongoose = require('mongoose');
require("./subscriptions.details.model")
require("../database/db");



let subscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    interval: {
        type: String, //monthly, yearly, weekly etc
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    description: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

subscriptionSchema.set('toObject', {virtuals: true})
subscriptionSchema.set('toJSON', {virtuals: true})

subscriptionSchema.virtual('details', {
    ref: "subscription.details",
    localField: '_id',
    foreignField: 'subscription'
})




module.exports = mongoose.model('subscriptions', subscriptionSchema)