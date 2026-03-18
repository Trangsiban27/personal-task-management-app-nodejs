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

const updateTask = async (payload, taskId) => {

    return await taskModel.findByIdAndUpdate(
        taskId,
        payload,
        { new: true }
    ).select('-__v')
}

const getTaskById = async (id) => {

    return taskModel
        .findById(id)
        .select('-__v -isDelete')
}

module.exports = {
    createTask,
    getTaskById,
    updateTask
}