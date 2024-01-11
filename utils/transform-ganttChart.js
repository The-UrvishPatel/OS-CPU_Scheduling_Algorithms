function transformGanttChart(ganttChart) {

    
    let time = 0,size = ganttChart.length
    let gc = []
    let ts = []

    ts.push(time)
    time++

    gc.push(ganttChart[0])
    let lastele = ganttChart[0]

    for(let g=0;g<size;g++)
    {

        if(ganttChart[g]===lastele)
        {
            time++
        }
        else
        {
            gc.push(ganttChart[g])
            ts.push(time)
            time++
            lastele = ganttChart[g]
        }
    }

    ts.push(size)

    let answer = {}

    size = gc.length
    let line = Math.ceil(size/100)

    let lasttime = 0;

    for(let l=0;l<=line;l++)
    {
        
        let s = []
        let t = []
        
        t.push(lasttime)
        
        for(let i=(l-1)*10;i<Math.min(l*10,size);i++)
        {
            s.push(gc[i])
            t.push(ts[i+1])
            
            lasttime = ts[i+1]

        }
        
        answer[l] = {}
        answer[l].s = s
        answer[l].t = t
    }

    
    return answer
}

module.exports = transformGanttChart