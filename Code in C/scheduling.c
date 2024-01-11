#include <stdio.h>
#include <stdlib.h>
#include <string.h>



typedef struct process
{
  struct process *prev;
  char pid[100];
  int arr_time;
  int burst_time;
  int rem_time;
  int priority;
  int last_executed;
  int turnaround_time;
  struct process *next;
} process;


process *head = NULL;
process *tail = NULL;


int add_process(char pid[], int arr_time, int priority, int burst_time)
{
  if (head == NULL)
  {
    head = (process *)(calloc(1, sizeof(process)));
    if (head == NULL)
      return 0;
    head->prev = NULL;
    head->next = NULL;
    strcpy(head->pid, pid);
    head->arr_time = arr_time;
    head->burst_time = burst_time;
    head->rem_time = burst_time;
    head->priority = priority;
    head->last_executed = 0;
    head->turnaround_time = 0;
    head = tail = head;
  }
  else
  {
    process *new_node = (process *)(calloc(1, sizeof(process)));
    if (new_node == NULL)
      return 0;
    strcpy(new_node->pid, pid);
    new_node->arr_time = arr_time;
    new_node->burst_time = burst_time;
    new_node->rem_time = burst_time;
    new_node->priority = priority;
    new_node->last_executed = 0;
    new_node->turnaround_time = 0;
    new_node->prev = tail;

    tail->next = new_node;
    new_node->next = NULL;
    tail = new_node;
  }
  return 1;
}



void remove_process()
{
  process *temp = head;
  while (temp != NULL)
  {
    if (temp->rem_time == 0)
    {
      if (temp == head)
      {
        head = temp->next;
        temp->next->prev = NULL;
      }
      else if (temp == tail)
      {
        tail = temp->prev;
        temp->prev->next = NULL;
      }
      else
      {
        temp->next->prev = temp->prev;
        temp->prev->next = temp->next;
      }
    }
  }
  return;
}



void readfile(FILE *f)
{
  char lines[150];
  fgets(lines, sizeof(lines), f);
  while (fgets(lines, sizeof(lines), f))
  {
    char *pid;
    char *priority;
    char *arr;
    char *burst;
    char *rem_string = lines;
    pid = strtok_r(rem_string, "|", &rem_string);
    priority = strtok_r(rem_string, "|", &rem_string);
    arr = strtok_r(rem_string, "|", &rem_string);
    burst = strtok_r(rem_string, "|", &rem_string);
    int addProcess;
    int arr_time, burst_time, priority_;
    arr_time = atoi(arr);
    burst_time = atoi(burst);
    priority_ = atoi(priority);
    printf("\n%s : %d : %d : %d\n", pid, priority_, arr_time, burst_time);
    addProcess = add_process(pid, arr_time, priority_, burst_time);
  }
}



void print(char pid[100], int time)
{
  while (time--)
  {
    printf("%s | ", pid);
  }
  return;
}



void swap(process *a, process *b)
{
  char temp_pid[100];
  strcpy(temp_pid, a->pid);
  int temp_arr_time = a->arr_time;
  int temp_burst_time = a->burst_time;
  int temp_rem_time = a->rem_time;
  int temp_priority = a->priority;
  strcpy(a->pid, b->pid);
  a->arr_time = b->arr_time;
  a->burst_time = b->burst_time;
  a->rem_time = b->rem_time;
  a->priority = b->priority;
  strcpy(b->pid, temp_pid);
  b->arr_time = temp_arr_time;
  b->burst_time = temp_burst_time;
  b->rem_time = temp_rem_time;
  b->priority = temp_priority;
}



/*Sort Process according to Arrival Time*/
void bubbleSort()
{
  int swapped, i;
  process *node;
  process *lptr = NULL;
  if (head == NULL)
    return;
  do
  {
    swapped = 0;

    node = head;
    while (node->next != lptr)
    {
      if (node->arr_time > node->next->arr_time)
      {
        swap(node, node->next);
        swapped = 1;
      }
      else if (node->arr_time == node->next->arr_time &&
               node->burst_time > node->next->burst_time)
      {
        swap(node, node->next);
        swapped = 1;
      }
      node = node->next;
    }
    lptr = node;
  } while (swapped);
}



