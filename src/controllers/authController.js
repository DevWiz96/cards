exports.requestOtp = async (req,res)=>{
    const {email} = req.body 
    res.json({success: true})
}
