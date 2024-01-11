const {StatusCodes} = require('http-status-codes')
const InvalidInput = require('../errors/invalid-input')

const validateInput = (req,res,next) => {

    let scheduling = req.body.scheduling
    let pid = req.body.pid
    let arrival = req.body.arrival
    let burst = req.body.burst
    let priority = req.body.priority
    let quanta = req.body.quanta

    
    //verify array size and numbers are valid

    if(pid==="")
    throw new InvalidInput(StatusCodes.BAD_REQUEST, "Invalid Input! Process IDs can't be empty!")

    pid = pid.split(',')

    let totalLength = pid.length

    if(arrival==="" || burst==="")
    throw new InvalidInput(StatusCodes.BAD_REQUEST, "Invalid Input! Arrival or Burst value can't be empty!")


    arrival = arrival.split(',').map((num)=>{

        let arr = Math.floor(Number(num))

        if(isNaN(arr))
        throw new InvalidInput(StatusCodes.BAD_REQUEST, "Invalid Input! Arrival time values must be numbers!")

        return arr
    })


    if(arrival.length != totalLength)
    throw new InvalidInput(StatusCodes.BAD_REQUEST, "Invalid Input! Provide appropriate values for arrival time!")

    
    burst = burst.split(',').map((num)=>{

        let brst = Math.floor(Number(num))

        if(isNaN(brst))
        throw new InvalidInput(StatusCodes.BAD_REQUEST, "Invalid Input! Burst time values must be numbers!")

        return brst
    })


    if(burst.length != totalLength)
    throw new InvalidInput(StatusCodes.BAD_REQUEST, "Invalid Input! Provide all values for burst time!")


    for(let i=0;i<totalLength;i++)
    {
        if(burst[i]===0)
        throw new InvalidInput(StatusCodes.BAD_REQUEST, "Invalid Input! Burst time can't be zero!")
    }

    
    if(priority!=="")
    priority = priority.split(',').map((num)=>{

        let prt = Math.floor(Number(num))

        if(isNaN(prt))
        throw new InvalidInput(StatusCodes.BAD_REQUEST, "Invalid Input! Priority values must be numbers!")

        return prt
    })
    else
    {
        priority = Array(totalLength).fill(0)
    }

    if(priority.length != totalLength)
    throw new InvalidInput(StatusCodes.BAD_REQUEST, "Invalid Input! Provide appropriate values for priority values!")


    req.body.pid = pid
    req.body.arrival = arrival
    req.body.burst = burst
    req.body.priority = priority
    req.body.quanta = quanta

    console.log("Valid", req.body)

    next()
}

module.exports = validateInput