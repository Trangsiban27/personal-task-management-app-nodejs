'use strict'

const express = require('express')
const { authentication } = require('../../auth/authUtils')
const taskController = require('../../controller/task.controller')
const asyncHandler = require('../../helper/asyncHandler')
const router = express.Router()

router.use(authentication)

router.post('', asyncHandler(taskController.createTask))
router.get('/:taskId', asyncHandler(taskController.getTaskById))
router.patch('/:taskId', asyncHandler(taskController.updateTask))
router.patch('/:taskId/status', asyncHandler(taskController.updateTaskStatus))
router.patch('/:taskId/priority', asyncHandler(taskController.updateTaskPriority))

module.exports = router