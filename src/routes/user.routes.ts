import Router from 'express'
import { getUserInfo  } from '@controllers/user.controller'
import {getUserSummary} from '@controllers/userSummary.controller'
import authenticateToken from '../middleware/authenticateToken.middleware' 

const userRouter = Router()

userRouter.get('/me', authenticateToken, getUserInfo)
userRouter.get('/user-summarize', authenticateToken, getUserSummary)


export default userRouter
