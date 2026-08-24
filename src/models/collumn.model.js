const mongoose = require('mongoose')

const collumnSchema = new mongoose.Schema({
    projectId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Project',
        required: true,
    },
    name: {
        type: String,
        required: true,
        maxLength: 50,
    },
    position: {
        type: Number,
        required: true,
    }
},{timestamps: true})

module.exports = mongoose.model("Collumn", collumnSchema)