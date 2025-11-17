import { Request, Response, NextFunction } from "express"
import logger from "../utils/logger"
import AppError from "../errors/AppError"
import {verify} from '../utils/auth'
import { JwtPayload } from "jsonwebtoken"


// Se redefine Request para agregarle el usuario. 
declare global {
    namespace Express {
        interface Request {
            user: myJwtPayload
        }
    }
}

interface myJwtPayload extends JwtPayload {
    id: string,
    email: string
}


const authenticateToken = (req: Request, res: Response, next: NextFunction) => {


    try {
            const token = req.headers.authorization?.split(' ')[1]

        if (!token) {
            logger.error('No existe token; No autoriado')
            throw AppError.unauthorized('Usuario no autorizado')
        }

        const user = verify(token)
        req.user = user
        next()

        
    } catch (error) {
      next(error);   
    }


}

export default authenticateToken