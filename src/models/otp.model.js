const mongoose = require('mongoose')

const otpSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true
    },
    expiresAt: {
        type: Date,
        required: true
    },
    code: {
        type: string,
        required: true,
    },
    used:{
        type: Boolean,
        default: false
    }
},{timestamps: true})

module.exports = mongoose.model("Otp",otpSchema)