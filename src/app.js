const express = require('express')
const app = express()
//Routes
const authRoutes = require('./routes/authRoutes')
app.use(express.json())

app.use('/auth',authRoutes)


module.exports = app

//localhost/auth/request-otp