import {LoginPayload} from '../types/LoginRegister'
import userModel from '@models/user.model'
import AppError from '../errors/AppError'
import {comparePassword} from '../utils/auth'
import logger from '../utils/logger'

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

        return user
        
    } catch (error) {
        
        const message = error instanceof Error ? error.message : String(error)
        logger.error(message)
        throw AppError.unexpected('Error en el login')
    }

}