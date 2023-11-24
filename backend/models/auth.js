import { Conect } from './conec.js'

// const connection = await Conect.con()

export class AuthModel {
    static async login({ input }) {
        let connection
        const { carnet, contrasena } = input
        try {
            connection = await Conect.con()
            const [user] = await connection.query('SELECT carnet, nombre, apellido, correo FROM usuario WHERE carnet = ? AND contrasena = ?', [carnet, contrasena])
            if (user[0].length === 0) return { err: ['Credenciales incorrectas'], code: 0 }
            return { data: user[0], code: 1 }
        } catch (error) {
            return { err: ['Error'], code: 0 }
        } finally {
            if (connection) {
                await Conect.close(connection)
            }
        }
    }

    static async getByCarnet({ id }) {
        let connection
        try {
            connection = await Conect.con()
            const user = await connection.query('SELECT carnet, nombre, apellido, correo FROM usuario WHERE carnet = ?', [id])
            if (user[0].length === 0) return null
            return user[0]
        } catch (error) {
            return { message: 'Error', code: 0 }
        } finally {
            if (connection) {
                await Conect.close(connection)
            }
        }
    }
}
