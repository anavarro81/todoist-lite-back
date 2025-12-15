import express from "express";
import { login, register, googleOath } from "@controllers/user.controller";
const authRouter = express.Router();

authRouter.post("/login", login);
authRouter.post("/register", register);
authRouter.post("/google-OAuth", googleOath);

export default authRouter;
