import { Response, Request, NextFunction } from "express";
import { validateAuth } from "../utils/validators/auth.validator";

import * as AuthServices from "@services/user.service";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;

    const validUser = validateAuth(req.body);

    if (!validUser.valid) {
      res.status(400).json({
        message: "Datos del rgistro no validos",
        errors: validUser.errors,
      });
    }

    const userLogged = await AuthServices.login(req.body);

    res.status(200).json({ userLogged });
  } catch (error) {
    next(error);
  }
};

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;

    const validRegister = validateAuth(req.body);

    if (!validRegister.valid) {
      res.status(400).json({
        message: "Datos del registro no validos",
        errors: validRegister.errors,
      });
    }

    const userRegister = await AuthServices.register(req.body);

    res.status(201).json({ userRegister });
  } catch (error) {
    next(error);
  }
};

export const googleOath = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { googleToken } = req.body;

    console.log("googleToken >> ", googleToken);

    if (!googleToken || typeof googleToken !== "string") {
      res.status(400).json({
        message: "Google token es obligatorio",
        errors: [{ field: "idToken", message: "id token no valido" }],
      });
      return;
    }

    const loggedUser = await AuthServices.googleOAuth(googleToken);

    console.log("loggedUser ", loggedUser);

    res.status(200).json({
      loggedUser,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserInfo = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {

    const { id } = req.user;
    const userInfo = await AuthServices.getUserInfo(id);
    res.status(200).json({ userInfo });
  } catch (error) {
    next(error);
  }
};

export const getUserSummary = async (
  req: Request,
  res: Response,
  next: NextFunction,

) => {
  try {
    const { id } = req.user;
    const userInfo = await AuthServices.getUserInfo(id);
    console.log(userInfo)
    res.status(200).json({message: "Todo bien"})
  } catch (error) {
    
  }
}
