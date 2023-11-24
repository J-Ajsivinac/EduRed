import { TOKEN } from '../config.js'
import jwt from 'jsonwebtoken'

export async function createAccessToken(payload) {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, TOKEN, { expiresIn: '1d' }, (err, token) => {
            if (err) reject(err)
            resolve(token)
        })
    })
}