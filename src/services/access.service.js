'use strict'

const { BadRequestError, NotfoundError } = require("../core/error.response")
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const userModel = require("../models/user.model")
const keyTokenService = require("./keyToken.service")
const { keys } = require("lodash")
const { createPairToken } = require("../auth/authUtils")
const { getInfoData } = require("../utils")
const userService = require("./user.service")
const { token } = require("morgan")
const keyTokenModel = require("../models/keyToken.model")

class accessService {

    static logout = async (keystore) => {
        console.log('keystore: ', keystore)

        const delKey = await keyTokenService.deleteKeyById(keystore._id)

        return delKey
    }

    static signUp = async ({ name, email, password }) => {

        const foundEmail = await userModel.findOne({
            email,
        })

        if (foundEmail) throw new BadRequestError('User already exists!')

        const passwordHash = await bcrypt.hash(password, 10)

        const newUser = await userModel.create({
            name,
            email,
            password: passwordHash
        })

        if (newUser) {

            const publicKey = crypto.randomBytes(64).toString('hex')
            const privateKey = crypto.randomBytes(64).toString('hex')

            const keyStore = await keyTokenService.createKeyToken({
                userId: newUser._id,
                publicKey,
                privateKey
            })

            if (!keyStore) {
                throw new BadRequestError('Failed to create keystore')
            }

            const tokens = await createPairToken(
                {
                    userId: newUser._id,
                    email,
                },
                publicKey,
                privateKey
            )

            if (!tokens) {
                throw new BadRequestError('Failed to create tokens!')
            }

            return {
                code: 201,
                metadata: {
                    user: getInfoData(newUser, ['_id', 'name', 'email']),
                    tokens
                }
            }
        }
    }

    static login = async ({ email, password }) => {
        //check email exists
        const foundUser = await userService.findUserByEmail(email)

        if (!foundUser) throw new NotfoundError('User notfound!')

        //2 - Matching password
        const matchingPassword = await bcrypt.compare(password, foundUser.password)

        if (!matchingPassword) throw new BadRequestError('Authenticate is incorrect!')

        //3 - create AT vs RT and save to db
        const publicKey = crypto.randomBytes(64).toString('hex')
        const privateKey = crypto.randomBytes(64).toString('hex')

        //create new accessToken vs refreshToken
        const tokens = await createPairToken(
            {
                userId: foundUser._id,
                email
            },
            publicKey,
            privateKey
        )

        await keyTokenService.createKeyToken({
            userId: foundUser._id,
            publicKey,
            privateKey,
            refreshToken: tokens.refreshToken,
        })

        return {
            metadata: {
                user: getInfoData(foundUser, ['_id', 'name', 'email']),
                tokens
            }
        }
    }
}

module.exports = accessService