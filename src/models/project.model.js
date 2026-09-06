const mongoose = require('mongoose')
const idPlugin = require('../plugins/idPlugin')

const projectSchema = new mongoose.Schema({
    name :{
        type: String,
        required: true
    },
    description:{
        type: String,
    },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true 
    }
},{timestamps: true})
projectSchema.plugin(idPlugin)

module.exports = mongoose.model("Project", projectSchema)