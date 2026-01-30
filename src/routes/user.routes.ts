import Router from 'express'
import { getUserInfo } from '@controllers/user.controller'
import authenticateToken from '../middleware/authenticateToken.middleware' 

const userRouter = Router()

userRouter.get('/me', authenticateToken, getUserInfo)


export default userRouter
