const User = require('../models/user.model')
const otpService = require('../services/otpService')
const emailService = require('../services/emailService')
exports.requestOtp = async (req,res)=>{
    const {email} = req.body //Payload
    const user = await User.findOne({email})
    if(!user)
    {
        await User.create({email})
    }
    const code = await otpService.createOtp(email)
    //Email to customer
    await emailService.sendEmail(email,code)
    res.json({success: true, message:"Email sent succesfully"})
}
