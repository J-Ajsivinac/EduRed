// npm run -->
import express, { json } from 'express'
import { corsMiddleware } from './middlewares/cors.js'
import { createUserRouter } from './routes/usuario.js'
import { createPubRoutes } from './routes/publicacion.js'
import { createComRoutes } from './routes/comentario.js'
import { createTeacherRoutes } from './routes/catedratico.js'
import { createCourseRouter } from './routes/curso.js'
import { createAuthRouter } from './routes/auth.js'
import { UserModel } from './models/usuario.js'
import { PublicationModel } from './models/publicacion.js'
import { CommentModel } from './models/comentario.js'
import { CourseModel } from './models/curso.js'
import { TeacherModel } from './models/catedratico.js'
import { AuthModel } from './models/auth.js'
import cookieParser from 'cookie-parser'

export const createApp = () => {
    const app = express()
    app.use(json())
    app.use(corsMiddleware())
    app.disable('x-powered-by')
    app.use(cookieParser())
    // return app

    app.use('/users', createUserRouter({ UserModel }))
    app.use('/pub', createPubRoutes({ PublicationModel }))
    app.use('/com', createComRoutes({ CommentModel }))
    app.use('/course', createCourseRouter({ CourseModel }))
    app.use('/teacher', createTeacherRoutes({ TeacherModel }))
    app.use('/auth', createAuthRouter({ AuthModel }))
    const PORT = process.env.PORT || 3002
    app.listen(PORT, () => {
        console.log(`server listening on port http://localhost:${PORT}`)
    })
}

createApp()
