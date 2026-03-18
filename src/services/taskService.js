'use strict'

const { BadRequestError, NotfoundError } = require("../core/error.response")
const { createTask, getTaskById, updateTask } = require("../models/respositories/task.repo")
const taskModel = require("../models/task.model")

class taskService {

    static async createTask(payload, userId) {

        //validate
        if (!payload.title) throw new BadRequestError('Title is required!')

        //2. create new task
        const task = createTask(payload, userId)

        return task
    }

    static async updateTask(payload, taskId) {
        //check task exists
        const { title, description, status, priority, dueDate } = payload

        const task = await getTaskById(taskId)

        if (!task) throw new NotfoundError('Task not found!')

        //validate
        if (status && !['todo', 'in-progress', 'done'].includes(status)) {
            throw new BadRequestError('Invalid status!')
        }

        if (priority && !['low', 'medium', 'high'].includes(priority)) {
            throw new BadRequestError('Invalid priority!')
        }

        if (dueDate && isNaN(new Date(dueDate))) {
            throw new BadRequestError('Invalid dueDate')
        }

        if (dueDate < new Date()) {
            throw new BadRequestError('dueDate must be greater than now!')
        }

        const updateData = {}

        if (title) updateData.title = title.trim()
        if (description) updateData.description = description
        if (status) updateData.status = status
        if (description) updateData.priority = priority
        if (description) updateData.dueDate = dueDate

        const updatedTask = await updateTask(updateData, taskId)

        return updatedTask

    }

    static async updateTaskStatus(taskId, newStatus) {

        if (!taskId) throw new BadRequestError('Task id is missing!')

        const task = await getTaskById(taskId)

        if (!task) throw new BadRequestError('Task not found!')

        //validate
        if (newStatus && !['todo', 'in-progress', 'done'].includes(newStatus)) {
            throw new BadRequestError('Invalid status!')
        }

        task.status = newStatus

        await task.save()

        return {
            _id: task._id,
            status: task.status
        }
    }

    static async getTaskById(taskId) {

        //validate
        if (!taskId) throw new BadRequestError('Task id is missing!')

        const task = await getTaskById(taskId)

        if (!task) throw new NotfoundError('Task not found!')

        return task
    }

    static async updateTaskPriority(taskId, priority) {

        if (!taskId) throw new BadRequestError('Task id is missing!')

        const task = await getTaskById(taskId)

        if (!task) throw new NotfoundError('Task not found!')

        if (!priority) throw new BadRequestError('Priority is required!')

        if (priority && !['low', 'medium', 'high'].includes(priority)) {
            throw new BadRequestError('Invalid priority!')
        }

        task.priority = priority

        await task.save()

        return {
            _id: task._id,
            priority: task.priority
        }
    }
}

module.exports = taskService