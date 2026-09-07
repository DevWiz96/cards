const express = require('express')
const router = express.Router()

const authRoutes = require('./authRoutes')
const projectRoutes = require('./projectRoutes')
const columnRoutes = require('./columnRoute')
const cardRoutes = require('./cardRoutes')
const { myInviteRoutes } = require('./inviteRoutes')

router.use('/auth', authRoutes)
router.use('/projects', projectRoutes)
router.use('/columns', columnRoutes)
router.use('/cards',cardRoutes)
router.use('/invites', myInviteRoutes)

module.exports = router