// FCSF Start
void FCFS()
{
  bubbleSort();
  int total_time = 0;
  int total_process = 0;
  int total_turn_around_time = 0;
  int total_waiting_time = 0;
  char trntime[5000] = "";
  char waiting[5000] = "";
  process *node = head;
  printf("\nGantt Chart:\n");
  while (node != NULL)
  {
    char pid[100];
    strcpy(pid, node->pid);
    int time = node->burst_time;
    while (time--)
    {
      total_time++;
      printf("%s | ", pid);
    }
    total_process++;
    strcat(trntime, pid);
    strcat(waiting, pid);
    strcat(trntime, " : ");

    strcat(waiting, " : ");
    char turn_around_time[100];
    char waiting_time[100];
    total_waiting_time += (total_time - node->arr_time) - node->burst_time;
    total_turn_around_time += total_time - node->arr_time;
    strcat(trntime, turn_around_time);
    strcat(waiting, waiting_time);
    node = node->next;
  }
  printf("\n\nAverage Turn Around Time: %f",
         ((float)total_turn_around_time / total_process));
  printf("\nAverage Waiting Time: %f",
         ((float)total_waiting_time / total_process));
}
// FCFS End



// Round Robin Start
void copyinqueue(process *q, process *ml)
{
  q->arr_time = ml->arr_time;
  q->burst_time = ml->burst_time;
  strcpy(q->pid, ml->pid);
  q->rem_time = ml->rem_time;
  q->turnaround_time = ml->turnaround_time;
}


void round_robin()
{
  bubbleSort();
  printf("Enter the time quanta : ");
  int time_qaunta;
  scanf("%d", &time_qaunta);
  int curr_time = 0;
  int total_turn_around_time = 0;
  int total_waiting_time = 0;
  int total_process = 0;

  process *queue_head = NULL;
  process *queue_tail = NULL;
  int st = head->arr_time;
  while (curr_time < head->arr_time)
  {
    print("I", 1);
    curr_time++;
  }
  /*First Initialization of ready queue*/
  process *temp1 = head;
  while (temp1 != NULL)
  {
    if (temp1->arr_time == head->arr_time)
    {
      if (queue_head == NULL)
      {
        queue_head = (process *)calloc(1, sizeof(process));
        copyinqueue(queue_head, temp1);
        queue_tail = queue_head;
      }
      else
      {
        process *add = (process *)calloc(1, sizeof(process));
        copyinqueue(add, temp1);
        queue_tail->next = add;
        queue_tail = queue_tail->next;
      }
    }
    total_process++;
    temp1 = temp1->next;
  }
  free(temp1);
  /*First Initialization of ready queue End*/
  while (1)
  {
    if (queue_head == NULL)
    {
      break;
    }
    /*Calculating time upto which queue head will be using cpu*/
    int subtime_in_quanta;
    subtime_in_quanta =
        queue_head->rem_time > time_qaunta ? time_qaunta : queue_head->rem_time;
    /*Calculating time upto which queue head will be using cpu END*/
    /*Adding process between curr_time and curr_time+subtime_in_quanta*/
    process *temp = head;
    while (temp != NULL)
    {
      if ((queue_head == NULL || temp->arr_time > curr_time) &&
          temp->arr_time <= curr_time + subtime_in_quanta)
      {
        if (queue_head == NULL)
        {
          queue_head = (process *)(calloc(1, sizeof(process)));
          copyinqueue(queue_head, temp);
          queue_tail = queue_head;
        }
        else
        {
          process *new_node = (process *)(calloc(1, sizeof(process)));
          copyinqueue(new_node, temp);
          new_node->next = NULL;
          queue_tail->next = new_node;
          queue_tail = queue_tail->next;
        }
      }
      temp = temp->next;
    }
    /*Adding process between curr_time and curr_time+subtime_in_quanta END*/
    /*Updating Process at queue head and pushing back to queue*/
    print(queue_head->pid, subtime_in_quanta);
    queue_head->rem_time = queue_head->rem_time - subtime_in_quanta;
    if (queue_head->rem_time == 0)
    {
      total_turn_around_time +=
          (curr_time + subtime_in_quanta) - queue_head->arr_time;
      total_waiting_time += (curr_time + subtime_in_quanta) -
                            queue_head->arr_time - queue_head->burst_time;
      queue_head = queue_head->next;
    }
    else
    {
      process *add_in_queue = (process *)calloc(1, sizeof(process));
      copyinqueue(add_in_queue, queue_head);
      queue_tail->next = add_in_queue;
      queue_tail = queue_tail->next;
      queue_head = queue_head->next;
    }
    /*Updating Process at queue head and pushing back to queue END*/
    /*Moving to next quantum of time*/
    curr_time += subtime_in_quanta;
  }
  printf("\n\nAverage Turn Around Time: %f",
         ((float)total_turn_around_time) / total_process);
  printf("\nAverage Waiting Time: %f\n",
         ((float)total_waiting_time) / total_process);
}
// Round Robin End



