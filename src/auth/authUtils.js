'use strict'

const JWT = require('jsonwebtoken')
const asyncHandler = require('../helper/asyncHandler')
const { BadRequestError } = require('../core/error.response')
const keyTokenService = require('../services/keyToken.service')

const HEADER = {
    API_KEY: 'x-api-key',
    AUTHORIZATION: 'authorization',
    CLIENT_ID: 'x-client-id',
    REFRESH_TOKEN: 'x-refresh-token'
}

const createPairToken = async (payload, publicKey, privateKey) => {
    try {
        //create access token base on public key
        const accessToken = JWT.sign(payload, publicKey, {
            expiresIn: '2 days'
        })

        //create refreash token base on private key
        const refreshToken = JWT.sign(payload, privateKey, {
            expiresIn: '7 days'
        })

        //verify token
        JWT.verify(accessToken, publicKey, (err, decode) => {
            if (err) {
                console.log('Error verify::', err)
            } else {
                console.log('Decode verify::', decode)
            }
        })

        return {
            accessToken,
            refreshToken
        }

    } catch (err) {
        return err
    }
}

const authentication = asyncHandler(async (req, res, next) => {

    /*
        1 - check userId missing??
        2 - get accessToken
        3 - verify token
        4 - check user in db?
        5 - check keyStore with userId?
        6 - OK all => return next()
    */

    const userId = req.headers[HEADER.CLIENT_ID]

    if (!userId) throw new BadRequestError('Invalid request!')

    const keyStore = await keyTokenService.findKeyByUserId(userId)

    if (!keyStore) throw new BadRequestError('Key tokens not found!')

    if (req.headers[HEADER.REFRESH_TOKEN]) {
        try {

            const refreshToken = req.headers[HEADER.REFRESH_TOKEN]

            const decodeUser = JWT.verify(refreshToken, keyStore.privateKey)

            if (decodeUser.userId !== userId) throw new BadRequestError('Invalid Request!')

            req.keyStore = keyStore
            req.user = decodeUser
            req.refreshToken = refreshToken

            return next()
        } catch (err) {
            throw err
        }
    }

    const accessToken = req.headers[HEADER.AUTHORIZATION]

    if (!accessToken) throw new BadRequestError('Invalid request!')

    const decodeUser = JWT.verify(accessToken, keyStore.publicKey)

    if (userId !== decodeUser.userId) throw new BadRequestError('Invalid request!')

    req.keyStore = keyStore
    req.user = decodeUser

    return next()
})

module.exports = {
    createPairToken,
    authentication
}