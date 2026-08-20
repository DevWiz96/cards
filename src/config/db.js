const mongoose = require('mongoose')
const URL = "SDSDSd"
const connectDB = async()=>{
    try
    {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("MongoDB connection succesfull")
    }
    catch(err)
    {
        console.error(err.message)
        exit(1)
    }
}
module.exports = connectDB