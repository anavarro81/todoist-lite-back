import Joi from "joi";

export interface ValidationResult {
    valid: boolean;
    errors: {field: string, message: string}[]
}


export const formatError = (error:Joi.ValidationError | undefined): ValidationResult => {

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