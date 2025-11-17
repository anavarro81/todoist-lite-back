 import * as taskServices from "@services/task.services"
 import { Request, Response, NextFunction } from "express"


export const getUserTasks = async(req: Request, res: Response, next: NextFunction) => {
    
    try {        
        const {id} = req.user
        const tasks = await taskServices.getUserTasks(id)
        res.status(200).json({tasks})
        
    } catch (error) {
        next(error)
    }
}

