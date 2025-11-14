import { Response, Request, NextFunction } from "express";
import {validateLogin} from '../utils/validator'
import * as AuthServices from '@services/user.service'

export const login = async (req: Request, res: Response, next: NextFunction) => {       

    try {
        
        const {email, password} = req.body

        const validUser = validateLogin(req.body)

        if (!validUser.valid) {
            res.status(400).json({
                message: "Datos del rgistro no validos", 
                errors: validUser.errors
            })
        }

        const userLogged = AuthServices.login(req.body)

        res.status(200).json({userLogged})

        

    } catch (error) {
        next(error)
    }





    


}

export const register = async (req: Request, res: Response, next: NextFunction) => { 
    
}
