import Joi from "joi";
import {ValidationResult, formatError} from './formater'
import {IProject} from '../../types/project.types'

export const validateProject = (payload: IProject):ValidationResult  => {


    const projectSchema = Joi.object({

    })

    // name
    // color
    // projectParent
    // favourite
    // layout  
    // isDefault
    // user

        const {error} = projectSchema.validate(payload, {abortEarly: false})
    
        return formatError(error)
    



};