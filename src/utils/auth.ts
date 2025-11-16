import bcrypt from "bcrypt"
import jwt, { JwtPayload } from "jsonwebtoken"
import AppError from "../errors/AppError"
import logger from "../utils/logger"
export const hashPassword = async (password: string): Promise<string> => {

    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)

}

interface myJwtPayload extends JwtPayload {
    id: string,
    email: string
}

export const comparePassword = async (password: string, hashPassword: string) => {

    return await bcrypt.compare(password,hashPassword)

}

export const generateToken =(id: string, email: string) => {

    const payload = {id, email}

    if (!process.env.JWT_KEY) {
        logger.error('JWT_KEY no existe')
        throw AppError.forbidden('JWT_KEY no existe')
    }

    return jwt.sign(payload, process.env.JWT_KEY, {expiresIn: "1h"})

}

export const verify = (token: string) => {

    if (!process.env.JWT_KEY) {
        logger.error('JWT_KEY no existe')
        throw AppError.forbidden('JWT_KEY no existe')
    }


    try {
            const decoded = jwt.verify(token, process.env.JWT_KEY) as myJwtPayload
            return decoded
        
    } catch (err) {
        logger.error(`Error al verificar el token: `, err)
        throw AppError.forbidden('Error al validar el token')
        
    }


}

