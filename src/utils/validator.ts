import Joi from "joi";
import {LoginPayload} from '../types/LoginRegister'

export interface ValidationResult {
    valid: boolean;
    errors: {field: string, message: string}[]
}

const registerSchema = Joi.object({

})

const loginSchema = Joi.object({
    
    email: Joi.string()
    .email()
    .required()
    .messages({
        'string.mail': "eail no valido",
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

export const validateLogin = (payload: LoginPayload):ValidationResult => {

    const {error} = loginSchema.validate(payload, {abortEarly: false})

    if (!error) {
        return {valid: true, errors: [] }
    }

    const errors = error.details.map(detail => ({
        field: detail.context?.key || "unknown",
        message: detail.message
    }))

    return {
        valid: false,
        errors: errors
    }


}
