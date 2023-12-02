import { Conect } from './conec.js'

// const connection = await Conect.con()

export class CommentModel {
    static async createComment({ input }) {
        let connection
        const { contenido, carnet, idPub, carnetOriginal } = input
        try {
            connection = await Conect.con()
            const [uuidResult] = await connection.query('SELECT UUID() uuid;')
            // Obtener la fecha según la zona
            const date = new Date()
            const offset = date.getTimezoneOffset()
            date.setMinutes(date.getMinutes() - offset)
            const formattedDate = date.toISOString().slice(0, 19).replace('T', ' ')

            const [{ uuid }] = uuidResult
            const res = await connection.query(`INSERT INTO comentario VALUES ( UUID_TO_BIN("${uuid}"), ?, ?, ?,  UUID_TO_BIN(?),?);`, [contenido, formattedDate, carnet, idPub, carnetOriginal])

            if (res.affectedRows === 0) return { message: 'Error al registrar el comentario', code: 0 }
            return { message: 'Comentario registrada con éxito', code: 1 }
        } catch (error) {
            return { message: 'Error', error }
        } finally {
            if (connection) {
                await Conect.close(connection)
            }
        }
    }

    static async getAllComByType({ id }) {
        let connection

        try {
            connection = await Conect.con()
            const res = await connection.query("SELECT CONCAT(u.nombre, ' ', u.apellido) as nombre,c.contenido,DATE_FORMAT(c.fecha, '%Y-%m-%d %H:%i:%s') AS fecha_f,c.publicacion_usuario_carnet AS carnetPub FROM comentario c INNER JOIN usuario u on c.usuario_carnet = u.carnet WHERE c.publicacion_idpublicacion = UUID_TO_BIN(?) ORDER BY c.fecha DESC;", [id])
            return res[0]
        } catch (error) {
            return { message: 'Error', code: 0, error }
        } finally {
            if (connection) {
                await Conect.close(connection)
            }
        }
    }
}
