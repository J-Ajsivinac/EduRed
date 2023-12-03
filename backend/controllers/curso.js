import { validateCourse } from '../schemas/extra.js'

export class CourseController {
    constructor({ CourseModel }) {
        this.courseModel = CourseModel
    }

    createCourse = async(req, res) => {
        const result = validateCourse(req.body)
        if (!result.success) return res.status(400).json(result.error)
        const newPub = await this.courseModel.creteCourse({ input: result.data })
        if (newPub.code === 0) return res.status(400).json(newPub)
        res.status(201).json(newPub)
    }

    getAllCourses = async(_req, res) => {
        const user = await this.courseModel.getAllCourses()
        if (user) return res.json(user)
    }
}
