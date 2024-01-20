const formDOM = document.querySelector(".scheduling-form")
const tableDOM = document.querySelector(".table")
const chartDOM = document.querySelector(".chart")
const errorDOM = document.querySelector(".error")
const tableRow = document.querySelector(".processes")
const answerDOM = document.querySelector(".answer")
const avgttDOM = document.querySelector("#avgtt")
const avgwtDOM = document.querySelector("#avgwt")
const downloadBtn = document.querySelector("#download")


answerDOM.style.display = "none"
errorDOM.style.display = "none"


let downloadED = "disable" 
downloadBtn.classList.add("download-disable");





const quantaLine = document.querySelector("#quantaLine")
quantaLine.style.display = "none"

const priorityLine = document.querySelector("#priorityLine")
priorityLine.style.display = "none"

const selectSched = document.querySelector("#scheduling")




selectSched.addEventListener("change", ()=>{

  formDOM.quanta.value = ""
  formDOM.priority.value = ""

  let sched = selectSched.value

  if(sched==="rr")
  quantaLine.style.display = "initial"
  else
  quantaLine.style.display = "none"
  

  if(sched==="ps")
  priorityLine.style.display = "initial"
  else
  priorityLine.style.display = "none"

})





formDOM.addEventListener("change", () => {

  downloadED = "disable" 
  downloadBtn.classList.add("download-disable");

})





formDOM.addEventListener("submit", async (event) => {

  event.preventDefault()

  const scheduling = formDOM.scheduling.value
  const pid = formDOM.pid.value
  const arrival = formDOM.arrival.value
  const burst = formDOM.burst.value
  const priority = formDOM.priority.value
  const quanta = formDOM.quanta.value
  
  answerDOM.style.display = "none"
  errorDOM.style.display = "none"

  tableRow.innerHTML = ""
  chartDOM.innerHTML = ""

  try {

    let response = await axios.post(`/api/scheduling/${scheduling}`, {
      scheduling,
      pid,
      arrival,
      burst,
      priority,
      quanta
    })


    response = response.data.result

    let pids = pid.split(',')

    for(let i=1;i<pids.length;i++)
    {
      let row = document.createElement('tr')
      row.className = pids[i]
      tableRow.appendChild(row)

      let currow = document.querySelector(`.${pids[i]}`)

      for(let x in response.processes[pids[i]])
      {
        let data = document.createElement('td')
        data.innerHTML = response.processes[pids[i]][x]
        currow.appendChild(data)
      }
    }


    //average showing
    {

      let row = document.createElement('tr')
      row.className = "avg"
      tableRow.appendChild(row)

      let currow = document.querySelector(".avg")

      let data = document.createElement('td')
      data.innerHTML = "Average : "
      data.colSpan = 3
      currow.appendChild(data)

      data = document.createElement('td')
      data.innerHTML = response.avgburst
      currow.appendChild(data)

      data = document.createElement('td')
      data.innerHTML = response.avgturnaround
      currow.appendChild(data)

      data = document.createElement('td')
      data.innerHTML = response.avgwaiting
      currow.appendChild(data)
      
      data = document.createElement('td')
      data.innerHTML = response.avgcompletion
      currow.appendChild(data)
    }


    let gc = response.showgc

    let cl = Object.keys(gc).length
    

    for(let i=0;i<=cl;i++)
    {
      let chartline = document.createElement('div')
      chartline.className = "chartline"
      chartline.id = "chartline" + i
      chartDOM.appendChild(chartline)
      
      chartline = document.querySelector(`#chartline${i}`)
      
      let boxes = document.createElement('div')
      boxes.className = "boxes"
      boxes.id = "boxes" + i
      chartline.appendChild(boxes)

      boxes = document.querySelector(`#boxes${i}`)

      let s = gc[i]['s']

      let allboxes = s.map((ele)=>{
        return (`<div class="box"><span>${ele}</span></div>`)
      }).join('')

      boxes.innerHTML = allboxes
      
      let timestamps = document.createElement('div')
      timestamps.className = "timestamps"
      timestamps.id = "timestamps" + i
      chartline.appendChild(timestamps)

      timestamps = document.querySelector(`#timestamps${i}`)

      let t = gc[i]['t']

      let allstamps = t.map((ele)=>{
        return (`<div class="timestamp">${ele}</div>`)
      }).join('')

      timestamps.innerHTML = allstamps

    }


    answerDOM.style.display = "flex"
    

    downloadED = "enable" 
    downloadBtn.classList.remove("download-disable");


  } catch (error) {

    errorDOM.innerHTML = "Please check the input, and Try again!"
    errorDOM.style.display = "initial"
    
  }
})


downloadBtn.addEventListener("click", () => {

  if(downloadED==="disable")
  return ;

  const toDownload = document.querySelector('body');

  html2canvas(toDownload,{

  }).then(function (canvas) {

    const link = document.createElement('a');
    link.download = 'answer_SchedX.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
    
  });

})
