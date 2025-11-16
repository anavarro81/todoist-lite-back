import express from 'express';
import 'module-alias/register';
// Carga las variables de entorno. Se pueden usar en todo el proyecto. 
import 'dotenv/config'
// Carga la conexion a la bbdd
import {connectDB} from './config/bd'
import cors from 'cors';
import {corsConfig} from './config/cors'
import helmet from 'helmet';
import ErrorMiddleware from './middleware/error.middleware'
import logger from './utils/logger';
import tasksRouter from './routes/tasks.routes'
import authRouter from '@routes/auth.routes'
const app = express()

connectDB();
app.use(cors(corsConfig))
app.use(helmet())
// Permite leer los datos que vienen de un formulario
app.use(express.json())


app.use('/tasks', tasksRouter)
app.use('/auth/', authRouter)

app.use('/', (req, res) => {
    res.send('Server is running...')
    logger.info('server is running...')
})




app.use(ErrorMiddleware)
export default app; 
