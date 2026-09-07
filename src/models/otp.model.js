const mongoose = require('mongoose')
const idPlugin = require('../plugins/idPlugin')

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
        type: String,
        required: true,
    },
    used:{
        type: Boolean,
        default: false
    }
},{timestamps: true})
otpSchema.plugin(idPlugin)

module.exports = mongoose.model("Otp",otpSchema)