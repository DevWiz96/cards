const express = require('express')
const authMiddleware = require('../middlewares/auth')
const projectController = require('../controllers/projectController')
const router = express.Router()

router.post('/',authMiddleware, projectController.createProject)
router.get('/',authMiddleware, projectController.getProjects)

module.exports = router

//Route-> controller->function
//Router-> middleware(function) | Authentication-> controller->function 