const mongoose = require('mongoose')

const labelSchema = new mongoose.Schema({
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    name: {
        type: String,
        required: true,
        maxLength: 30,
    },
    color: {
        type: String,
        required: true
    }
},{timestamps: true})
module.exports = mongoose.model("Label", labelSchema)