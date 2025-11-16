import express from "express";
import {getUserTasks} from "@controllers/task.controller"
import authenticateToken from '../middleware/authenticateToken.middleware'
const tasksRouter = express.Router()


tasksRouter.get('/', authenticateToken, getUserTasks)


export default tasksRouter