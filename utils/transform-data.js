const transformData = (req) => {

    const data = []
    
    let pid = req.body.pid.split(',')
    let arrival = req.body.arrival.split(',').map((num)=>(num-'0'))
    let burst = req.body.burst.split(',').map((num)=>(num-'0'))

    let priority = req.body.priority
    if(priority!=="")
    priority = priority.split(',').map((num)=>(num-'0'))
    else
    priority = ""

    
    let totalProcess = pid.length

    
    for(let i=0;i<totalProcess;i++)
    {
        let process = {
            
            "pid": pid[i],
            "arrival": arrival[i],
            "burst": burst[i],
            "priority": ((priority==="")?-1:priority[i]),
            "remtime": burst[i],
            "lastexe": 0,
            "arr": arrival[i]
        }
        
        data.push(process)
    }

    
    // console.log("hey2")
    return data
}

module.exports = transformData