const transformData = require('../transform-data')
const sortFcfs = require('./sort-fcfs')
const transformGanttChart = require('../transform-ganttChart')


const fcfsAnswer = (req) => {

    let {data} = transformData(req)
    data = sortFcfs(data)

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

    let curr_process = 0

    while(curr_process<totalProcess)
    {
        let burst = data[curr_process].burst
        let pid = data[curr_process].pid
        let arrival = data[curr_process].arrival
        let priority = data[curr_process].priority

        if(arrival>time)
        {
            time++;
            result.ganttChart.push("IDL")
            continue
        }

        
        for(let j=0;j<burst;j++)
        result.ganttChart.push(pid)
        
        
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
        
        curr_process++
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


module.exports = fcfsAnswer