import AppError from "../errors/AppError"
import logger from '../utils/logger'
import taskModel from '@models/task.model'
import {TaskSearchDto, 
        TaskDocument, 
        iTask, 
        UserTaskResponseDto, 
        UserDayTasksResponseDto,
        UserDayTaskItemDto
        } 
        from 'types/task.type'
import {getDefaultProject} from '@services/project.service'
import {Types, Document} from "mongoose"


export const getUserTasks = async (id: string): Promise<UserTaskResponseDto> => {

    try {

        if (!id) {
            logger.error('id de usuario no informado') 
            throw AppError.badRequest('id de usuario no informado')
        }
        
        const tasks = await taskModel.find({user: id}, 
            {
                name: 1, 
                description: 1,    
                dueTime: 1
            }

        )

        return {tasks, taskCounter: tasks.length}

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

        // Escapara caracteres especiales por seguridad. 
        const escapeRegex = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
        const escaped = escapeRegex(searchString)
        const regex = new RegExp(escaped, 'i')



        const tasks = await taskModel.find({
            $and: [
                {
                    $or: [
                        { name: regex },
                        { description: regex }
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
       throw AppError.unexpected('error al buscar tareas')
        
    }

}

/**
 * Devuelve las taras del dia del usuario
 * @param id del usuario para el cual se obtendran las ideas. 
 * @returns Array de ideas y contador del total de ideas. 
 */

export const getDayTask = async(id: Types.ObjectId | string):Promise<UserDayTasksResponseDto> => {

    try {

        const today = new Date()
        const startofDay = new Date(today)
        startofDay.setHours(0,0,0,0)
        const endofday = new Date(today)
        endofday.setHours(23,59,59,999)

        if(!id) {
            logger.error('id del usuario no informado')      
            throw AppError.badRequest('id del usuario no informado')     
        }

        const tasks = await taskModel.find(
            { user: id, dueTime: {$lt: endofday} },
            {
                name: 1,
                dueTime: 1, 
                description: 1,                    
                label: 1,
                project: 1
                
            }
        )

        let overdueTask: UserDayTaskItemDto[] = []
        let todayTask: UserDayTaskItemDto[]  = []

        for (const t of tasks) {          

            if (t.dueTime)  
                if (t.dueTime <= startofDay) {
                    overdueTask.push(t)
                } else {
                   todayTask.push(t) 
                }
            }
            
        
        return {
            overdue:overdueTask,
            todayTasks: todayTask,
            taskCounter: tasks.length
        }        
        
    } catch (error) {
       const errorMessage = error instanceof Error ? error.message : String(error)
       logger.error(errorMessage) 
       throw AppError.unexpected('error al obtener las tareas')

        
    }

}