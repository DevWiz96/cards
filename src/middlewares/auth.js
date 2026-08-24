const jwt = require('jsonwebtoken')

module.exports = (req,res,next)=>{

    const token = req.cookies.token
    if(!token)
        res.status(401).json({error:"No token was available"})

    try
    {
        const decoded = jwt.verify(token, process.env.JWT_SECRET) // Decoding the userID from the token
        req.userId = decoded.id// decoded.iat, decoded.expiry
        next()
    }
    catch(err)
    {
        res.status(401).json({message:"Unable to authenticate"})
    }
}