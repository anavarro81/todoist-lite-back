import Joi from "joi";
import {iTask} from '../../types/task.type'
import {formatError, ValidationResult} from './formater'


const taskSchema = Joi.object({
    
    name: Joi.string()
    .trim()
    .required()
    .max(500)
    .messages({
        'string.empty': "El nombre de la tarea es obligatorio",
        'any.required': "El nombre de la tarea es obligatorio",
        'string.max': "Numero maximo de caracteres excedido: 500"
    }),

    description: Joi.string()
    .optional()
    .messages({
        'string.empty': "La descripción de la tarea no pueda estar vacia",
        'any.required': "La descripción de la tarea es obligatoria",
        'string.max': "Longitud máxima para la tarea es de 500 caracteres"
    }),

    created: Joi.date()
    .optional()
    .messages({
        'date.base': 'Formato de la fecha no valido'
    }),

    priority: Joi.string()
    .valid("priority 1", "priority 2", "priority 3", "priority 4")
    .messages({
        'any.only': 'Valor no permitido'
    }),

    deadline: Joi.date()
    .optional()
    .messages({
    'date.base': 'Formato de la fecha no valido'
    }),

    label: Joi.array()
    .items(
        Joi.string()
        .pattern(/^[0-9a-fA-F]{24}$/)
        .messages({
            'string.pattern.base': 'Id de label no válido'
        })
    )
    .messages({
        'array.base': 'Labels debe ser un array de ids'
    })
    .optional(),

    project: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .messages({
        'string.pattern.base': 'Id de proyecto no válido'
    })
    .optional()
    .allow(null),

    user: Joi.string()
    .required()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .messages({
        'string.pattern.base': 'Id de usuario no válido',
        'any.required': 'id de usuario obligatorio',
        'string.empty': 'El id debe debe de estar informado'
    })




})



export const validateTask = (payload: iTask):ValidationResult => {

    const {error} = taskSchema.validate(payload, {abortEarly: false})

    return formatError(error)

}


