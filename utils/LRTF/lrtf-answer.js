const transformData = require('../transform-data')
const sortLrtf = require('./sort-lrtf')
const transformGanttChart = require('../transform-ganttChart')


const lrtfAnswer = (req) => {

    let {data} = transformData(req)

    let totalProcess = data.length

    let result = {
        "ganttChart": [],
        "processes" : {}
    }

    let time = 0
    
    let avgturnaround = 0
    let avgwaiting = 0
    let avgcompletion = 0
    let avgburst = 0

    let completed = 0
    // let last_exeID = '#'

    while(completed<totalProcess)
    {
        data = sortLrtf(data)


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
                    "priority": priority,
                    "burst": burst,
                    "turnaround": ta,
                    "waiting": wait,
                    "completion": time
                }

                avgturnaround += ta
                avgwaiting += wait
                avgcompletion += time
                avgburst += burst

                completed++
            }
        }
    }


    avgturnaround /= totalProcess
    avgwaiting /= totalProcess
    avgcompletion /= totalProcess
    avgburst /= totalProcess
    
    result.avgturnaround = avgturnaround
    result.avgwaiting = avgwaiting
    result.avgcompletion = avgcompletion
    result.avgburst = avgburst
    
    let showgc = transformGanttChart(result.ganttChart)

    result.showgc = showgc

    return result
}


module.exports = lrtfAnswer