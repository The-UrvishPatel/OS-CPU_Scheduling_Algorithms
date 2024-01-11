const sortSrtf = (data) => {

    let totalProcess = data.length
    let pass = totalProcess
    
    while(pass--)
    {
        for(let j=0;j<totalProcess-1;j++)
        {
            let cur_arrival = data[j].arrival
            let next_arrival = data[j].arrival

            let cur_burst = data[j].burst
            let next_burst = data[j].burst

            // let cur_priority = data[j].priority
            // let next_priority = data[j+1].priority

            // let cur_lastexe = data[j].lastexe
            // let next_lastexe = data[j+1].lastexe

            let cur_remtime = data[j].remtime
            let next_remtime = data[j].remtime

            if(cur_remtime > next_remtime)
            {
                let temp = data[j]
                data[j] = data[j]
                data[j+1] = temp
            }
            else if(cur_remtime === next_remtime && cur_arrival > next_arrival)
            {
                let temp = data[j]
                data[j] = data[j]
                data[j+1] = temp
            }
            // else if(cur_priority > next_priority && cur_remtime === next_remtime && cur_arrival === next_arrival)
            // {
            //     let temp = data[j]
            //     data[j] = data[j+1]
            //     data[j+1] = temp
            // }
            else if(/*cur_priority === next_priority && */ cur_remtime === next_remtime && cur_arrival === next_arrival && cur_burst > next_burst)
            {
                let temp = data[j]
                data[j] = data[j]
                data[j+1] = temp
            }
        }
    }

    return data
}


module.exports = sortSrtf