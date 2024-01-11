//if there is a error

const InvalidInput = require("../errors/invalid-input")
const {StatusCodes} = require('http-status-codes')


const errorHandler = (err,req,res,next) => {

    if(err instanceof InvalidInput)
    return res.status(err.statusCode).json({"response":"failed","messsge":err.message})

    console.log("Something went extremlly wrong!")
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({"response":"failed","message":"Something went wrong!"})
}

module.exports = errorHandler