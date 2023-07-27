const transformData = require('../transform-data')
const sortSjf = require('./sort-sjf')

const sjfAnswer = (req) => {

    let data = transformData(req)
    data = sortSjf(data)
    console.log(data)

    let totalProcess = data.length

    let result = {
        "ganttChart": [],
        "processes" : []
    }

    let time = 0
    let avgturnaround = 0
    let avgwaiting = 0

    let completed = 0

    while(completed<totalProcess)
    {
        let execute = 0

        while(execute!==totalProcess && (data[execute].arrival > time || data[execute].remtime === 0)) 
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

            for(let j=0;j<burst;j++)
            result.ganttChart.push(pid)

            data[execute].remtime = 0

            time += burst

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

    // console.log("hey----")

    avgturnaround /= totalProcess
    avgwaiting /= totalProcess

    result.avgturnaround = avgturnaround
    result.avgwaiting = avgwaiting

    // console.log(ganttChart,waiting,turnaround,avgturnaround,avgwaiting)

    return result
}


module.exports = sjfAnswer