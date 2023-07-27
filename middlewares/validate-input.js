const InvalidInput = require('../errors/invalid-input')

const validateInput = (req,res,next) => {

    // if()
    // throw new InvalidInput("Invalid Input",400)

    console.log("Valid!")
    next()
}

module.exports = validateInput