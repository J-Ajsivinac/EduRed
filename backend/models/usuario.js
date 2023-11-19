import { Conect } from './conec.js'

// const connection = await Conect.con()

export class UserModel {
    static async getByCarnet({ id }) {
        let connection

        try {
            connection = await Conect.con()
            const user = await connection.query('SELECT * FROM usuario WHERE carnet = ?', [id])
            console.log(user)
            if (user[0].length === 0) return null
            return user[0]
        } catch (error) {
            return { message: 'Error al consultar en la base de datos' }
        } finally {
            if (connection) {
                await Conect.close(connection)
            }
        }
    }

    static async creteUser({ input }) {
        let connection
        const { carnet, nombre, apellido, contrasena, correo } = input
        try {
            connection = await Conect.con()

            const res = await connection.query('INSERT INTO usuario (carnet, nombre, apellido, contrasena, correo) VALUES ( ?, ?, ?, ?, ?)', [carnet, nombre, apellido, contrasena, correo])
            return res
        } catch {
            return { message: 'Error al consultar en la base de datos' }
        } finally {
            if (connection) {
                await Conect.close(connection)
            }
        }
    }
}
