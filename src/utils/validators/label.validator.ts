import Joi from "joi";
import { formatError, ValidationResult } from "./formater";
import { TAG_COLOR } from "../../config/colors";

export const validateTag = (payload: any): ValidationResult => {
  // Esquema de validación para una tag
  const tagSchema = Joi.object({
    name: Joi.string().trim().required().max(60).messages({
      "string.empty": "El nombre de la etiqueta es obligatorio",
      "any.required": "El nombre de la etiqueta es obligatorio",
      "string.max": "Numero maximo de caracteres excedido: 100",
    }),
    color: Joi.string()
      .optional()
      .valid(...TAG_COLOR)
      .messages({
        "string.pattern.base": "Color no válido",
      }),
    isfavorite: Joi.boolean().optional(),

    userId: Joi.string()
      .required()
      .pattern(/^[0-9a-fA-F]{24}$/)
      .messages({
        "string.pattern.base": "Id de usuario no válido",
        "any.required": "id de usuario obligatorio",
        "string.empty": "El id debe debe de estar informado",
      }),
  });

  console.log("estoy en ", validateTag);

  const { error } = tagSchema.validate(payload, { abortEarly: false });

  console.log("error ", error);

  return formatError(error);
};
