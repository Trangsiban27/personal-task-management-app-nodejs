'use strict'

const { SuccessResponse } = require('../core/success.response')
const accessService = require('../services/access.service')

class AccessController {

    signUp = async (req, res, next) => {
        new SuccessResponse({
            message: 'Register successfully!',
            metadata: await accessService.signUp(req.body)
        }).send(res)
    }

    login = async (req, res, next) => {

        new SuccessResponse({
            message: 'Login successfully!',
            metadata: await accessService.login(req.body)
        }).send(res)
    }

    logout = async (req, res, next) => {

        new SuccessResponse({
            message: 'Logout successfully!',
            metadata: await accessService.logout(req.keyStore)
        }).send(res)
    }
}

module.exports = new AccessController()