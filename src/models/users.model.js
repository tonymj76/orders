const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require("../database/db");

let userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        unique: true,
        require: true
    },
    password: {
        type:String,
        require:true
    },
    phone: {
        type: Number,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

userSchema.set('toObject', {virtuals:true})
userSchema.set('toJSON', {virtuals:true})

userSchema.virtual('subscription', {
    ref:'user.subscriptions',
    localField: '_id',
    foreignField: 'user'
})

userSchema.methods.generateHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

userSchema.methods.validPassword = function(password, hash){
    return bcrypt.compareSync(password, hash)
}


module.exports = mongoose.model('users', userSchema)