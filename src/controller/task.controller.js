'use strict'

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
}

module.exports = new TaskController()