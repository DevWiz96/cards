const asyncHandler = require('../util/asyncHandler')
const AppError = require('../util/appError')
const projectService = require('../services/projectService')

exports.createProject = asyncHandler( async (req,res)=>{
    const {name, description} = req.body
    if(!name)
        throw new AppError("No name provided",400)
    const ownerId = req.userId
    const {project, collumns } = await projectService.createProject(
    name,
    description,
    ownerId
    )
    res.status(201).json({project, collumns})
})
exports.getProjects = asyncHandler(async(req,res)=>{
    const userId = req.userId
    const projects = await projectService.getUserProjects(userId)
    res.json({projects})
})