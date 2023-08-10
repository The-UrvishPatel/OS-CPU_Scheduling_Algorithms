const transformData = require('../transform-data')
const sortSrtf = require('./sort-srtf')
const transformGanttChart = require('../transform-ganttChart')


const srtfAnswer = (req) => {

    let {data} = transformData(req)

    let totalProcess = data.length

    let result = {
        "ganttChart": [],
        "processes" : {}
    }

    let time = 0
    let avgturnaround = 0
    let avgwaiting = 0

    let completed = 0
    // let last_exeID = '#'
    

    while(completed<totalProcess)
    {
        data = sortSrtf(data)


        let execute = 0

        while(execute!==totalProcess && (data[execute].arrival > time || data[execute].remtime == 0
            /*data[execute].pid === last_exeID ||  data[execute].priority >= oncpu->priority ||
            execute->last_executed > oncpu->last_executed */ )) 
        {
            execute++
        }

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
            let priority = data[execute].priority

            result.ganttChart.push(pid)

            data[execute].remtime-- 

            time += 1


            if(data[execute].remtime === 0)
            {
                let ta = time - arrival
                let wait = ta - burst

                result.processes[pid] = {
            
                    "pid": pid,
                    "arrival": arrival,
                    "burst": burst,
                    "priority": priority,
                    "turnaround": ta,
                    "waiting": wait
                }

                avgturnaround += ta
                avgwaiting += wait

                console.log(process)

                completed++
            }
        }
    }


    avgturnaround /= totalProcess
    avgwaiting /= totalProcess

    result.avgturnaround = avgturnaround
    result.avgwaiting = avgwaiting

    let showgc = transformGanttChart(result.ganttChart)

    result.showgc = showgc

    return result
}


module.exports = srtfAnswer