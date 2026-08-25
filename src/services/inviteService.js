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
    const pending = Invite.findOne({projectId,email,status:'pending'})
    if(pending)//Ie's there is a pending request to this email
    return pending
    return await Invite.create({projectId, email, status:'pending'})
}