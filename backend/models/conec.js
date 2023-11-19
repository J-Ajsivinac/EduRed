import mysql from 'mysql2/promise'

export class Conect {
    static async con() {
        const DEFAULT_CONFIG = {
            host: 'localhost',
            user: 'root',
            port: 3306,
            password: 'root123',
            database: 'bd_social'
        }
        try {
            const connectionString = process.env.DATABASE_URL ?? DEFAULT_CONFIG
            return await mysql.createConnection(connectionString)
        } catch (error) {
            return { message: 'Error al conectar a la base de datos' }
        }
    }

    static async close(connection) {
        try {
            await connection.end()
        } catch (error) {
            return { message: 'Error al cerrar la conexión a la base de datos' }
        }
    }
}
