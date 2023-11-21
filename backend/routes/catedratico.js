import { Router } from 'express'
import { TeacherController } from '../controllers/catedratico.js'

export const createTeacherRoutes = ({ TeacherModel }) => {
    const userRouter = Router()
    const teacherController = new TeacherController({ TeacherModel })
    userRouter.get('/', teacherController.getAllTeachers)
    userRouter.post('/', teacherController.createTeacher)
    return userRouter
}
