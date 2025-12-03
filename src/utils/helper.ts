

export const groupTaskByDate = (tasks: any) => {

    let overdueTask  = []
    let todayTask   = []
    let upcomingTask = []

    const today = new Date()
    const startofDay = new Date(today)
    startofDay.setHours(0,0,0,0)
    const endofday = new Date(today)
    endofday.setHours(23,59,59,999)

    
    for (const t of tasks) {              

        if (t.dueTime < startofDay) {
            overdueTask.push(t)
        } else if ((t.dueTime > endofday)){
            upcomingTask.push(t) 
        } else {
            todayTask.push(t)
        }
    }

    return {
       overdueTask,
       todayTask,
       upcomingTask 
    }
    

}
