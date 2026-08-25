const asyncHandler = require('../util/asyncHandler');
const AppError = require('../util/appError');
const inviteService = require('../services/inviteService');

exports.sendInvite = asyncHandler(async (req, res) => {
  const { id: projectId } = req.params;
  const { email } = req.body;
  if (!email) throw new AppError('Email is required', 400);

  const invite = await inviteService.sendInvite(projectId, email, req.userId);
  res.status(201).json({ invite });
});