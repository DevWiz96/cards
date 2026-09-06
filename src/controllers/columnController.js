const columnService = require('../services/columnService')
const AppError = require('../util/appError')
const asyncHandler = require('../util/asyncHandler')

exports.addColumn = asyncHandler(async(req, res)=>{
    const {id: projectId} = req.params
    const {name, position} = req.body
    if(!name)
        throw new AppError("No name provided for column",400)

    const column = await columnService.addColumn(projectId, name, position)
    res.status(201).json(column)
})

exports.renameColumn = asyncHandler(async(req,res)=>{
    const {id} = req.params
    const {name} = req.body
    if(!name)
        throw new AppError("No name provided for column",400)

    const column = await columnService.renameColumn(id, name)
    res.status(201).json(column)
})
