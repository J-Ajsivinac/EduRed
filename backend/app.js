// npm run -->
import express, { json } from 'express'
import { corsMiddleware } from './middlewares/cors.js'
import { createUserRouter } from './routes/usuario.js'
import { createPubRoutes } from './routes/publicacion.js'
import { createComRoutes } from './routes/comentario.js'
import { createTeacherRoutes } from './routes/catedratico.js'
import { createCourseRouter } from './routes/curso.js'
import { UserModel } from './models/usuario.js'
import { PublicationModel } from './models/publicacion.js'
import { CommentModel } from './models/comentario.js'
import { CourseModel } from './models/curso.js'
import { TeacherModel } from './models/catedratico.js'

export const createApp = () => {
    const app = express()
    app.use(json())
    app.use(corsMiddleware())
    app.disable('x-powered-by')
    // return app

    app.use('/users', createUserRouter({ UserModel }))
    app.use('/pub', createPubRoutes({ PublicationModel }))
    app.use('/com', createComRoutes({ CommentModel }))
    app.use('/course', createCourseRouter({ CourseModel }))
    app.use('/teacher', createTeacherRoutes({ TeacherModel }))
    const PORT = process.env.PORT || 3002
    app.listen(PORT, () => {
        console.log(`server listening on port http://localhost:${PORT}`)
    })
}

createApp()
