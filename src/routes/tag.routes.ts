import { Router } from "express";
import { newTag } from "@controllers/tag.controller";
import authenticateToken from '../middleware/authenticateToken.middleware' 

const tagRouter = Router();

tagRouter.post("/", authenticateToken, newTag);

export default tagRouter;
