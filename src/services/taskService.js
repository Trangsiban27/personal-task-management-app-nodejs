'use strict'

const { BadRequestError } = require("../core/error.response")
const { createTask } = require("../models/respositories/task.repo")

class taskService {

    static async createTask(payload, userId) {

        //validate
        if (!payload.title) throw new BadRequestError('Title is required!')

        //2. create new task
        const task = createTask(payload, userId)

        return task
    }
}

module.exports = taskService