module.exports = (err,req,res,next)=>{
    const statusCode = err.statusCode || 500
    const errorCode = err.errorCode || 'Undefined'
    const message = err.message
    res.status(statusCode).json({message: message, errorCode: errorCode}) // Custom code passed aswell
}