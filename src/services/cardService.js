const Card = require('../models/card.model')
const Label = require('../models/label.model')
const CardLabel = require('../models/cardlabel.model')
const Column = require('../models/column.model')
const AppError = require('../util/appError')
const { validateTransition } = require('../services/transitionService')
const membershipService = require('../services/membershipService')


exports.createCard = async (columnId, title, description, createdBy, assignedBy, assigneeId, dueDate, priority, labelIds) => {

    if (!columnId)
        throw new AppError("No column ID provided", 400)
    const column = await Column.findById(columnId)

    if (!column)
        throw new AppError("Column could not be found", 400)

    const isMember = await membershipService.isMember(column.projectId, createdBy)
    if(!isMember)
        throw new AppError("Unable to create Card no permissions",400)
    const isAssigneeMember = await membershipService.isMember(column.projectId, assigneeId)
       if(!isAssigneeMember)
        throw new AppError("Unable to Create/assign card because assignee is not a member",400)
    const card = await Card.create({ columnId, title, description, createdBy, assignedBy, assigneeId, dueDate, priority })

    if (labelIds && labelIds.length > 0) {
        await Promise.all(
            labelIds.map((labelId) => CardLabel.create({ cardId: card.id, labelId }))
        )
    }
    return card
}

exports.moveCard = async (cardId, targetColumnId) => {
    const card = await Card.findById(cardId)
    if (!card)
        throw new AppError("Card not found", 400)
    const currentColumn = await Column.findById(card.columnId)
    const targetColumn = await Column.findById(targetColumnId)
    if (!targetColumn)
        throw new AppError("Target Column not found", 400)
    if (currentColumn.projectId.toString() !== targetColumn.projectId.toString())
        throw new AppError("Target column does not belong to the same project", 400)

    const isValid = validateTransition(currentColumn.position, targetColumn.position)
    if (!isValid) {
        throw new AppError(
            `Invalid transition: cannot move from ${currentColumn.name} to ${targetColumn.name}`,
            400
        );
    }
    card.columnId = targetColumnId
    await card.save()
    return card
}