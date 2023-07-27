const utils = require('../utils')

const fcfs = (req,res) => {

    // console.log("hey1")
    // console.log(utils)
    const result = utils.fcfsAnswer(req)
    // console.log(result)
    res.send(result)
    
}


const sjf = (req,res) => {

    const result = utils.sjfAnswer(req)
    console.log(result)
    res.send(result)
}


const rr = (req,res) => {

    const result = utils.rrAnswer(req)
    console.log(result)
    res.send(result)

}

const ps = (req,res) => {

    const result = utils.priorityAnswer(req)
    console.log(result)
    res.send(result)
}


const srtf = (req,res) => {

    const result = utils.srtfAnswer(req)
    console.log(result)
    res.send(result)
}


const lrtf = (req,res) => {

    const result = utils.lrtfAnswer(req)
    console.log(result)
    res.send(result)
}


module.exports = {
    fcfs,
    sjf,
    rr,
    ps,
    srtf,
    lrtf
}