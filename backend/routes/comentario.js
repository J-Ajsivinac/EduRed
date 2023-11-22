import { Router } from 'express'
import { CommentController } from '../controllers/comentario.js'
import { auth } from '../middlewares/auth.js'

export const createComRoutes = ({ CommentModel }) => {
    const comRouter = Router()
    const comController = new CommentController({ CommentModel })
    // userRouter.get('/:type', userController.getByCarnet)
    comRouter.post('/', auth, comController.createPub)
    comRouter.get('/:id', auth, comController.getPubByType)
    return comRouter
}
