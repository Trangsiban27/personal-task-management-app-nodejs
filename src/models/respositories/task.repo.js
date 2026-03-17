'use strict'

const taskModel = require("../task.model")

const createTask = async ({
    title,
    description,
    status,
    priority,
    dueDate
}, userId) => {

    return await taskModel.create({
        title,
        description: description || '',
        status: status || 'todo',
        priority: priority || 'medium',
        dueDate,
        user: userId
    })
}

module.exports = {
    createTask
}