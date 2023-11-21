import { Router } from 'express'
import { CommentController } from '../controllers/comentario.js'

export const createComRoutes = ({ CommentModel }) => {
    const comRouter = Router()
    const comController = new CommentController({ CommentModel })
    // userRouter.get('/:type', userController.getByCarnet)
    comRouter.post('/', comController.createPub)
    comRouter.get('/:id', comController.getPubByType)
    return comRouter
}