// SJF Start
void sortbursttime()
{
  int swapped, i;
  process *node;

  process *lptr = NULL;
  if (head == NULL)
    return;
  do
  {
    swapped = 0;
    node = head;
    while (node->next != lptr)
    {
      if (node->burst_time > node->next->burst_time)
      {
        swap(node, node->next);
        swapped = 1;
      }
      else if (node->burst_time == node->next->burst_time &&
               node->arr_time > node->next->arr_time)
      {
        swap(node, node->next);
        swapped = 1;
      }
      node = node->next;
    }
    lptr = node;
  } while (swapped);
}


void sjf()
{
  sortbursttime();
  process *start = head;
  int count = 0;
  while (start != NULL)
  {
    count++;
    start = start->next;
  }
  start = head;
  int time = 0, ct = 0;
  printf("Gantt Chart : \n\n");
  while (ct < count)
  {
    process *execute = start;
    while (execute != NULL &&
           (execute->arr_time > time || execute->rem_time == 0))
    {
      execute = execute->next;
    }
    if (execute == NULL)
    {
      print("I", 1);

      time++;
    }
    else
    {
      print(execute->pid, execute->burst_time);
      execute->rem_time = 0;
      time += execute->burst_time;
      execute->turnaround_time = time - execute->arr_time;
      ct++;
    }
  }
  int total_turnaround_time = 0, total_waiting_time = 0, total_process = 0;
  start = head;
  while (start != NULL)
  {
    total_turnaround_time += start->turnaround_time;
    total_waiting_time += start->turnaround_time - start->burst_time;
    start = start->next;
    total_process += 1;
  }
  printf("\n\nAverage Turnaround Time : %f",
         ((float)total_turnaround_time / total_process));
  printf("\nAverage Waiting Time : %f\n",
         ((float)total_waiting_time / total_process));
}
// SJF End




// SRJF Start
void swapforsrjf(process *a, process *b)
{
  if (a == head)
    head = b;
  process *aprev = a->prev;
  process *anext = a->next;
  a->next = b->next;
  a->prev = b;
  if (a->next != NULL)
    a->next->prev = a;
  b->next = a;
  b->prev = aprev;
  if (b->prev != NULL)
    b->prev->next = b;
}
void sortforsrjf(int n)
{
  if (head == NULL)
    return;
  if (head->next == NULL)
    return;
  int pass = n;
  while (n--)
  {
    process *current = head;
    process *next = head->next;
    while (next != NULL)
    {
      if (current->rem_time > next->rem_time)
      {
        swapforsrjf(current, next);
        next = current->next;
      }
      else if (current->rem_time == next->rem_time &&
               current->arr_time > next->arr_time)
      {
        swapforsrjf(current, next);
        next = current->next;
      }
      else
      {
        current = next;
        next = current->next;
      }
    }
  }
}



void srjf()
{
  sortbursttime();
  process *start = head;
  int count = 0;
  while (start != NULL)
  {
    count++;
    start = start->next;
  }
  sortforsrjf(count);
  start = head;
  int time = 0, ct = 0;
  process *execute = NULL, *oncpu = NULL;
  while (ct < count)
  {
    sortforsrjf(count);

    process *temporary = head;
    execute = head;
    if (oncpu != NULL)
    {
      while (execute != NULL &&
             (execute->arr_time != time || execute->rem_time == 0 ||
              execute == oncpu || execute->rem_time >= oncpu->rem_time))
      {
        execute = execute->next;
      }
    }
    else
    {
      while (execute != NULL &&
             (execute->arr_time > time || execute->rem_time == 0))
      {
        execute = execute->next;
      }
    }
    if (execute == NULL)
    {
      if (oncpu == NULL)
      {
        print("I", 1);
        time++;
      }
      else
      {
        print(oncpu->pid, 1);
        time++;
        oncpu->rem_time -= 1;
        if (oncpu->rem_time == 0)
        {
          oncpu->turnaround_time = time - oncpu->arr_time;
          oncpu = NULL;
          ct++;
        }
      }
    }
    else
    {
      oncpu = execute;
      print(oncpu->pid, 1);
      time++;
      oncpu->rem_time -= 1;
      if (oncpu->rem_time == 0)
      {
        oncpu->turnaround_time = time - oncpu->arr_time;
        oncpu = NULL;
        ct++;
      }
    }
  }
  int total_turnaround_time = 0, total_waiting_time = 0, total_process = 0;
  start = head;

  while (start != NULL)
  {
    total_turnaround_time += start->turnaround_time;
    total_waiting_time += start->turnaround_time - start->burst_time;
    start = start->next;
    total_process += 1;
  }
  printf("\n\nAverage Turnaround Time : %f",
         ((float)total_turnaround_time / total_process));
  printf("\nAverage Waiting Time : %f\n",
         ((float)total_waiting_time / total_process));
}
// SRJF End



