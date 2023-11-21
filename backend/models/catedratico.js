import { Conect } from './conec.js'

// const connection = await Conect.con()

export class TeacherModel {
    static async creteTeacher({ input }) {
        let connection
        const { nombre, apellido } = input
        try {
            connection = await Conect.con()
            const [uuidResult] = await connection.query('SELECT UUID() uuid;')
            const [{ uuid }] = uuidResult
            const res = await connection.query(`INSERT INTO catedratico VALUES ( UUID_TO_BIN("${uuid}"), ?, ?)`, [nombre, apellido])
            if (res.affectedRows === 0) return { message: 'Error al registrar al catedratico', code: 0 }
            return { message: 'Catedrático registrado con éxito', code: 1 }
        } catch (error) {
            return { message: 'Error' }
        } finally {
            if (connection) {
                await Conect.close(connection)
            }
        }
    }

    static async getAllTeachers() {
        let connection
        try {
            connection = await Conect.con()
            const res = await connection.query('SELECT BIN_TO_UUID(idcatedratico) idcatedratico,nombre,apellido FROM catedratico;')
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
