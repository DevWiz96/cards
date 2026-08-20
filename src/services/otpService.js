const Otp = require('../models/otp.model')

const OTP_EXPIRY_MINS = 2

//6 digit otp Algorithm
const generateOtp = ()=>{
    return Math.floor(100000 + Math.random() * 900000).toString()
}

exports.createOtp = async(email)=>{

   //Invalidate all the previous OTP 
  await Otp.updateMany(
    {email, used:false}, //condition
    {$set:{used:true}} // Set Operation for all the records
)
   const code = generateOtp()
   const expiresAt = new Date(Date.now() + OTP_EXPIRY_MINS *60*1000 )
   await Otp.create({email,code, expiresAt})
   return code
}

exports.verifyOtp = async(email, code)=>{
    const otpRecord = await Otp.findOne({email}).sort({createdAt:-1}) // The latest Otp
    // No record, Otp used, Expired, Code's dont match
    if(otpRecord === null || otpRecord.used === true)
        throw new Error("Invalid OTP")
    if(otpRecord.expiresAt < new Date())
        throw new Error("Otp Expired")
    if(otpRecord.code !== code)
        throw new Error("Invalid OTP")

    otpRecord.used = true
    await otpRecord.save()
    return true
}