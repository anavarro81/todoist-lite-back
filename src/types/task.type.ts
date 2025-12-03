import { Document, Types } from "mongoose"

export interface iTask {
    name: string,
    decription?: string | null
    created?: Date
    priority?: string | null
    deadline?: Date | null 
    dueTime?: Date | null
    user: Types.ObjectId | string
    label?: Types.ObjectId[] | null
    project?: Types.ObjectId | null
    parentTask?: Types.ObjectId | null
}

export interface TaskSearchDto {
    id: Types.ObjectId
    name: string
    decription?: string | null
    project?: Types.ObjectId | null

}

export interface UserTaskItemDto {
    _id: Types.ObjectId;
    name: string;
    description?: string | null;
    dueTime?: Date | null;
    label?: Types.ObjectId[] | null
}

export interface UserTaskResponseDto {
    tasks: UserTaskItemDto[];
    taskCounter: number
}

// Today Taks

export interface UserDayTaskItemDto {
    _id: Types.ObjectId;
    name: string;
    dueTime?: Date | null;
    description?: string | null;    
    label?: Types.ObjectId[] | null
    project?: Types.ObjectId | null;
}

export interface UserDayTasksResponseDto {
    overdue: UserDayTaskItemDto[];
    todayTasks: UserDayTaskItemDto[];
    taskCounter: number
}

// Upcoming Taks

export interface UserUpcomingTaskItemDto {
    _id: Types.ObjectId;
    name: string;
    dueTime?: Date | null;
    description?: string | null;    
    label?: Types.ObjectId[] | null
    project?: Types.ObjectId | null;
}

export interface listTasks {
	date: string  // formato: dia + mes(3) * Today * Dia de la semana
	tasks:UserUpcomingTaskItemDto []
}

export interface UserUpcomingTaskResponseDto {
    overdue: UserUpcomingTaskItemDto[];
    todayTasks: listTasks[];
    upcomingTask: listTasks[];    
}




export type TaskDocument = iTask & Document