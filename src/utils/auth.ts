import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import AppError from "../errors/AppError"
import logger from "../utils/logger"
export const hashPassword = async (password: string): Promise<string> => {

    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)

}

export const comparePassword = async (password: string, hashPassword: string) => {

    return await bcrypt.compare(password,hashPassword)

}

export const generateToken = async(id: string, email: string) => {

    const payload = {id, email}

    if (!process.env.JWT_KEY) {
        logger.error('JWT_KEY no existe')
        throw AppError.forbiden('JWT_KEY no existe')
    }

    return jwt.sign(payload, process.env.JWT_KEY, {expiresIn: "1h"})

}