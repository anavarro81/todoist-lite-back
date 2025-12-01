import express from "express";
import {getUserTasks, newTask, searchTask} from "@controllers/task.controller"
import authenticateToken from '../middleware/authenticateToken.middleware'
const tasksRouter = express.Router()


tasksRouter.get('/', authenticateToken, getUserTasks)
tasksRouter.post('/', authenticateToken, newTask)
tasksRouter.get('/search', authenticateToken, searchTask)

export default tasksRouter