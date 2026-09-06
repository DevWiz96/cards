const asyncHandler = require('../util/asyncHandler')
const AppError = require('../util/appError')
const projectService = require('../services/projectService')
const cardService = require('../services/cardService')
const columnService = require('../services/columnService')

const Card = require('../models/card.model')
const Column = require('../models/column.model')


exports.createProject = asyncHandler( async (req,res)=>{
    const {name, description} = req.body
    if(!name)
        throw new AppError("No name provided",400)
    const ownerId = req.userId
    const {project, columns } = await projectService.createProject(
    name,
    description,
    ownerId
    )
    res.status(201).json({project, columns})
})
exports.getProjects = asyncHandler(async(req,res)=>{
    const userId = req.userId
    const projects = await projectService.getUserProjects(userId)
    res.json({projects})
})
exports. getBoard = asyncHandler(async(req,res)=>{
    const {id: projectId} = req.params
    const columns = await columnService.getColumns(projectId)
    const columnIds = columns.map(c=>c._id)
    const cards = await cardService.getCards(columnIds)
    res.json({cards: cards, columns: columns})
})