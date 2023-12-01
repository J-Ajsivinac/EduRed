import { Conect } from './conec.js'

// const connection = await Conect.con()

export class PublicationModel {
    static async createPub({ input }) {
        let connection
        const { mensaje, titulo, acercade, carnet, idtipo } = input
        try {
            connection = await Conect.con()
            const [uuidResult] = await connection.query('SELECT UUID() uuid;')
            // Obtener la fecha según la zona
            const date = new Date()
            const offset = date.getTimezoneOffset()
            date.setMinutes(date.getMinutes() - offset)
            const formattedDate = date.toISOString().slice(0, 19).replace('T', ' ')

            const [{ uuid }] = uuidResult
            const res = await connection.query(`INSERT INTO publicacion VALUES ( UUID_TO_BIN("${uuid}"), ?, ?, ?,  UUID_TO_BIN(?),?,?);`, [mensaje, formattedDate, titulo, acercade, carnet, idtipo])

            if (res.affectedRows === 0) return { message: 'Error al registrar la publicacion', code: 0 }
            return { message: 'Publicación registrada con éxito', code: 1 }
        } catch (error) {
            return { message: 'Error', error }
        } finally {
            if (connection) {
                await Conect.close(connection)
            }
        }
    }

    static async getAllPub() {
        let connection

        try {
            connection = await Conect.con()
            const res = await connection.query(`SELECT 
                    BIN_TO_UUID(p.idpublicacion) AS idpublicacion,
                    p.mensaje,
                    DATE_FORMAT(p.fecha, '%Y-%m-%d %H:%i:%s') AS fecha_f,
                    p.titulo,
                    CONCAT(u.nombre, ' ', u.apellido) as nombre,
                    p.tipopublicacion_idtipopublicacion AS tipo,
                    CASE
                        WHEN p.tipopublicacion_idtipopublicacion = 1 THEN c.nombre
                        WHEN p.tipopublicacion_idtipopublicacion = 2 THEN CONCAT(cat.nombre, ' ', cat.apellido)
                        ELSE NULL
                    END AS acercade
                FROM publicacion p
                LEFT JOIN curso c ON p.tipopublicacion_idtipopublicacion = 1 AND p.acercade = c.idcurso
                LEFT JOIN catedratico cat ON p.tipopublicacion_idtipopublicacion = 2 AND p.acercade = cat.idcatedratico
                INNER JOIN usuario u on p.usuario_carnet = u.carnet
                ORDER BY p.fecha DESC;
                `)
            return res[0]
        } catch (error) {
            return { message: 'Error', code: 0 }
        } finally {
            if (connection) {
                await Conect.close(connection)
            }
        }
    }

    static async getAllPubByType({ id }) {
        let connection
        try {
            connection = await Conect.con()
            const res = await connection.query(`SELECT 
                    p.mensaje,
                    DATE_FORMAT(p.fecha, '%Y-%m-%d %H:%i:%s') AS fecha_f,
                    p.titulo,
                    CONCAT(u.nombre, ' ', u.apellido) as nombre,
                    p.tipopublicacion_idtipopublicacion as tipo,
                    CASE
                        WHEN p.tipopublicacion_idtipopublicacion = 1 THEN c.nombre
                        WHEN p.tipopublicacion_idtipopublicacion = 2 THEN CONCAT(cat.nombre, ' ', cat.apellido)
                        ELSE NULL
                    END AS acercade
                FROM publicacion p
                LEFT JOIN curso c ON p.tipopublicacion_idtipopublicacion = 1 AND p.acercade = c.idcurso
                LEFT JOIN catedratico cat ON p.tipopublicacion_idtipopublicacion = 2 AND p.acercade = cat.idcatedratico
                INNER JOIN usuario u on p.usuario_carnet = u.carnet
                WHERE p.tipopublicacion_idtipopublicacion = ?
                ORDER BY p.fecha DESC;
                `, [id])
            return res[0]
        } catch (error) {
            return { message: 'Error', code: 0, error }
        } finally {
            if (connection) {
                await Conect.close(connection)
            }
        }
    }

    static async getAllByName({ id }) {
        let connection

        try {
            connection = await Conect.con()
            const res = await connection.query(`
                SELECT 
                    p.mensaje,
                    DATE_FORMAT(p.fecha, '%Y-%m-%d %H:%i:%s') AS fecha_f,
                    p.titulo,
                    CONCAT(u.nombre, ' ', u.apellido) as nombre,
                    p.tipopublicacion_idtipopublicacion as tipo,
                    CASE
                        WHEN p.tipopublicacion_idtipopublicacion = 1 THEN c.nombre
                        WHEN p.tipopublicacion_idtipopublicacion = 2 THEN CONCAT(cat.nombre, ' ', cat.apellido)
                        ELSE NULL
                    END AS acercade
                FROM publicacion p
                LEFT JOIN curso c ON p.tipopublicacion_idtipopublicacion = 1 AND p.acercade = c.idcurso
                LEFT JOIN catedratico cat ON p.tipopublicacion_idtipopublicacion = 2 AND p.acercade = cat.idcatedratico
                INNER JOIN usuario u on p.usuario_carnet = u.carnet
                WHERE p.acercade = UUID_TO_BIN('${id}')
                ORDER BY p.fecha DESC;
                `)
            return res[0]
        } catch (error) {
            return { message: 'Error', code: 0 }
        } finally {
            if (connection) {
                await Conect.close(connection)
            }
        }
    }

    static async getOne({ id }) {
        let connection
        try {
            connection = await Conect.con()
            const res = await connection.query(`
                SELECT 
                    p.mensaje,
                    DATE_FORMAT(p.fecha, '%Y-%m-%d %H:%i:%s') AS fecha_f,
                    p.titulo,
                    CONCAT(u.nombre, ' ', u.apellido) as nombre,
                    p.tipopublicacion_idtipopublicacion as tipo,
                    CASE
                        WHEN p.tipopublicacion_idtipopublicacion = 1 THEN c.nombre
                        WHEN p.tipopublicacion_idtipopublicacion = 2 THEN CONCAT(cat.nombre, ' ', cat.apellido)
                        ELSE NULL
                    END AS acercade
                FROM publicacion p
                LEFT JOIN curso c ON p.tipopublicacion_idtipopublicacion = 1 AND p.acercade = c.idcurso
                LEFT JOIN catedratico cat ON p.tipopublicacion_idtipopublicacion = 2 AND p.acercade = cat.idcatedratico
                INNER JOIN usuario u on p.usuario_carnet = u.carnet
                WHERE p.idpublicacion = UUID_TO_BIN('${id}')
                ORDER BY p.fecha DESC;
                `)
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
