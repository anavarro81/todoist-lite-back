import { Request, Response, NextFunction } from "express"
import AppError from "../errors/AppError"
import logger from '../utils/logger'
import taskModel from '@models/task.model'

export const getUserTasks = async () => {

    try {
        return await taskModel.find({})
    } catch (error) {
       const errorMessage = error instanceof Error ? error.message : String(error)
       logger.error(errorMessage) 
       throw AppError.unexpected('error al obtener las tareas')
    }
    
}

