import express from "express";
import {getAllTask} from "@controllers/task.controller"
const tasksRouter = express.Router()


tasksRouter.get('/', getAllTask)


export default tasksRouter