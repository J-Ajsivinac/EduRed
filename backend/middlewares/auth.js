import jwt from 'jsonwebtoken'
import { TOKEN } from '../config.js'

export const auth = (req, res, next) => {
    try {
        const { token } = req.cookies
        if (!token) {
            return res
                .status(401)
                .json({ message: 'No existe Token, autorización denegada' })
        }

        jwt.verify(token, TOKEN, (error, user) => {
            if (error) {
                return res.status(401).json({ message: 'Token inválido' })
            }
            req.user = user
            next()
        })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
