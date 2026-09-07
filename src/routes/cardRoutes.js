const express = require('express')
const router = express.Router()
const authMiddleware = require('../middlewares/auth')
const cardController = require('../controllers/cardController')

router.post('/',authMiddleware, cardController.createCard)
router.patch('/:id/move', authMiddleware, cardController.moveCard)
router.delete('/:id',authMiddleware, cardController.deleteCard)
router.patch('/:id', authMiddleware, cardController.editCard)

module.exports = router