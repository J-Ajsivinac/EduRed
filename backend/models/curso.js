import { Conect } from './conec.js'

// const connection = await Conect.con()

export class CourseModel {
    static async creteCourse({ input }) {
        let connection
        const { nombre, creditos } = input
        try {
            connection = await Conect.con()
            const [uuidResult] = await connection.query('SELECT UUID() uuid;')
            const [{ uuid }] = uuidResult
            const res = await connection.query(`INSERT INTO curso VALUES ( UUID_TO_BIN("${uuid}"), ?, ?)`, [nombre, creditos])
            if (res.affectedRows === 0) return { message: 'Error al registrar el curso', code: 0 }
            return { message: 'Curso registrado con éxito', code: 1 }
        } catch (error) {
            return { message: 'Error' }
        } finally {
            if (connection) {
                await Conect.close(connection)
            }
        }
    }

    static async getAllCourses() {
        let connection
        try {
            connection = await Conect.con()
            const res = await connection.query('SELECT BIN_TO_UUID(idcurso) idcurso,nombre,creditos FROM curso;')
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