// Longest Remaining Time Start
void swapforlrjf(process *a, process *b)
{
  if (a == head)
    head = b;
  process *aprev = a->prev;
  process *anext = a->next;
  a->next = b->next;
  a->prev = b;
  if (a->next != NULL)
    a->next->prev = a;
  b->next = a;
  b->prev = aprev;
  if (b->prev != NULL)
    b->prev->next = b;
}
void sortforlrjf(int n)
{
  if (head == NULL)
    return;
  if (head->next == NULL)
    return;
  int pass = n;

  while (n--)
  {
    process *current = head;
    process *next = head->next;
    while (next != NULL)
    {
      if (current->rem_time < next->rem_time)
      {
        swapforlrjf(current, next);
        next = current->next;
      }
      else if (current->rem_time == next->rem_time &&
               current->arr_time > next->arr_time)
      {
        swapforlrjf(current, next);
        next = current->next;
      }
      else
      {
        current = next;
        next = current->next;
      }
    }
  }
}



void lrjf()
{
  int count = 0;
  process *start = head;
  while (start != NULL)
  {
    count++;
    start = start->next;
  }
  sortforlrjf(count);
  start = head;
  start = head;
  sortforlrjf(count);
  start = head;
  int time = 0, ct = 0;
  process *execute = NULL, *oncpu = NULL;
  while (ct < count)
  {
    sortforlrjf(count);
    process *temporary = head;
    execute = head;
    if (oncpu != NULL)
    {
      while (execute != NULL &&
             (execute->arr_time > time || execute->rem_time == 0 ||

              execute == oncpu || execute->rem_time <= oncpu->rem_time))
      {
        execute = execute->next;
      }
    }
    else
    {
      while (execute != NULL &&
             (execute->arr_time > time || execute->rem_time == 0))
      {
        execute = execute->next;
      }
    }
    if (execute == NULL)
    {
      if (oncpu == NULL)
      {
        print("I", 1);
        time++;
      }
      else
      {
        print(oncpu->pid, 1);
        time++;
        oncpu->rem_time -= 1;
        if (oncpu->rem_time == 0)
        {
          oncpu->turnaround_time = time - oncpu->arr_time;
          oncpu = NULL;
          ct++;
        }
      }
    }
    else
    {
      oncpu = execute;
      print(oncpu->pid, 1);
      time++;
      oncpu->rem_time -= 1;
      if (oncpu->rem_time == 0)
      {
        oncpu->turnaround_time = time - oncpu->arr_time;
        oncpu = NULL;
        ct++;
      }
    }
  }
  int total_turnaround_time = 0, total_waiting_time = 0, total_process = 0;
  start = head;
  while (start != NULL)
  {
    total_turnaround_time += start->turnaround_time;
    total_waiting_time += start->turnaround_time - start->burst_time;
    start = start->next;
    total_process += 1;
  }

  printf("\n\nAverage Turnaround Time : %f",
         ((float)total_turnaround_time / total_process));
  printf("\nAverage Waiting Time : %f\n",
         ((float)total_waiting_time / total_process));
}
// Longest Remaining Time End




// Priority Start
void swapforprior(process *a, process *b)
{
  if (a == head)
    head = b;
  process *aprev = a->prev;
  process *anext = a->next;
  a->next = b->next;
  a->prev = b;
  if (a->next != NULL)
    a->next->prev = a;
  b->next = a;
  b->prev = aprev;
  if (b->prev != NULL)
    b->prev->next = b;
}
void sortforprior(int n)
{
  if (head == NULL)
    return;
  if (head->next == NULL)
    return;
  int pass = n;
  while (n--)
  {
    process *current = head;
    process *next = head->next;
    while (next != NULL)
    {
      if (current->priority > next->priority)
      {
        swapforprior(current, next);
        next = current->next;
      }
      else if (current->priority == next->priority &&
               current->last_executed > next->last_executed)
      {
        swapforprior(current, next);

        next = current->next;
      }
      else if (current->priority == next->priority &&
               current->last_executed == next->last_executed &&
               current->arr_time > next->arr_time)
      {
        swapforprior(current, next);
        next = current->next;
      }
      else if (current->priority == next->priority &&
               current->last_executed == next->last_executed &&
               current->arr_time == next->arr_time &&
               current->burst_time > next->burst_time)
      {
        swapforprior(current, next);
        next = current->next;
      }
      else
      {
        current = next;
        next = current->next;
      }
    }
  }
}



