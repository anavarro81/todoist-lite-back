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
}

export interface UserTaskResponseDto {
    tasks: UserTaskItemDto[];
    taskCounter: number
}

export type TaskDocument = iTask & Document