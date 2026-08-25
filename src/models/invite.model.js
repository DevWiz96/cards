const mongoose = require('mongoose')
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

module.exports = mongoose.model('Invite', inviteSchema);