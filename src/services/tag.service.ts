import tagModel from "@models/label.model";
import { ITag } from "../types/label.types";
import AppError from "../errors/AppError";
import logger from "@utils/logger";

export const newTask = async (labelData: ITag) => {
  try {
    if (!labelData) {
      logger.error("Datos de la etiqueta no informados");
      throw AppError.badRequest("Datos de la etiqueta no informados");
    }

    return await tagModel.create(labelData);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw AppError.unexpected("Error al crear la tarea");
  }
};
