const Membership =  require('../models/membership.model')

exports.isMember = async(projectId, userId)=>{
    const exists = await Membership.findOne({projectId, userId})
    return !!exists //Membership exist
}

//Everyone who belongs to a project — used to populate assignee pickers
exports.getMembers = async(projectId)=>{
    const memberships = await Membership.find({projectId}).populate('userId','name email')
    return memberships
        .filter((m)=>m.userId) //Skip rows whose user record has gone
        .map((m)=>({
            id: m.userId.id,
            name: m.userId.name ?? null,
            email: m.userId.email,
            role: m.role,
        }))
}

exports.addMember = async(projectId, userId, role = "member")=>{
    const member = await Membership.findOne({projectId, userId})
    if(member)
        return member
    return await Membership.create({projectId, userId, role})
}