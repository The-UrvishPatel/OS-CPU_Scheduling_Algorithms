const transformData = require('../transform-data')
const sortRr = require('./sort-rr')
const transformGanttChart = require('../transform-ganttChart')


const rrAnswer = (req) => {

    let { data, quanta } = transformData(req)

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

    data = sortRr(data,0)

    while(completed<totalProcess)
    {
        let q = quanta

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
            let rem = data[execute].remtime
            let pid = data[execute].pid
            let arrival = data[execute].arrival
            let priority = data[execute].priority

            let cnt = 0

            while(rem!=0 && q!=0)
            {
                result.ganttChart.push(pid)
                cnt++
                rem--
                q--
            }

            time += cnt


            data[execute].remtime -= cnt

            if(data[execute].remtime === 0)
            {
                let ta = time - arrival
                let wait = ta - data[execute].burst

                result.processes[pid] = {
            
                    "pid": pid,
                    "arrival": arrival,
                    "priority": priority,
                    "burst": data[execute].burst,
                    "turnaround": ta,
                    "waiting": wait,
                    "completion": time
                }

                avgturnaround += ta
                avgwaiting += wait
                avgcompletion += time
                avgburst += data[execute].burst

                completed++
            }
            else
            {
                data[execute].arr = time
                data[execute].lastexe = time
            }

        }

        data = sortRr(data,0)
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


module.exports = rrAnswer