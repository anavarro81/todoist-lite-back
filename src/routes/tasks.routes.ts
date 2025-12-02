import express from "express";
import {getUserTasks, newTask, searchTask, getDayTask, getUpcomingTask} from "@controllers/task.controller"
import authenticateToken from '../middleware/authenticateToken.middleware'
const tasksRouter = express.Router()


tasksRouter.get('/', authenticateToken, getUserTasks)
tasksRouter.post('/', authenticateToken, newTask)
tasksRouter.get('/search', authenticateToken, searchTask)
tasksRouter.get('/today', authenticateToken, getDayTask)
tasksRouter.get('/upcoming', authenticateToken, getUpcomingTask)

export default tasksRouter