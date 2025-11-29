import projectModel from '@models/project.model'
import AppError from '../errors/AppError'
import logger from '../utils/logger'
import {ProjectDocument} from '../types/project.types'
import {Types} from "mongoose"
import mongoose from 'mongoose'

/**
 * Crea y asocia el proyecto por defecto "Inbox" al usuario. 
 * @param userId -> Id del ususario para asociarle el proyecto
 * @param serviceName -> Nombre del servicio. Default= "Inbox"
 * @returns Proyecto creado
 */
export const createDefaultProyect = async (userId:string | Types.ObjectId, serviceName="Inbox"): Promise<ProjectDocument> => { 

    try {

        if(!userId) {
            logger.error('userId no informado')    
            throw AppError.badRequest('userid no informado')
        }

        const existingDefaultproject = await projectModel.findOne({id: userId })

        if (existingDefaultproject) {
            logger.error('Ya existe el proyecto base para el usuario')                
            AppError.badRequest('Ya existe el proyecto base para el usuario')
        }


        return await projectModel.create({
            name: serviceName,
            isDefault: true, 
            user: userId
        })
        
    } catch (error) {
        logger.error('Error al crear el proyecto ', error)
        throw AppError.unexpected('Error al crear el proyecto')
        
    }

}

export const getDefaultProject = async (userId:string | Types.ObjectId): Promise<Types.ObjectId> => {

    try {

        if (!userId) {
            logger.error('userID no informado')
            throw AppError.unexpected('userID no informado') 
        }
        
        const defaultProyect = await projectModel.findOne({user: userId, isDefault: true })

        if (!defaultProyect) {
            logger.error('No existe proyecto por defecto para el usuario')
            throw AppError.unexpected('No existe proyecto por defecto para el usuario')                        
        }

        return defaultProyect.id
        
    } catch (error) {
        logger.error('Error al recuperar el proyecto por defecto ', error)
        throw AppError.unexpected('Error al recuperar el proyecto por defecto')        
    }

}




