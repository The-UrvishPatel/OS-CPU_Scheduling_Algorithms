const formDOM = document.querySelector(".scheduling-form");
const answerDOM = document.querySelector(".answer");

formDOM.addEventListener("submit", async (event) => {
  event.preventDefault();

  const scheduling = formDOM.scheduling.value;
  const pid = formDOM.pid.value;
  const arrival = formDOM.arrival.value;
  const burst = formDOM.burst.value;
  const priority = formDOM.priority.value;

  try {
    const response = await axios.post(`/api/scheduling/${scheduling}`, {
      pid,
      arrival,
      burst,
      priority,
    });

    // console.log({
    //   pid,
    //   arrival,
    //   burst,
    //   priority,
    // })

    console.log(response)
    
    answerDOM.textContent = response.data.ganttChart + "\n" + 
    response.data.waiting + "\n" + 
    response.data.turnaround + "\n" + 
    response.data.avgturnaround + "\n" + 
    response.data.avgwaiting;

  } catch (error) {
    answerDOM.textContent = error;
  }
});
