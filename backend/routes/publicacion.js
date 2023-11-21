import { Router } from 'express'
import { PubController } from '../controllers/publicacion.js'

export const createPubRoutes = ({ PublicationModel }) => {
    const userRouter = Router()
    const pubController = new PubController({ PublicationModel })
    // userRouter.get('/:type', userController.getByCarnet)
    userRouter.post('/', pubController.createPub)
    userRouter.get('/', pubController.getPub)
    userRouter.get('/:id', pubController.getPubByType)
    return userRouter
}
