const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const errorHandler = require('./util/errorHandler')
const app = express()
//Routes
const apiRoutes = require('./routes/index')
const allowedOrigins = (process.env.CLIENT_URL || 'http://localhost:5173').split(',')
app.use(cors({ origin: allowedOrigins, credentials: true }))
app.use(express.json())
app.use(cookieParser())

app.use('/v1',apiRoutes)

//IMPORTANT
app.use(errorHandler) //Error handling has to be at the very end


module.exports = app

//localhost/auth/request-otp