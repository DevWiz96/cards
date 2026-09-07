const mongoose = require('mongoose')
const idPlugin = require('../plugins/idPlugin')
const INVITE_STATUS = ['pending','accepted']
const inviteSchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
  },
  email: {
    type: String,
    required: true,
    maxlength: 254,
  },
  status: {
    type: String,
    enum: INVITE_STATUS,
    default: 'pending',
    required: true,
  },
}, { timestamps: true });
inviteSchema.plugin(idPlugin);

module.exports = mongoose.model('Invite', inviteSchema);