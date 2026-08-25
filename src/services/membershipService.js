const Membership =  require('../models/membership.model')

exports.isMember = async(projectId, userId)=>{
    const exists = await Membership.findOne({projectId, userId})
    return !!exists //Membership exist
}

exports.addMember = async(projectId, userId, role = "member")=>{
    const member = await Membership.findOne({projectId, userId})
    if(member)
        return member
    return await Membership.create({projectId, userId, role})
}