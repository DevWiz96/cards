const Project = require('../models/project.model')
const Column = require('../models/column.model')

const DEFAULT_COLUMNS = ['Planned','In-Progress','Testing','Completed']
//Creates projects and defaults columns
exports.createProject = async(name,description, ownerId) =>{
    const project = await Project.create({name, description, ownerId})

    const columns = await Promise.all(
        DEFAULT_COLUMNS.map( async (column, index)=>{
           return  await Column.create({projectId: project.id, name: column, position: index})
        })
    )
    return {project, columns}
}
//List of projects that are owned by the user
exports.getUserProjects = async(userId)=>{
    return await Project.find({ownerId: userId})
}
