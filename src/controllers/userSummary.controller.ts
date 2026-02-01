import { Request, Response, NextFunction } from "express";
import logger from "@utils/logger";
import AppError from "../errors/AppError";
import { getUserInfo } from "@services/user.service";
import { countTask } from "@services/task.services";

export const getUserSummary = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.user;

    const user = await getUserInfo(id);

    const { inboxCounter, todayCounter, upcomingCounter } = await countTask(id);
    console.log("inboxCounter ", inboxCounter);

    if (!user) {
      logger.error("No existe el usaurio para ese id");
      AppError.badRequest("No existe el id de usuario");
    }

    console.log("name ", user?.name);
    console.log("inboxCounter ", inboxCounter);
    console.log("todayCounter", todayCounter);
    console.log("upcomingCounter ", upcomingCounter);

    res.status(200).json({
      name: user?.name,
      inboxCounter: inboxCounter,
      todayCounter: todayCounter,
      upcomingCounter: upcomingCounter,
    });
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }

    const message = error instanceof Error ? error.message : String(error);
    logger.error(message);
    throw AppError.unexpected("Error al obtener la información del usuario");
  }
};
