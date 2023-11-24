import { validateLogin } from '../schemas/usuario.js'
import { createAccessToken } from '../libs/jwt.js'
import jwt from 'jsonwebtoken'
import { TOKEN } from '../config.js'

export class AuthController {
    constructor({ AuthModel }) {
        this.authModel = AuthModel
    }

    login = async(req, res) => {
        const result = validateLogin(req.body)
        if (!result.success) return res.status(400).json(result.error.errors.map((error) => error.message))
        const newUser = await this.authModel.login({ input: result.data })
        if (newUser.code === 0) {
            return res.status(400).json(newUser.err)
        }
        const token = await createAccessToken({ id: result.data.carnet })
        res.cookie('token', token)
        res.status(201).json(newUser.data)
    }

    logout = async(req, res) => {
        try {
            res.cookie('token', '', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                expires: new Date(0),
                sameSite: 'none'
            })

            return res.status(200).json({ message: 'Logout exitoso' })
        } catch (error) {
            console.error('Error en la función de logout:', error)
            return res.status(500).json({ error: 'Error interno del servidor al realizar logout' })
        }
    }

    verifyToken = async(req, res) => {
        const { token } = req.cookies
        if (!token) return res.send(false)
        jwt.verify(token, TOKEN, async(error, user) => {
            if (error) return res.sendStatus(401)
            const userFound = await this.authModel.getByCarnet({ id: user.id })
            if (!userFound) return res.sendStatus(401).json({ message: 'usuario no autorizado' })
            return res.json({
                carnet: userFound[0].carnet,
                nombre: userFound[0].nombre,
                correo: userFound[0].correo
            })
        })
    }
}
