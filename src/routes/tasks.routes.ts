import express from "express";
import {getUserTasks} from "@controllers/task.controller"
const tasksRouter = express.Router()


tasksRouter.get('/', getUserTasks)


export default tasksRouter