const transformData = require('../transform-data')
const sortRr = require('./sort-rr')


const rrAnswer = (req) => {

    let data = transformData(req)
    // data = sortPriority(data)
    // console.log(data)

    let totalProcess = data.length

    let result = {
        "ganttChart": [],
        "processes" : []
    }

    let time = 0
    let avgturnaround = 0
    let avgwaiting = 0

    let completed = 0
    // let last_exeID = '#'
    

    while(completed<totalProcess)
    {
        data = sortRr(data)

        let execute = 0

        while(execute!==totalProcess && (data[execute].arrival > time || data[execute].remtime == 0
            /*data[execute].pid === last_exeID ||  data[execute].priority >= oncpu->priority ||
            execute->last_executed > oncpu->last_executed */ )) 
        {
            // console.log("hey")
            execute++
        }

        // console.log(execute)


        if(execute == totalProcess)
        {
            result.ganttChart.push("IDL")
            time++
        }
        else
        {
            let burst = data[execute].burst
            let pid = data[execute].pid
            let arrival = data[execute].arrival

            let cnt = 0, quanta = 0

            while(burst!=0 && quanta!=0)
            {
                result.ganttChart.push(pid)
                cnt++
            }

            time += cnt

            // data[execute].lastexe = time

            if(data[execute].remtime === 0)
            {
                let ta = time - arrival
                let wait = ta - burst

                let process = {
                
                    "pid": pid,
                    "turnaround": ta,
                    "waiting": wait
                }

                result.processes.push(process)

                avgturnaround += ta
                avgwaiting += wait

                console.log(process)

                completed++
            }
        }
    }

    // console.log("hey----")

    avgturnaround /= totalProcess
    avgwaiting /= totalProcess

    result.avgturnaround = avgturnaround
    result.avgwaiting = avgwaiting

    // console.log(ganttChart,waiting,turnaround,avgturnaround,avgwaiting)

    return result
}


module.exports = rrAnswer