const express = require('express');
const authMiddleware = require('../middlewares/auth');
const inviteController = require('../controllers/inviteController');

// Mounted under a project — needs the parent's :id, hence mergeParams
const projectInviteRoutes = express.Router({ mergeParams: true });
projectInviteRoutes.post('/', authMiddleware, inviteController.sendInvite);

// Mounted at the top level — these span projects
const myInviteRoutes = express.Router();
myInviteRoutes.get('/mine', authMiddleware, inviteController.getMyInvites);
myInviteRoutes.post('/:inviteId/accept', authMiddleware, inviteController.acceptInvite);

module.exports = { projectInviteRoutes, myInviteRoutes };
