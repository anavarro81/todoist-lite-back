import { Response, Request, NextFunction } from "express";
import {validateAuth} from '../utils/validator'
import * as AuthServices from '@services/user.service'

export const login = async (req: Request, res: Response, next: NextFunction) => {       

    try {
        
        const {email, password} = req.body

        const validUser = validateAuth(req.body)

        if (!validUser.valid) {
            res.status(400).json({
                message: "Datos del rgistro no validos", 
                errors: validUser.errors
            })
        }

        const userLogged = await AuthServices.login(req.body)

        res.status(200).json({userLogged})

        

    } catch (error) {
        next(error)
    }





    


}

export const register = async (req: Request, res: Response, next: NextFunction) => { 

    try {

        const {email, password} = req.body
        
        const validRegister = validateAuth(req.body)

        if (!validRegister.valid) {
            res.status(400).json({
                message: "Datos del registro no validos", 
                errors: validRegister.errors
            })
        }

        const userRegister = await AuthServices.register(req.body)

        res.status(201).json({userRegister})

        
    } catch (error) {
        next(error)
        
    }
    
}
