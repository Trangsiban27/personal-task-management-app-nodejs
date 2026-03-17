'use strict'

const mongoose = require('mongoose')

const connectString = process.env.MONGO_URI

class Database {

    constructor() {

        this.connect()
    }

    connect(type = 'mongodb') {

        if (1 === 1) {
            mongoose.set('debug', true)
            mongoose.set('debug', { color: true })
        }

        mongoose.connect(connectString)
            .then(() => {
                console.log('Connect mongodb successfully')
            })
            .catch(err => {
                console.log(err)
            })
    }

    static getInstance() {

        if (!Database.instance) {
            Database.instance = new Database()
        }

        return Database.instance
    }
}

const instanceMongodb = Database.getInstance()

module.exports = instanceMongodb