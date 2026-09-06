const mongoose = require('mongoose')
const idPlugin = require('../plugins/idPlugin')

const columnSchema = new mongoose.Schema({
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
columnSchema.plugin(idPlugin)

module.exports = mongoose.model("Column", columnSchema)