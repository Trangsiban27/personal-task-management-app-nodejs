'use strict'

const express = require('express')
const { authentication } = require('../../auth/authUtils')
const taskController = require('../../controller/task.controller')
const asyncHandler = require('../../helper/asyncHandler')
const router = express.Router()

router.use(authentication)

router.post('', asyncHandler(taskController.createTask))

module.exports = router