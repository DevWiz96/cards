const asyncHandler = require('../util/asyncHandler')

exports.createProject = asyncHandler( async (req,res)=>{
    res.status(200).json({message:"succesful update"})
})
exports.getProjects = asyncHandler(async(req,res)=>{
    res.status(200).json({message:"succesful get"})
})