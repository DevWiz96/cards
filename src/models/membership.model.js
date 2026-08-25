const mongoose = require('mongoose')
const MEMBERSHIP_ROLES = ['owner','member']
const membershipSchema = new mongoose.Schema({
    projectId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Project',
        required:true
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    role: {
        type: String,
        enum:MEMBERSHIP_ROLES,
        required: true
    }
},{timestamps: true})

module.exports = mongoose.model("Membership",membershipSchema)