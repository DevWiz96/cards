const Invite = require('../models/invite.model');
const User = require('../models/user.model');
const AppError = require('../util/appError');
const membershipService = require('./membershipService');

exports.sendInvite = async(projectId,email, invitingUserId)=>{
    const exists = await membershipService.isMember(projectId, invitingUserId)
    if(!exists)
    {
        throw new AppError("You don't have permissions to invite to this project",400)
    }
    //Edge cases
    //E1 : If user is already a member
    const existingUser = await User.findOne({email})
    if(existingUser)
    {
        const isMember = await membershipService.isMember(projectId, existingUser.id)
        if(isMember)
            throw new AppError("User is already member",400)
    }
    //E2: User is already invited but in pending
    const pending = await Invite.findOne({projectId,email,status:'pending'})
    if(pending)//Ie's there is a pending request to this email
    return pending
    return await Invite.create({projectId, email, status:'pending'})
}

exports.acceptInvite = async(inviteId, userId)=>{
    const invite = await Invite.findById(inviteId)
    if(!invite)
        throw new AppError("Invite not found",404)
    if(invite.status !== 'pending')
        throw new AppError("Invite is no longer pending",400)

    const user = await User.findById(userId)
    if(!user || user.email !== invite.email)
        throw new AppError("This invite does not belong to you",403)

    await membershipService.addMember(invite.projectId, userId)
    invite.status = 'accepted'
    await invite.save()
    return invite
}

exports.getMyInvites = async(userId)=>{
    const user = await User.findById(userId)
    if(!user)
        throw new AppError("User not found",404)

    //Pull the project's name in the same query so the client can name it
    const invites = await Invite.find({email: user.email, status: 'pending'})
        .populate('projectId','name')

    //Flatten it back out: the client gets a plain projectId plus projectName,
    //rather than projectId turning into a nested object
    return invites.map((invite)=>({
        id: invite.id,
        projectId: invite.projectId?.id ?? null,
        projectName: invite.projectId?.name ?? null,
        email: invite.email,
        status: invite.status,
        createdAt: invite.createdAt,
    }))
}