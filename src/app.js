const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const app = express()
//Routes
const apiRoutes = require('./routes/index')
app.use(cors()) // Every request is allowed If you want request to be from a specific URL orgin: localhost:5000
app.use(express.json())
app.use(cookieParser())

app.use('/v1',apiRoutes)


module.exports = app

//localhost/auth/request-otp