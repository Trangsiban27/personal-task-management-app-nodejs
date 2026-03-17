const { Schema, default: mongoose } = require("mongoose");

const DOCUMENT_NAME = 'apiKey'
const COLLECTION_NAME = 'apiKeys'

const apiKeySchema = new Schema({
    key: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: Boolean,
        default: true
    },
    permissions: {
        type: [String],
        required: true,
        enum: ['0000', '1111', '2222']
    }
}, {
    collection: COLLECTION_NAME,
    timestamps: true
})

module.exports = mongoose.model(DOCUMENT_NAME, apiKeySchema)