import { Router } from 'express'
import { UserController } from '../controllers/usuario.js'

export const createUserRouter = ({ UserModel }) => {
    const userRouter = Router()
    const userController = new UserController({ UserModel })
    userRouter.get('/:id', userController.getByCarnet)
    userRouter.post('/', userController.createUser)
    userRouter.patch('/', userController.changePassword)
    return userRouter
}
