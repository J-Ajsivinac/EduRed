import { Router } from 'express'
import { CourseController } from '../controllers/curso.js'

export const createCourseRouter = ({ CourseModel }) => {
    const userRouter = Router()
    const courseController = new CourseController({ CourseModel })
    userRouter.get('/', courseController.getAllCourses)
    userRouter.post('/', courseController.createCourse)
    return userRouter
}
