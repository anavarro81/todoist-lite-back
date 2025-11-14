 import * as taskServices from "@services/task.services"
 import { Request, Response, NextFunction } from "express"


export const getAllTask = async(req: Request, res: Response, next: NextFunction) => {
    
    try {
        
        const tasks = await taskServices.getAllTask()
        res.status(200).json({tasks})
        
    } catch (error) {
        next(error)
    }
}