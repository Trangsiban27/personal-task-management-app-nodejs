'use strict'

const { SuccessResponse } = require("../core/success.response")
const userService = require("../services/user.service")

class UserController {

    getUserInfo = async (req, res, next) => {

        const userId = req.user.userId

        new SuccessResponse({
            message: 'Get user info success!',
            metadata: await userService.findUserById(userId)
        }).send(res)
    }

    getCurrentUser = async (req, res, next) => {

        const userId = req.user?.userId

        const user = await userService.findUserById(userId)

        new SuccessResponse({
            message: 'Get user successfully!',
            metadata: user
        }).send(res)
    }
}

module.exports = new UserController()