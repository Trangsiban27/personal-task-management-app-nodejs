'use strict'

const userModel = require("../models/user.model")
const { convertObjectMongoDB } = require("../utils")

class userService {

    static async findUserByEmail(email) {

        return await userModel.findOne({ email }).lean()
    }

    static async findUserById(userId) {


        return await userModel
            .findById(userId)
            .select('-password -__v')
    }
}

module.exports = userService