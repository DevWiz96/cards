const express = require('express')
const router = express.Router()

const authRoutes = require('./authRoutes')
const projectRoutes = require('./projectRoutes')
const columnRoutes = require('./columnRoute')
const cardRoutes = require('./cardRoutes')

router.use('/auth', authRoutes)
router.use('/projects', projectRoutes)
router.use('/columns', columnRoutes)
router.use('/cards',cardRoutes)

module.exports = router