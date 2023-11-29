import { Router } from 'express'
import { PubController } from '../controllers/publicacion.js'
import { auth } from '../middlewares/auth.js'

export const createPubRoutes = ({ PublicationModel }) => {
    const userRouter = Router()
    const pubController = new PubController({ PublicationModel })
    // userRouter.get('/:type', userController.getByCarnet)
    userRouter.post('/', auth, pubController.createPub)
    userRouter.get('/', auth, pubController.getPub)
    userRouter.get('/type/:id', auth, pubController.getPubByType)
    userRouter.get('/name/:id', auth, pubController.getPubByName)
    userRouter.get('/one/:id', auth, pubController.getPubOneID)
    return userRouter
}
