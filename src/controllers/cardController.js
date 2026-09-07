// src/controllers/cardController.js
const asyncHandler = require('../util/asyncHandler')
const AppError = require('../util/appError')
const cardService = require('../services/cardService');

exports.createCard = asyncHandler(async (req, res) => {
  const { columnId, title, description, priority, dueDate, assigneeId,assignedBy,labelIds } = req.body;

  if (!columnId) throw new AppError('columnId is required', 400);
  if (!title) throw new AppError('title is required', 400);
  if (!priority) throw new AppError('priority is required', 400);

  const card = await cardService.createCard(
   columnId, title, description, req.userId,assignedBy, assigneeId, dueDate, priority, labelIds
  );

  res.status(201).json({ card });
});

exports.moveCard = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { targetColumnId } = req.body;

  if (!targetColumnId) throw new AppError('targetColumnId is required', 400);

  const card = await cardService.moveCard(id, targetColumnId);
  res.json({ card });
});

exports.deleteCard = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const card = await cardService.deleteCard(id);
  res.json({ success:true });
});

exports.editCard = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, description, priority, dueDate, assigneeId, labelIds } = req.body;

  const card = await cardService.editCard(id, req.userId, { title, description, priority, dueDate, assigneeId, labelIds });

  res.json({ card });
});