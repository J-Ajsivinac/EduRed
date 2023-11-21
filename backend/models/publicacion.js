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
            const res = await connection.query("SELECT BIN_TO_UUID(idpublicacion) idpublicacion,mensaje,DATE_FORMAT(fecha, '%Y-%m-%d %H:%i:%s') AS fecha_f,titulo, BIN_TO_UUID(acercade) acercade,usuario_carnet, tipopublicacion_idtipopublicacion FROM publicacion ORDER BY fecha DESC;")
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
            const res = await connection.query("SELECT BIN_TO_UUID(idpublicacion) idpublicacion,mensaje,DATE_FORMAT(fecha, '%Y-%m-%d %H:%i:%s') AS fecha_f,titulo, BIN_TO_UUID(acercade) acercade,usuario_carnet, tipopublicacion_idtipopublicacion FROM publicacion WHERE tipopublicacion_idtipopublicacion = ? ORDER BY fecha DESC;", [id])
            return res[0]
        } catch (error) {
            return { message: 'Error', code: 0, error }
        } finally {
            if (connection) {
                await Conect.close(connection)
            }
        }
    }

    // static async changePassword({ input }) {
    //     let connection
    //     const { carnet, correo, contrasena } = input
    //     try {
    //         connection = await Conect.con()
    //         const res = await connection.query('UPDATE usuario SET contrasena = ? WHERE carnet= ? AND correo = ?', [contrasena, carnet, correo])
    //         if (res[0].affectedRows === 0) return { message: 'No se pudo cambiar la contrasena', code: 0 }
    //         return { message: 'Cambio de Contrasena realizado', code: 1 }
    //     } catch (error) {
    //         return { message: 'Error', code: 0 }
    //     } finally {
    //         if (connection) {
    //             await Conect.close(connection)
    //         }
    //     }
    // }
}
