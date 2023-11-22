import { Router } from 'express'
import { UserController } from '../controllers/usuario.js'
import { auth } from '../middlewares/auth.js'

export const createUserRouter = ({ UserModel }) => {
    const userRouter = Router()
    const userController = new UserController({ UserModel })
    userRouter.get('/:id', userController.getByCarnet)
    userRouter.post('/', userController.createUser)
    userRouter.patch('/', auth, userController.changePassword)
    userRouter.get('/course/:id', auth, userController.getCourses)
    userRouter.post('/course/', auth, userController.addCourse)
    return userRouter
}
