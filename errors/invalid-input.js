class InvalidInput extends Error {

    constructor (statusCode,message) {
        super(message)
        this.statusCode = statusCode
    }
}

module.exports = InvalidInput