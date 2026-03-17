'use strict'

const apiKeyService = require("../services/apikey.service")

const HEADER = {
    API_KEY: 'x-api-key',
    AUTHORIZATION: 'authorization'
}

const apiKey = async (req, res, next) => {
    try {

        const key = req.headers[HEADER.API_KEY]?.toString()

        if (!key) {
            return res.status(403).json({
                message: 'Forbidden'
            })
        }

        const foundKey = await apiKeyService.findKey(key)

        if (!foundKey) {
            return res.status(403).json({
                message: 'Forbidden'
            })
        }

        req.objKey = foundKey

        return next()
    } catch (err) {
        next(err)
    }
}

const checkPermission = (permission) => {

    return (req, res, next) => {

        console.log('req.objKey: ', req.objKey)
        if (!req.objKey.permissions) {
            return res.status(403).json({
                message: 'Permission denied!'
            })
        }

        const validPermission = req.objKey.permissions.includes(permission)

        if (!validPermission) {
            return res.status(403).json({
                message: 'Permission denined!'
            })
        }

        next()
    }
}

module.exports = {
    apiKey,
    checkPermission
}