const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const errorHandler = require('./util/errorHandler')
const app = express()
//Routes
const apiRoutes = require('./routes/index')
app.use(cors({ origin: 'http://localhost:5173', credentials: true }))
//app.use(cors()) // Every request is allowed If you want request to be from a specific URL orgin: localhost:5000
app.use(express.json())
app.use(cookieParser())

app.use('/v1',apiRoutes)

//IMPORTANT
app.use(errorHandler) //Error handling has to be at the very end


module.exports = app

//localhost/auth/request-otp