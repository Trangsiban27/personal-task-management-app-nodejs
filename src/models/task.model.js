'use strict'

const { Schema, default: mongoose, Types } = require("mongoose")

const DOCUMENT_NAME = 'task'
const COLLECTION_NAME = 'tasks'

const taskSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        enum: ['todo', 'in-progress', 'done'],
        default: 'todo'
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    dueDate: {
        type: Date,
    },
    isDelete: {
        type: Boolean,
        default: false
    }
}, {
    collection: COLLECTION_NAME,
    timestamps: true
})

module.exports = mongoose.model(DOCUMENT_NAME, taskSchema)
