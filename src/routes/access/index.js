'use strict'

const express = require('express')
const asyncHandler = require('../../helper/asyncHandler')
const accessController = require('../../controller/access.controller')
const { authentication } = require('../../auth/authUtils')
const router = express.Router()

router.post('/sign-up', asyncHandler(accessController.signUp))
router.post('/login', asyncHandler(accessController.login))

router.use(authentication)

router.post('/logout', asyncHandler(accessController.logout))

module.exports = router