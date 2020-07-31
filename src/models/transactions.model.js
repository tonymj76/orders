const mongoose = require('mongoose');
require("../database/db");


let transactions = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },
    ref: {
        type: String,
        require: true
    },
    status: {
        type: Number,
        require: true,
        default: 1,
    },
    type: {
        type: String, //sub or one-off
        require: true
    },
    typeId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User"
    },
    amount: {
        type: Number,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('transactions', transactions);