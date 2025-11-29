import Joi from "joi";
import {LoginPayload} from '../../types/LoginRegister'
import {formatError, ValidationResult} from './formater'


const authSchema = Joi.object({
    
    email: Joi.string()
    .email()
    .required()
    .messages({
        'string.mail': "email no valido",
        'string.empty': "email no puede estar vacio",
        'any.required': "email es obligatrio"
    }),

    password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{6,30}$'))
    .required()
    .messages({
        'string.pattern.base': '"password" debe de tener entre 6-8 caracteres',   
        'any.required': '"password" is required',
    })
})



export const validateAuth = (payload: LoginPayload):ValidationResult => {

    const {error} = authSchema.validate(payload, {abortEarly: false})

    return formatError(error)

}
