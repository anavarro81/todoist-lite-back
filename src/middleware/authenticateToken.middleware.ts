import { Request, Response, NextFunction } from "express"
import logger from "../utils/logger"
import AppError from "../errors/AppError"


const authenticateToken = (req: Request, res: Response, next: NextFunction) => {

    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
        logger.error('No existe token; No autorizdo')
        throw AppError.unauthorized('Usuario no autoizado')
    }



}

export default authenticateToken