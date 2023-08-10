const utils = require('../utils')

const fcfs = (req,res) => {

    const result = utils.fcfsAnswer(req)
    res.status(200).json({"response":"success","result":result})
    
}


const sjf = (req,res) => {

    const result = utils.sjfAnswer(req)
    res.status(200).json({"response":"success","result":result})
}


const rr = (req,res) => {

    const result = utils.rrAnswer(req)
    res.status(200).json({"response":"success","result":result})

}

const ps = (req,res) => {

    const result = utils.priorityAnswer(req)
    res.status(200).json({"response":"success","result":result})
}


const srtf = (req,res) => {

    const result = utils.srtfAnswer(req)
    res.status(200).json({"response":"success","result":result})
}


const lrtf = (req,res) => {

    const result = utils.lrtfAnswer(req)
    res.status(200).json({"response":"success","result":result})
}


module.exports = {
    fcfs,
    sjf,
    rr,
    ps,
    srtf,
    lrtf
}