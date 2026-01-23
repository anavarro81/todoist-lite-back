import { Request, Response, NextFunction } from "express";
import { validateTag } from "../utils/validators/label.validator";
import logger from "@utils/logger";
import AppError from "../errors/AppError";
import * as tagServices from "@services/tag.service";

export const newTag = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    console.log("estoy en newTag");

    const result = validateTag(req.body);

    console.log("valid = ", result.valid);
    console.log("errors = ", result.errors);

    const newtag = await tagServices.newTask(req.body);
    res.status(200).json({ newtag });

    if (!result.valid) {
      logger.error(`Datos de etiqueta no validos: ${result.errors}`);
      throw AppError.badRequest("Datos de etiqueta incorrectos", result.errors);
    }
  } catch (error) {
    next(error);
  }
};
