'use strict'

const { BadRequestError } = require("../core/error.response")
const keyTokenModel = require("../models/keyToken.model")
const { convertObjectMongoDB } = require("../utils")

class keyTokenService {

    static createKeyToken = async ({ userId, publicKey, privateKey, refreshToken }) => {

        try {
            const filter = { user: userId }

            const update = {
                privateKey,
                publicKey,
                refreshToken,
                refreshTokenUsed: [],
            }

            const options = { upsert: true, new: true }

            const tokens = await keyTokenModel.findOneAndUpdate(
                filter,
                update,
                options
            )

            return tokens ? tokens.publicKey : null
        } catch (err) {
            return err
        }
    }

    static async findKeyByUserId(userId) {

        if (!userId) throw new BadRequestError('UserId not found!')

        return await keyTokenModel.findOne({
            user: convertObjectMongoDB(userId)
        })
    }

    static async deleteKeyById(id) {

        return await keyTokenModel.findByIdAndDelete(id).lean()
    }
}

module.exports = keyTokenService