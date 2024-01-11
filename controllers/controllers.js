const utils = require('../utils')

const fcfs = (req,res) => {

    const result = fcfsAnswer(req)
    res.status(200).json({"response":"success","result":result})
    
}


const sjf = (req,res) => {

    const result = sjfAnswer(req)
    res.status(200).json({"response":"success","result":result})
}


const rr = (req,res) => {

    const result = rrAnswer(req)
    res.status(200).json({"response":"success","result":result})

}

const ps = (req,res) => {

    const result = priorityAnswer(req)
    res.status(200).json({"response":"success","result":result})
}


const srtf = (req,res) => {

    const result = srtfAnswer(req)
    res.status(200).json({"response":"success","result":result})
}


const lrtf = (req,res) => {

    const result = lrtfAnswer(req)
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