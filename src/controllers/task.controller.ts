import * as taskServices from "@services/task.services"
import { Request, Response, NextFunction } from "express"
import {validateTask} from '../utils/validators/task.validator'
import logger from "@utils/logger"
import AppError from "../errors/AppError"

export const getUserTasks = async(req: Request, res: Response, next: NextFunction) => {
    
    try {        
        const {id} = req.user
        const tasks = await taskServices.getUserTasks(id)
        res.status(200).json({tasks})
        
    } catch (error) {
        next(error)
    }
}

export const newTask = async(req: Request, res: Response, next: NextFunction) => {
    
    try {        
        
        const result = validateTask(req.body)

        if (!result.valid) {
            logger.error('Datos de la tarea no validos ', result.errors)
            console.log('error ', result.errors)
            throw AppError.badRequest("Error en los datos de la tarea", result.errors)
        }
        
        const newtask = await taskServices.newTask(req.body)
        res.status(201).json({newtask})
        
    } catch (error) {
        next(error)
    }
}

