import logger from "@utils/logger";
import AppError from "../../errors/AppError";
import { OAuth2Client } from "google-auth-library";
import { createDefaultProyect } from "@services/project.service";
import { hashPassword } from "../auth";
import userModel from "@models/user.model";

interface InewUser {
  email: string;
  name: string;
  picture: string;
  sub: string;
}

export const verifyGoogleToken = async (googleToken: string) => {
  // Validar que existe GOOGLE_CLIENT_ID
  if (!process.env.GOOGLE_CLIENT_ID) {
    logger.error("GOOGLE_CLIENT_ID no configurado");
    throw AppError.unexpected("Configuración de Google OAuth no válida");
  }

  const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

  const ticket = await googleClient.verifyIdToken({
    idToken: googleToken,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();

  if (!payload || !payload.email || !payload.sub) {
    logger.error("Google payload no válido", { payload });
    throw AppError.badRequest("Token de Google no válido");
  }

  return payload;
};

export const createGoogleUser = async (
  email: string | undefined,
  name: string | undefined,
  picture: string | undefined,
  sub: string
) => {
  const tempPassword = `google-${sub}`;
  const hashedPassword = await hashPassword(tempPassword);

  const newUser = await userModel.create({
    email,
    password: hashedPassword,
    name: name || undefined,
    photo: picture || undefined,
  });

  // Crear proyecto por defecto
  const defaultProject = await createDefaultProyect(newUser._id);

  if (!defaultProject) {
    logger.error("Error al crear proyecto por defecto para usuario Google");
    throw AppError.unexpected("Error al configurar cuenta");
  }

  return newUser;
};
