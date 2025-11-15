import {LoginPayload, RegisterPayload} from '../types/LoginRegister'
import userModel from '@models/user.model'
import AppError from '../errors/AppError'
import {comparePassword, hashPassword} from '../utils/auth'
import logger from '../utils/logger'
import {generateToken} from '../utils/auth'

export const login = async(payload: LoginPayload) => {

    try {

        const {email, password} = payload

        const user = await userModel.findOne({email})

        if (!user) {
            throw AppError.badRequest("Email no encontrado");            
        }

        const validPassword = await comparePassword(password, user.password)

        if (!validPassword) {
            throw AppError.unauthorized('Usuario o contraseña no válido')
        }

        const token = await generateToken(String(user._id), user.email)

        return {
            user: {
                _id: user._id,
                email: user.email
            },
            token
        }
        
    } catch (error) {
        
        const message = error instanceof Error ? error.message : String(error)
        logger.error(message)
        throw AppError.unexpected('Error en el login')
    }

}

export const register = async(payload: RegisterPayload) => {


    try {

        const {email, password} = payload

        const hashedPassword = await hashPassword(password)

        const user = await userModel.create({email, password: hashedPassword})

        const token = await generateToken(String(user._id), user.email)

        return {
            user: {
                _id: user._id,
                email: user.email
            },
            token
        }

        
    } catch (error) {

        const message = error instanceof Error ? error.message : String(error)
        logger.error(message)
        throw AppError.unexpected('Error en el register')

        
    }



}