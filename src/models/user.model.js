const mongoose = require('mongoose')
const idPlugin = require('../plugins/idPlugin')

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true,
        maxLength: 100,
    },
    name:{
        type: String,
        maxLength: 100,
    },
    isVerified:{
        type: Boolean,
        default: false
    }
},{timestamps: true})
userSchema.plugin(idPlugin)

module.exports = mongoose.model("User", userSchema)