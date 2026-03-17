'use strict'

const express = require('express')
const { authentication } = require('../../auth/authUtils')
const asyncHandler = require('../../helper/asyncHandler')
const userController = require('../../controller/user.controller')
const router = express.Router()

router.use(authentication)

router.get('/info', asyncHandler(userController.getUserInfo))

module.exports = router