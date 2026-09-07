const mongoose = require('mongoose')
const idPlugin = require('../plugins/idPlugin')
const CARD_PRIORITY= ['LOW', 'MEDIUM', 'HIGH','URGENT']
const cardSchema = new mongoose.Schema({
    columnId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type : String, 
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    assignedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    assigneeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    dueDate: {
        type: Date,
    },
    priority:{
        type: String,
        enum :CARD_PRIORITY,
        required: true
    }
}, {timestamps: true})
cardSchema.plugin(idPlugin)
module.exports = mongoose.model("Card", cardSchema)

