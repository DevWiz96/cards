const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const inviteController = require('../controllers/inviteController');

router.post('/', authMiddleware, inviteController.sendInvite);

module.exports = router;