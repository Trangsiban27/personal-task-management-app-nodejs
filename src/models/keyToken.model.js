'use strict'

const { Schema, default: mongoose } = require("mongoose")

const DOCUMENT_NAME = 'keyToken'
const COLLECTION_NAME = 'keyTokens'

const keyTokenSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    publicKey: {
        type: String,
        required: true
    },
    privateKey: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String,
        required: true
    },
    refreshTokensUsed: {
        type: Array,
        default: []
    }
}, {
    collection: COLLECTION_NAME,
    timestamps: true
})

module.exports = mongoose.model(DOCUMENT_NAME, keyTokenSchema)