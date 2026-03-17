'use strict'

const apikeyModel = require("../models/apikey.model")
const crypto = require('crypto')

class apiKeyService {

    static async findKey(key) {
        try {

            // const newKey = await apikeyModel.create({
            //     key: crypto.randomBytes(64).toString('hex'),
            //     permissions: ['0000']
            // })

            const objKey = await apikeyModel.findOne({
                key,
                status: true
            }).lean()

            return objKey
        } catch (err) {
            return err
        }
    }
}

module.exports = apiKeyService