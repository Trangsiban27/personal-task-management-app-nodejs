'use strict'

const _ = require('lodash')
const { Types } = require('mongoose')
const { BadRequestError } = require('../core/error.response')

const getInfoData = (object = {}, fields = []) => {
    return _.pick(object, fields)
}

const convertObjectMongoDB = (id) => {

    if (!id) throw new BadRequestError('Missing id!')

    if (!Types.ObjectId.isValid(id)) throw new BadRequestError(`Invalid objectId: ${id}`)

    return new Types.ObjectId(id)
}

const getSelectData = (select = []) => {
    return Object.fromEntries(select.map(el => [el, 1]))
}

const getUnSelectData = (unSelect = []) => {
    return Object.fromEntries(unSelect.map(el => [el, 0]))
}

module.exports = {
    getInfoData,
    convertObjectMongoDB
}