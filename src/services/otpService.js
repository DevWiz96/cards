const Otp = require('../models/otp.model')
const AppError = require('../util/appError')
const OTP_EXPIRY_MINS = 2

//6 digit otp Algorithm
const generateOtp = ()=>{
    return Math.floor(100000 + Math.random() * 900000).toString()
}

exports.createOtp = async(email)=>{

   //Rate limitting 
   const lastOtp = await Otp.findOne({email}).sort({createdAt:-1})
   if(lastOtp)
   {
        const timeElapsed = (Date.now() - lastOtp.createdAt.getTime())/1000 //Returns elapsed in seconds
        if(timeElapsed<80)
            throw new Error("Otp Limit Exceeded")
   }
   
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
        throw new AppError("Invalid OTP No record",400,"AUTH_00")
    if(otpRecord.expiresAt < new Date())
        throw new AppError("Otp Expired",401,"AUTH_001")
    if(otpRecord.code !== code)
        throw new AppError("Invalid OTP code not matching",402,"AUTH_002")

    otpRecord.used = true
    await otpRecord.save()
    return true
}