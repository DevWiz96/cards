const mongoose = require('mongoose')
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
module.exports = mongoose.model("CardLabel",cardLabelSchema)