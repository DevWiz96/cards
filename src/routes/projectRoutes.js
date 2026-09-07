const express = require('express')
const authMiddleware = require('../middlewares/auth')
const projectController = require('../controllers/projectController')
const columnController = require('../controllers/columnController')
const { projectInviteRoutes } = require('./inviteRoutes')

const router = express.Router()

router.post('/',authMiddleware, projectController.createProject)
router.get('/',authMiddleware, projectController.getProjects)

router.post('/:id/columns',authMiddleware,columnController.addColumn) // /v1/prj-226/column - POST

router.get('/:id/board',authMiddleware, projectController.getBoard)

router.get('/:id/members',authMiddleware, projectController.getMembers)

router.use('/:id/invites', projectInviteRoutes);
module.exports = router

//Route-> controller->function
//Router-> middleware(function) | Authentication-> controller->function 