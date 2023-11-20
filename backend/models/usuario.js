import { Conect } from './conec.js'

// const connection = await Conect.con()

export class UserModel {
    static async creteUser({ input }) {
        let connection
        const { carnet, nombre, apellido, contrasena, correo } = input
        try {
            connection = await Conect.con()
            const res = await connection.query('INSERT INTO usuario (carnet, nombre, apellido, contrasena, correo) VALUES ( ?, ?, ?, ?, ?)', [carnet, nombre, apellido, contrasena, correo])
            return res
        } catch (error) {
            // return { message: 'Error al consultar en la base de datos', error: error.code }
            if (error.code === 'ER_DUP_ENTRY') return { message: 'El carnet ya está registrado' }
            return { message: 'Error' }
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
            if (user[0].length === 0) return { message: 'No se encontro al Usuario', code: 0 }
            return user[0]
        } catch (error) {
            return { message: 'Error', code: 0 }
        } finally {
            if (connection) {
                await Conect.close(connection)
            }
        }
    }

    static async changePassword({ input }) {
        let connection
        const { carnet, correo, contrasena } = input
        try {
            connection = await Conect.con()
            const res = await connection.query('UPDATE usuario SET contrasena = ? WHERE carnet= ? AND correo = ?', [contrasena, carnet, correo])
            if (res[0].affectedRows === 0) return { message: 'No se pudo cambiar la contrasena', code: 0 }
            return { message: 'Cambio de Contrasena realizado', code: 1 }
        } catch (error) {
            return { message: 'Error', code: 0 }
        } finally {
            if (connection) {
                await Conect.close(connection)
            }
        }
    }
}
