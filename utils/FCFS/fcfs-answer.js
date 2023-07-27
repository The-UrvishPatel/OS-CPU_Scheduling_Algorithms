const transformData = require('../transform-data')
const sortFcfs = require('./sort-fcfs')

const fcfsAnswer = (req) => {

    let data = transformData(req)
    data = sortFcfs(data)
    // console.log(data)

    let totalProcess = data.length

    let result = {
        "ganttChart": [],
        "processes" : []
    }

    let time = 0
    let avgturnaround = 0
    let avgwaiting = 0

    let curr_process = 0

    while(curr_process<totalProcess)
    {
        let burst = data[curr_process].burst
        let pid = data[curr_process].pid
        let arrival = data[curr_process].arrival
        // console.log(pid,burst,arrival)

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
        
        // waiting.push(wait)
        // turnaround.push(ta)
        
        let process = {
            
            "pid": pid,
            "turnaround": ta,
            "waiting": wait
        }

        
        result.processes.push(process)

        
        avgturnaround += ta
        avgwaiting += wait
        
        curr_process++
        
    }

    // console.log("hey----")

    avgturnaround /= totalProcess
    avgwaiting /= totalProcess

    result.avgturnaround = avgturnaround
    result.avgwaiting = avgwaiting

    // console.log(ganttChart,waiting,turnaround,avgturnaround,avgwaiting)

    return result
}


module.exports = fcfsAnswer