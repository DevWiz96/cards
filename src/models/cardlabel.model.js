const mongoose = require('mongoose')
const idPlugin = require('../plugins/idPlugin')

//Join tabel
const cardLabelSchema = new mongoose.Schema({
    cardId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Card',
        required: true
    },
    labelId:{
       type: mongoose.Schema.Types.ObjectId,
       ref: 'Label',
       required: true
    }
})
cardLabelSchema.plugin(idPlugin)
module.exports = mongoose.model("CardLabel",cardLabelSchema)