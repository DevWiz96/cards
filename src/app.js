const express = require('express')
const app = express()
//Routes
const apiRoutes = require('./routes/index')
app.use(express.json())

app.use('/v1',apiRoutes)


module.exports = app

//localhost/auth/request-otp