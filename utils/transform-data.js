const transformData = (req) => {

    const data = []
    
    let pid = req.body.pid
    let arrival = req.body.arrival
    let burst = req.body.burst
    let priority = req.body.priority
    let quanta = req.body.quanta

    
    let totalProcess = pid.length

    
    for(let i=0;i<totalProcess;i++)
    {
        let process = {
            
            "pid": pid[i],
            "arrival": arrival[i],
            "burst": burst[i],
            "priority": 0,
            "remtime": burst[i],
            "lastexe": 0,
            "arr": arrival[i]
        }
        
        data.push(process)
    }

    return { data , quanta }
}

module.exports = transformData