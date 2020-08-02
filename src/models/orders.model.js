const mongoose = require('mongoose');


let orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    subTotal: {
        type: Number,
        required: true
    },
    grandTotal: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: 'pending' //status  => pending , in progress,  completed
    },
    referenceId: {
        type: String,
    },
    scheduleDate: {
        type: Date,
    },
    address: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

orderSchema.set('toJSON', { virtuals: true })
orderSchema.set('toObject', { virtuals: true })



orderSchema.virtual('orderServices', {
    ref: "orders.services",
    localField: "_id",
    foreignField: "order"
})


module.exports = mongoose.model('orders', orderSchema)