const Project = require('../models/project.model')
const Collumn = require('../models/collumn.model')

const DEFAULT_COLLUMNS = ['Planned','In-Progress','Testing','Completed']
//Creates projects and defaults collumns
exports.createProject = async(name,description, ownerId) =>{
    const project = await Project.create({name, description, ownerId})

    const collumns = await Promise.all(
        DEFAULT_COLLUMNS.map( async (collumn, index)=>{
           return  await Collumn.create({projectId: project.id, name: collumn, position: index})
        })
    )
    return {project, collumns}
} 
//List of projects that are owned by the user
exports.getUserProjects = async(userId)=>{
    return await Project.find({ownerId: userId})
}
