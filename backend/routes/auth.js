import { Router } from 'express'
import { AuthController } from '../controllers/auth.js'

export const createAuthRouter = ({ AuthModel }) => {
    const autoRouter = Router()
    const authController = new AuthController({ AuthModel })
    autoRouter.post('/login', authController.login)
    autoRouter.post('/logout', authController.logout)
    autoRouter.get('/verify', authController.verifyToken)
    return autoRouter
}
