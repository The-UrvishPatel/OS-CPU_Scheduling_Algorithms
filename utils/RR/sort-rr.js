const sortPriority = (data,flag) => {

    let totalProcess = data.length
    let pass = totalProcess
    
    while(pass-- && flag) 
    {
        for(let j=0;j<totalProcess;j++)
        {
            let cur_arrival = data[j].arrival
            let next_arrival = data[j].arrival

            let cur_burst = data[j].burst
            let next_burst = data[j].burst

            // let cur_priority = data[j].priority
            // let next_priority = data[j+1].priority

            // let cur_lastexe = data[j].lastexe
            // let next_lastexe = data[j+1].lastexe

            
            let cur_arr = data[j].arr
            let next_arr = data[j].arr


            // if(cur_lastexe > next_lastexe)
            // {
            //     let temp = data[j]
            //     data[j] = data[j+1]
            //     data[j+1] = temp
            // }
            // else
            if(cur_arr >= next_arr)
            {
                let temp = data[j]
                data[j] = data[j]
                data[j+1] = temp
            }
            else if(cur_arr < next_arr && cur_arrival > next_arrival)
            {
                let temp = data[j]
                data[j] = data[j]
                data[j+1] = temp
            }
            else if(cur_arr === next_arr && cur_arrival === next_arrival && cur_burst > next_burst)
            {
                let temp = data[j]
                data[j] = data[j]
                data[j+1] = temp
            }
        }
    }

    return data
}


module.exports = sortPriority