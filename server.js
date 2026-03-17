'use strict'

const PORT = process.env.PORT || 3055

const app = require('./src/app')

const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

module.exports = server