const User = require('../models/user.model')
const otpService = require('../services/otpService')
const emailService = require('../services/emailService')
const generateToken = require('../util/generateToken')
const asyncHandler = require('../util/asyncHandler')
const AppError = require('../util/appError')
exports.requestOtp = asyncHandler( async (req, res) => {
    const { email } = req.body //Payload
    const user = await User.findOne({ email })
    if (!user) {
        await User.create({ email })
    }
    const code = await otpService.createOtp(email)
    //Email to customer
    await emailService.sendEmail(email, code)
    res.json({ success: true, message: "Email sent succesfully" })
})
exports.verifyOtp = asyncHandler (async (req, res) => {
        const { email, code } = req.body
        if (!email || !code)
            return res.status(400).json({ message: "Email & code requried verified" })
         await otpService.verifyOtp(email, code)
         const user = await User.findOne({email})
         if(!user.isVerified)
         {
            user.isVerified = true
            await user.save()
         }
         const token = generateToken(user.id) //user._id
         res.cookie('token',token,{
            maxAge: 7*24*60*60*1000, //7 days,
            httpOnly: true,
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production'
         })
         res.json({user:{email:user.email, name: user.name, isVerified: user.isVerified}})
})
exports.me = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.userId)
    if(!user)
        throw new AppError("No user found",401)
    res.json({ id: user.id, email: user.email, name: user.name, createdAt: user.createdAt })
}) 
