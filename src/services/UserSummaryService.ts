import { Request, Response, NextFunction } from "express";
import logger from "@utils/logger";
import AppError from "errors/AppError";

export const UserSummaryController = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }

    const message = error instanceof Error ? error.message : String(error);
    logger.error(message);
    throw AppError.unexpected("Error al obtener la información del usuario");
  }
};
