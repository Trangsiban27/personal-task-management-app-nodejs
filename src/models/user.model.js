'use strict'

const { Schema, default: mongoose } = require("mongoose")

const DOCUMENT_NAME = 'user'
const COLLECTION_NAME = 'users'

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    }
}, {
    collection: COLLECTION_NAME,
    timestamps: true
})

module.exports = mongoose.model(DOCUMENT_NAME, userSchema)