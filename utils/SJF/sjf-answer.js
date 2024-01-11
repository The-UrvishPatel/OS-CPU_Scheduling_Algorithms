const transformData = require('../transform-data')
const sortSjf = require('./sort-sjf')
const transformGanttChart = require('../transform-ganttChart')


const sjfAnswer = (req) => {

    let {data} = transformData(req)
    data = sortSjf(data)

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

    while(completed<totalProcess)
    {
        let execute = 0

        while(execute!==totalProcess && (data[execute].arrival > time || data[execute].remtime === 0)) 
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

            for(let j=0;j<burst;j++)
            result.ganttChart.push(pid)

            data[execute].remtime = 0

            time += burst

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


module.exports = sjfAnswer