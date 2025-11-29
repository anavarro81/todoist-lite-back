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

export type TaskDocument = iTask & Document