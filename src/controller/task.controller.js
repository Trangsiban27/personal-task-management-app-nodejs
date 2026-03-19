'use strict'

const { BadRequestError } = require("../core/error.response")
const { SuccessResponse } = require("../core/success.response")
const taskService = require("../services/taskService")

class TaskController {

    createTask = async (req, res, next) => {

        const userId = req.user.userId

        const task = await taskService.createTask(req.body, userId)

        new SuccessResponse({
            message: 'Create task successfully!',
            metadata: task
        }).send(res)
    }

    getTaskById = async (req, res, next) => {

        const taskId = req.params.taskId

        if (!taskId) throw new BadRequestError('Task id is missing!')

        const task = await taskService.getTaskById(taskId)

        new SuccessResponse({
            message: 'Get task successfully!',
            metadata: task
        }).send(res)
    }

    updateTask = async (req, res, next) => {

        const taskId = req.params.taskId

        if (!taskId) throw new BadRequestError('Task id is missing!')

        const updateTask = await taskService.updateTask(req.body, taskId)

        new SuccessResponse({
            message: 'Update task successfully!',
            metadata: updateTask
        }).send(res)
    }

    updateTaskStatus = async (req, res, next) => {

        const taskId = req.params.taskId
        const { status } = req.body

        const updateTask = await taskService.updateTaskStatus(taskId, status)

        new SuccessResponse({
            message: 'Update status successfully!',
            metadata: updateTask
        }).send(res)
    }

    updateTaskPriority = async (req, res, next) => {

        const taskId = req.params.taskId
        const { priority } = req.body

        const updateTask = await taskService.updateTaskPriority(taskId, priority)

        new SuccessResponse({
            message: 'Update priority successfully!',
            metadata: updateTask
        }).send(res)
    }

    deleteTask = async (req, res, next) => {

        const taskId = req.params.taskId

        const task = await taskService.deleteTask(taskId)

        new SuccessResponse({
            message: 'Delete task successfully!',
            metadata: task
        }).send(res)
    }
    searchTask = async (req, res, next) => {

        const userId = req.user.userId

        const result = await taskService.searchTaskByUserId({
            userId,
            ...req.query
        })

        new SuccessResponse({
            message: 'Search task successfully!',
            metadata: result
        }).send(res)
    }
}

module.exports = new TaskController()