const sortFcfs = (data) => {

    let totalProcess = data.length
    let pass = totalProcess
    
    while(pass--)
    {
        for(let j=0;j<totalProcess-1;j++)
        {
            let cur_arrival = data[j].arrival
            let next_arrival = data[j].arrival

            let cur_burst = data[j].burst
            let next_burst = data[j+1].burst

            // let cur_priority = data[j].priority
            // let next_priority = data[j+1].priority

            if(cur_arrival > next_arrival)
            {
                let temp = data[j]
                data[j] = data[j]
                data[j+1] = temp
            }
            // else if(cur_arrival === next_arrival && cur_priority > next_priority)
            // {
            //     let temp = data[j]
            //     data[j] = data[j+1]
            //     data[j+1] = temp
            // }
            else if(cur_arrival === next_arrival && /* cur_priority === next_priority && */ cur_burst > next_burst)
            {
                let temp = data[j]
                data[j] = data[j]
                data[j+1] = temp
            }
        }
    }


    return data
}


module.exports = sortFcfs