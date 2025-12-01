import AppError from "../errors/AppError"
import logger from '../utils/logger'
import taskModel from '@models/task.model'
import {TaskSearchDto, TaskDocument, iTask} from 'types/task.type'
import {getDefaultProject} from '@services/project.service'
import {Types, Document} from "mongoose"


export const getUserTasks = async (id: string): Promise<TaskDocument[]> => {

    try {

        if (!id) {
            logger.error('id de usuario no informado') 
            throw AppError.badRequest('id de usuario no informado')
        }
        
        return await taskModel.find({user: id})
    } catch (error) {
       const errorMessage = error instanceof Error ? error.message : String(error)
       logger.error(errorMessage) 
       throw AppError.unexpected('error al obtener las tareas')
    }
    
}


/**
 * Crea una nueva tarea. Si no se informa un proyecto asociado, se le asigna el proyecto por defecto inbox. 
 * @param task Datos de la tara a insertar
 * @returns Document con la tarea creada
 */

export const newTask = async(task: iTask): Promise<TaskDocument> => {

    try {

        if (!task.project) {
            const defaultProjectId = await getDefaultProject(task.user)
            task.project = defaultProjectId
        }

        return await taskModel.create(task)
        
    } catch (error) {
       const errorMessage = error instanceof Error ? error.message : String(error)
       logger.error(errorMessage) 
       throw AppError.unexpected('error al crear la tarea')
        
    }

}

/**
 * Busca lo introducido en el nombre o la descripción de la tarea
 * @param searchString cadena a buscar | puede ser una o varias palabras
 * @returns Array con la tareas cuyo nombre o descripción coincide con la busqueda. 
 */

export const searchTask = async(searchString: string, id: Types.ObjectId | string): Promise<TaskSearchDto[]>  => {

    try {


        if (!searchString) {
            logger.warn('search string vacia')
            return []
        }


        const tasks = await taskModel.find({
            $and: [
                {
                    $or: [
                        { name: { $regex: searchString, $options: "i" } },
                        { description: { $regex: searchString, $options: "i" } }
                    ]
                },
                { user: id }
            ]
        })

        const filteredTask = tasks.map(t => ({
            id: t._id,
            name: t.name,
            description: t.description,
            project: t.project,
        }))

        return filteredTask
        
    } catch (error) {
       const errorMessage = error instanceof Error ? error.message : String(error)
       logger.error(errorMessage) 
       throw AppError.unexpected('error al crear la tarea')
        
    }

}
