const Column = require('../models/column.model')
const Project = require('../models/project.model')
const AppError = require('../util/appError')

exports.addColumn = async (projectId, name, position) => {
    const project = await Project.findById(projectId)
    if (!project)
        throw new AppError("Project not found", 400, 'XXXX')

    const existingColumns = await Column.find({ projectId: projectId })

    const insertPosition = position

    if (insertPosition === undefined || insertPosition === null) // If position not specified we will add to the end
        insertPosition = existingColumns.length
    else {
        await Column.updateMany({
            projectId, position: { $gte: insertPosition }
        },
            {
                $inc: { position: 1 }
            }
        )
    }
    return await Column.create({projectId, name, position: insertPosition})
}

exports.renameColumn = async(columnId, name)=>
{
    const column = await Column.findById(columnId)
    if(!column)
        throw new AppError("Column ID not found",400)
    column.name = name
    await column.save()
    return column
}
exports.getColumns = async(projectId)=>{
    const columns = await Column.find({projectId})
    return columns
}