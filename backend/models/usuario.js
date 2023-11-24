import { Conect } from './conec.js'

// const connection = await Conect.con()

export class UserModel {
    static async creteUser({ input }) {
        let connection
        const { carnet, nombre, apellido, contrasena, correo } = input
        try {
            connection = await Conect.con()
            const res = await connection.query('INSERT INTO usuario (carnet, nombre, apellido, contrasena, correo) VALUES ( ?, ?, ?, ?, ?)', [carnet, nombre, apellido, contrasena, correo])
            if (res.affectedRows === 0) return { err: ['Error al registrar al usuario'], code: 0 }
            const [movies] = await connection.query(
                'SELECT carnet, nombre, apellido,correo FROM usuario WHERE carnet = ?;', [carnet]
            )

            return { data: movies[0], code: 1 }
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') return { err: ['El carnet ya está registrado'], code: 0 }
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

    static async addCourse({ input }) {
        let connection
        const { carnet, idCurso } = input
        try {
            connection = await Conect.con()
            const res = await connection.query('INSERT INTO usuario_has_curso VALUES ( ?, UUID_TO_BIN(?))', [carnet, idCurso])
            if (res.affectedRows === 0) return { message: 'Error al registrar el curso ganado', code: 0 }
            return { message: 'Curso ganado registrado con éxito', code: 1 }
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') return { message: 'El curso ya ha sido registrado' }
            return { message: 'Error', code: 0, error }
        } finally {
            if (connection) {
                await Conect.close(connection)
            }
        }
    }

    static async getCourse({ id }) {
        let connection
        try {
            connection = await Conect.con()
            const res = await connection.query('SELECT curso.nombre, curso.creditos FROM curso INNER JOIN usuario_has_curso ON usuario_has_curso.curso_idcurso = curso.idcurso WHERE usuario_has_curso.usuario_carnet=?', [id])
            return res[0]
        } catch (error) {
            return { message: 'Error', code: 0 }
        } finally {
            if (connection) {
                await Conect.close(connection)
            }
        }
    }
}
