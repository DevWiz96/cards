require('dotenv').config()
const app = require('./src/app')
const connectDB = require('./src/config/db')


const PORT = process.env.PORT

connectDB().then(()=>{
app.listen(PORT, ()=> console.log("Server is running on port 3000"))
})

