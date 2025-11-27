import express from "express";
import {getUserTasks, newTask} from "@controllers/task.controller"
import authenticateToken from '../middleware/authenticateToken.middleware'
const tasksRouter = express.Router()


tasksRouter.get('/', authenticateToken, getUserTasks)
tasksRouter.post('/', authenticateToken, newTask)


export default tasksRouter