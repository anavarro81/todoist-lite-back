// Se registra module-alias para poder usar los alias, e.g. @models/*
import 'module-alias/register';
import taskModel from "@models/task.model"
import tasks from './data/tasks-seeds'
import 'dotenv/config'
import {connectDB} from '../config/bd'
import {resetDatabase} from './reset-data-base'

const load = async ()  => {
    try {
        await connectDB()

        await resetDatabase()

        const insertedTasks = await taskModel.insertMany(tasks)
        // console.log({insertedTasks})
        
    } catch (error) {
        console.error ('error seedin data ', error)
        throw error   
    }
}

load()
.then(() => {
    console.log( "✅ seed completed!!" )
    process.exit(1);
})
.catch ( (error) => {
    console.error('>> error al cargar los datos.. ', error)
    process.exit(1);
})