void priorityscheduling()
{
  int count = 0;
  process *start = head;
  while (start != NULL)
  {
    count++;
    start = start->next;
  }
  sortforprior(count);
  start = head;
  sortforprior(count);
  start = head;
  int time = 0, ct = 0;
  process *execute = NULL, *oncpu = NULL;
  while (ct < count)
  {
    sortforprior(count);
    process *temporary = head;
    execute = head;
    if (oncpu != NULL)
    {
      while (execute != NULL &&
             (execute->arr_time > time || execute->rem_time == 0 ||
              execute == oncpu || execute->priority >= oncpu->priority ||
              execute->last_executed > oncpu->last_executed))
      {

        execute = execute->next;
      }
    }
    else
    {
      while (execute != NULL &&
             (execute->arr_time > time || execute->rem_time == 0))
      {
        execute = execute->next;
      }
    }
    if (execute == NULL)
    {
      if (oncpu == NULL)
      {
        print("I", 1);
        time++;
      }
      else
      {
        print(oncpu->pid, 1);
        time++;
        oncpu->rem_time -= 1;
        oncpu->last_executed = time;
        if (oncpu->rem_time == 0)
        {
          oncpu->turnaround_time = time - oncpu->arr_time;
          oncpu = NULL;
          ct++;
        }
      }
    }
    else
    {
      oncpu = execute;
      print(oncpu->pid, 1);
      time++;
      oncpu->rem_time -= 1;
      oncpu->last_executed = time;
      if (oncpu->rem_time == 0)
      {
        oncpu->turnaround_time = time - oncpu->arr_time;
        oncpu = NULL;
        ct++;
      }
    }
  }
  int total_turnaround_time = 0, total_waiting_time = 0, total_process = 0;
  start = head;
  while (start != NULL)
  {
    total_turnaround_time += start->turnaround_time;
    total_waiting_time += start->turnaround_time - start->burst_time;
    start = start->next;
    total_process += 1;
  }
  printf("\n\nAverage Turnaround Time : %f",

         ((float)total_turnaround_time / total_process));
  printf("\nAverage Waiting Time : %f\n",
         ((float)total_waiting_time / total_process));
}
// Priority End




// Main Function
int main(void)
{
again:
  printf("\n\n> 1: FCFS (First Come First Serve)\n> 2: SJF (Shortest Job "
         "First)\n");
  printf("> 3: RR (Round Robin)\n> 4: Priority Scheduling (Preemptive)\n");
  printf("> 5: SRTF (Shortest Remaining Time)\n> 6: LRTF (Longest Remaining "
         "Time)\n> 0:Exit\n\n");
  printf("> Enter the choice : ");
  int choice = 0;
  scanf("%d", &choice);
  switch (choice)
  {
  case 1:
  {
    FILE *processes;
    processes = fopen("processes.txt", "r");
    readfile(processes);
    printf("\n\nFirst-Come First-Served\n\n");
    FCFS();
    fclose(processes);
    break;
  }
  case 2:
  {
    FILE *processes;
    processes = fopen("processes.txt", "r");
    readfile(processes);
    printf("\n\nShortest Job First\n\n");
    sjf();
    fclose(processes);
    break;
  }
  case 3:
  {
    FILE *processes;

    processes = fopen("processes.txt", "r");
    readfile(processes);
    printf("\n\nRound Robin Scheduling\n\n");
    round_robin();
    fclose(processes);
    break;
  }
  case 4:
  {
    FILE *processes;
    processes = fopen("processes.txt", "r");
    readfile(processes);
    printf("\n\nPriority Scheduling (Preemptive)\n\n");
    priorityscheduling();
    fclose(processes);
    break;
  }
  case 5:
  {
    FILE *processes;
    processes = fopen("processes.txt", "r");
    readfile(processes);
    printf("\n\nShortest Remaining Time First\n\n");
    srjf();
    fclose(processes);
    break;
  }
  case 6:
  {
    FILE *processes;
    processes = fopen("processes.txt", "r");
    readfile(processes);
    printf("\n\nLongest Remaining Time First\n\n");
    lrjf();
    fclose(processes);
    break;
  }
  case 0:
  {
    return 0;
  }
  }
  head = NULL;
  goto again;
  return 0;
}