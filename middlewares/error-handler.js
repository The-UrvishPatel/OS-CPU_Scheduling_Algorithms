const InvalidInput = require("../errors/invalid-input")

const errorHandler = (err,req,res,next) => {

    if(err instanceof InvalidInput)
    return res.status(err.statusCode).send(err.message)

    console.log("Something went extremlly wrong!")
    return res.status(400).send("Something went extremlly wrong!")
}

module.exports = errorHandler