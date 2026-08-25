const express = require('express')
const router = express.Router()
const columnController = require('../controllers/columnController')
const authMiddleware = require('../middlewares/auth')

router.patch('/:id',authMiddleware, columnController.renameColumn)

module.exports = router