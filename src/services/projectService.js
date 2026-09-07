const Project = require('../models/project.model')
const Column = require('../models/column.model')
const Membership = require('../models/membership.model')
const membershipService = require('../services/membershipService')

const DEFAULT_COLUMNS = ['Planned','In-Progress','Testing','Completed']
//Creates projects and defaults columns
exports.createProject = async(name,description, ownerId) =>{
    const project = await Project.create({name, description, ownerId})
    await membershipService.addMember(project.id,ownerId,'owner')
    const columns = await Promise.all(
        DEFAULT_COLUMNS.map( async (column, index)=>{
           return  await Column.create({projectId: project.id, name: column, position: index})
        })
    )
    return {project, columns}
}
//List of projects the user is a member of (owner or invited member)
exports.getUserProjects = async(userId)=>{
    const memberships = await Membership.find({userId})
    const projectIds = memberships.map(m=>m.projectId)
    return await Project.find({_id: {$in: projectIds}})
}
