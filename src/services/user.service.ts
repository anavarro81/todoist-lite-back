import { LoginPayload, RegisterPayload } from "../types/LoginRegister";
import userModel from "@models/user.model";
import { createDefaultProyect } from "@services/project.service";
import AppError from "../errors/AppError";
import { comparePassword, hashPassword } from "../utils/auth";
import logger from "../utils/logger";
import { generateToken } from "../utils/auth";
import { verifyGoogleToken, createGoogleUser } from "../utils/auth/googleAuth";

export const login = async (payload: LoginPayload) => {
  try {
    const { email, password } = payload;

    const user = await userModel.findOne({ email });

    if (!user) {
      throw AppError.badRequest("Email no encontrado");
    }

    const validPassword = await comparePassword(password, user.password);

    if (!validPassword) {
      throw AppError.unauthorized("Usuario o contraseña no válido");
    }

    const token = generateToken(String(user._id), user.email);

    return {
      user: {
        _id: user._id,
        email: user.email,
      },
      token,
    };
  } catch (error) {
    // Si es error controlado (AppError) → se relanza
    if (error instanceof AppError) {
      throw error;
    }

    const message = error instanceof Error ? error.message : String(error);
    logger.error(message);
    throw AppError.unexpected("Error en el login");
  }
};

export const register = async (payload: RegisterPayload) => {
  try {
    const { email, password } = payload;

    const existingUser = await userModel.find({ email: email });

    console.log("email ", email);
    console.log("existingUser ", existingUser);

    if (existingUser.length > 0) {
      logger.warn("email registrado");
      throw AppError.badRequest("No se pudo completar el registro");
    }

    const hashedPassword = await hashPassword(password);

    const user = await userModel.create({ email, password: hashedPassword });

    const token = generateToken(String(user._id), user.email);

    // Alta del proyecto por defecto para el usuario
    const proyect = await createDefaultProyect(user._id);

    if (!proyect) {
      logger.error("Error al crear el proyecto");
      throw AppError.unexpected("Error crear el proyecto");
    }

    return {
      user: {
        _id: user._id,
        email: user.email,
      },
      token,
    };
  } catch (error) {
    // Si es error controlado (AppError) → se relanza
    if (error instanceof AppError) {
      throw error;
    }

    const message = error instanceof Error ? error.message : String(error);
    logger.error(message);
    throw AppError.unexpected("Error en el register");
  }
};

export const googleOAuth = async (googleToken: string) => {
  try {
    const payload = await verifyGoogleToken(googleToken);

    const { email, name, picture, sub } = payload;

    let user = await userModel.findOne({ email });

    // Si el usuario no existe, lo creamos
    if (!user) {
      user = await createGoogleUser(email, name, picture, sub);
    }

    // Generar token JWT
    const token = generateToken(String(user._id), user.email);

    return {
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
        photo: user.photo,
      },
      token,
    };
  } catch (error) {
    // Si es error controlado (AppError) → se relanza
    if (error instanceof AppError) {
      throw error;
    }

    const message = error instanceof Error ? error.message : String(error);
    logger.error("Error en OAuth con Google", { error: message });
    throw AppError.unexpected("Error en autenticación con Google");
  }
};
