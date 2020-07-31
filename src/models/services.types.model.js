const mongoose = require('mongoose');
require("../database/db");


let serviceTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    service: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "services"
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

serviceTypeSchema.set('toJSON', { virtuals: true })
serviceTypeSchema.set('toObject', { virtuals: true })

serviceTypeSchema.virtual('price', {
    ref: 'services.prices',
    localField: "_id",
    foreignField: "servicetype"
})


module.exports = mongoose.model('services.types', serviceTypeSchema)