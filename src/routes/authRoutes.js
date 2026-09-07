const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const authMiddleware = require('../middlewares/auth')


router.post('/request-otp', authController.requestOtp)
router.post('/verify-otp', authController.verifyOtp)

router.get('/me',authMiddleware,authController.me)
router.post('/logout',authMiddleware,authController.logout)

module.exports = router